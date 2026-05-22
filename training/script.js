// ========================================
// CONFIGURATION
// ========================================
const API_URL = 'https://script.google.com/macros/s/AKfycbziE2uoPTZrjc3kYiYGmrNSRSbS4JXtBeUNIyjltUts0VEG0G4SuDOWgFgCbUxfvLoO/exec';

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentUser = null;
let pendingUsername = null;

// ========================================
// AUTO LOGOUT CONFIG (ms)
// ========================================
const AUTO_LOGOUT_TIME = 900000;
let logoutTimer;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {

  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup Form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // OTP Form
  const otpForm = document.getElementById('otpForm');
  if (otpForm) {
    otpForm.addEventListener('submit', handleVerifyOtp);
  }

  [
    'click',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart'
  ].forEach(event => {
    document.addEventListener(
      event,
      resetLogoutTimer
    );
  });

  restoreSession();
});

// ========================================
// SHOW LOGIN / SIGNUP / OTP
// ========================================
function showLogin() {
  hideAllAuthCards();

  document
    .getElementById('loginCard')
    ?.classList.remove('hidden');
}

function showSignup() {
  hideAllAuthCards();

  document
    .getElementById('signupCard')
    ?.classList.remove('hidden');
}

function showOtpCard() {
  hideAllAuthCards();

  document
    .getElementById('otpCard')
    ?.classList.remove('hidden');
}

function hideAllAuthCards() {
  document
    .querySelectorAll('.auth-card')
    .forEach(card => card.classList.add('hidden'));
}

// ========================================
// API HELPER
// ========================================
async function api(action, data = {}) {

  try {

    const res = await fetch(API_URL, {

      method: 'POST',

      headers: {
        'Content-Type':
          'text/plain;charset=utf-8'
      },

      body: JSON.stringify({

        action,

        token:
          localStorage.getItem(
            'sessionToken'
          ) || '',

        fingerprint:
          getFingerprint(),

        ...data

      })

    });

    // ========================================
    // RESPONSE
    // ========================================

    const json =
      await res.json();

    // ========================================
    // AUTO SESSION CHECK
    // ========================================

    if (
      json.message ===
      'Session expired'
      ||
      json.message ===
      'Invalid session'
    ) {

      showMessage(
        'Session Expired',
        'Please login again.',
        'warning'
      );

      setTimeout(() => {
        logout();
      }, 1500);

    }

    return json;

  } catch(err) {

    console.error(err);

    return {

      success: false,
      message: err.message

    };

  }

}

// ========================================
// SIGN UP
// ========================================
async function handleSignup(e) {
  e.preventDefault();

  const fullname = document
    .getElementById('signupFullname')
    .value
    .trim();

  const company = document
    .getElementById('signupCompany')
    ?.value
    .trim() || '';

  const email = document
    .getElementById('signupEmail')
    .value
    .trim();

  const username = document
    .getElementById('signupUsername')
    .value
    .trim()
    .toLowerCase();

  const password = document
    .getElementById('signupPassword')
    .value;

  if (!fullname || !email || !username || !password) {
    showMessage(
      'Incomplete Data',
      'Please complete all fields.',
      'warning'
    );
    return;
  }

  showLoading();

  const res = await api('signup', {
    fullname,
    company,
    email,
    username,
    password
  });

  hideLoading();

  if (!res.success) {
    showMessage(
      'Registration Failed',
      res.message,
      'error'
    );
    return;
  }

  showMessage(
    'Registration Successful',
    'Your account is waiting for admin activation.',
    'success'
  );

  document.getElementById('signupForm').reset();

  setTimeout(() => {
    closeModal();
    showLogin();
  }, 1500);
}

// ========================================
// LOGIN STEP 1
// ========================================
async function handleLogin(e) {
  e.preventDefault();

  const username = document
    .getElementById('loginUsername')
    .value
    .trim()
    .toLowerCase();

  const password = document
    .getElementById('loginPassword')
    .value;

  if (!username || !password) {
    showMessage(
      'Login Failed',
      'Username and password are required.',
      'warning'
    );
    return;
  }

  showLoading();

  const res = await api('login', {
    username,
    password
  });

  hideLoading();

  if (!res.success) {
    showMessage(
      'Login Failed',
      res.message,
      'error'
    );
    return;
  }

  pendingUsername = username;
  document.getElementById(
  'loginPassword'
).value = '';

  showMessage(
    'Verification Code Sent',
    'Please check your email for the verification code.',
    'success'
  );

  setTimeout(() => {
    closeModal();
    showOtpCard();
  }, 1500);
}

// ========================================
// VERIFY OTP STEP 2
// ========================================
async function handleVerifyOtp(e) {
  e.preventDefault();

  const otp = document
    .getElementById('otpCode')
    .value
    .trim();

  if (!otp) {
    showMessage(
      'Verification Failed',
      'Please input verification code.',
      'warning'
    );
    return;
  }

  showLoading();

  const res = await api('verifyOtp', {
    username: pendingUsername,
    otp
  });

  hideLoading();

  if (!res.success) {
    showMessage(
      'Verification Failed',
      res.message,
      'error'
    );
    return;
  }

  currentUser = res.user;
  localStorage.setItem(
    'sessionToken',
    res.token
  );

  localStorage.setItem(
    'sessionUser',
    JSON.stringify(currentUser)
  );

  showMessage(
    'Login Successful',
    'Welcome back ' + currentUser.fullname,
    'success'
  );

  setTimeout(() => {
    closeModal();
    loadDashboard();
  }, 1200);
}

// ========================================
// ACCESS CONTROL
// ========================================
function hasAccess(level) {
  return (
    Number(currentUser?.accessLevel || 0)
    >= Number(level)
  );
}

// ========================================
// RESTORE SESSION
// ========================================
async function restoreSession() {

  const token =
    localStorage.getItem(
      'sessionToken'
    );

  if (!token) return;

  showLoading();

  const res = await api(
    'restoreSession'
  );

  hideLoading();

  if (!res.success) {

    localStorage.removeItem(
      'sessionToken'
    );

    localStorage.removeItem(
      'sessionUser'
    );

    return;
  }

  currentUser = res.user;

  localStorage.setItem(
    'sessionUser',
    JSON.stringify(currentUser)
  );

  loadDashboard();
}

// ========================================
// LOAD DASHBOARD
// ========================================
function loadDashboard() {

  document
    .getElementById('authContainer')
    ?.classList.add('hidden');

  document
    .getElementById('dashboard')
    ?.classList.remove('hidden');

  document
    .getElementById('userNameDisplay')
    .textContent = currentUser.fullname || currentUser.username;

  if (typeof showPage === 'function') {
  showPage('home');
  }
  
  initAutoLogout();
  resetLogoutTimer();
}

// ========================================
// LOGOUT
// ========================================
async function logout() {

  try {

    await api('logout');

  } catch(err) {}

  localStorage.removeItem(
    'sessionUser'
  );

  localStorage.removeItem(
    'sessionToken'
  );

  currentUser = null;

  document
    .getElementById('dashboard')
    ?.classList.add('hidden');

  document
    .getElementById('authContainer')
    ?.classList.remove('hidden');

  document
  .querySelectorAll(
    'input[type="password"]'
  )
  .forEach(input => {
    input.value = '';
  });
  
  showLogin();
}

// ========================================
// UPDATE PROFILE
// ========================================
async function handleProfileUpdate(e) {
  e.preventDefault();

  const fullname = document
    .getElementById('profileFullname')
    .value
    .trim();

  const company = document
    .getElementById('profileCompany')
    ?.value
    .trim() || '';

  const email = document
    .getElementById('profileEmail')
    .value
    .trim();

  showLoading();

  const res = await api('updateProfile', {
    username: currentUser.username,
    fullname,
    company,
    email
  });

  hideLoading();

  if (!res.success) {
    showMessage(
      'Update Failed',
      res.message,
      'error'
    );
    return;
  }

  currentUser.fullname = fullname;
  currentUser.company = company;
  currentUser.email = email;

  localStorage.setItem(
    'sessionUser',
    JSON.stringify(currentUser)
  );

  document
    .getElementById('userNameDisplay')
    .textContent = fullname;

  showMessage(
    'Profile Updated',
    'Your profile has been updated successfully.',
    'success'
  );
}

// ========================================
// CHANGE PASSWORD
// ========================================
async function handlePasswordChange(e) {
  e.preventDefault();

  const oldPassword = document
    .getElementById('oldPassword')
    .value;

  const newPassword = document
    .getElementById('newPassword')
    .value;

  if (newPassword.length < 6) {
    showMessage(
      'Invalid Password',
      'Password minimum 6 characters.',
      'warning'
    );
    return;
  }

  showLoading();

  const res = await api('changePassword', {
    username: currentUser.username,
    oldPassword,
    newPassword
  });

  hideLoading();

  if (!res.success) {
    showMessage(
      'Password Change Failed',
      res.message,
      'error'
    );
    return;
  }

  document
    .getElementById('passwordForm')
    ?.reset();

  showMessage(
    'Password Changed',
    'Password updated successfully.',
    'success'
  );
}

// ========================================
// SHOW / HIDE PASSWORD
// ========================================
function togglePassword(inputId, el) {
  const input = document.getElementById(inputId);
  const icon = el.querySelector('i');

  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';

    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');

  } else {
    input.type = 'password';

    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// ========================================
// CUSTOM MODAL
// ========================================
function showMessage(title, message, type = 'info') {

  const modal = document.getElementById('customModal');
  const icon = document.getElementById('modalIcon');
  const titleEl = document.getElementById('modalTitle');
  const messageEl = document.getElementById('modalMessage');

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  icon.textContent = icons[type] || 'ℹ️';

  titleEl.textContent = title;
  messageEl.innerHTML = message;

  modal.classList.remove('hidden');
}

function closeModal() {
  document
    .getElementById('customModal')
    ?.classList.add('hidden');
}

// ========================================
// LOADING OVERLAY
// ========================================
function showLoading() {
  document
    .getElementById('loadingOverlay')
    ?.classList.remove('hidden');
}

function hideLoading() {
  document
    .getElementById('loadingOverlay')
    ?.classList.add('hidden');
}

// ========================================
// SIDEBAR
// ========================================
function toggleSidebar() {

  const sidebar = document.getElementById('sidebar');

  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('show');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}

function toggleSubmenu(element) {

  const parent = element.closest('.has-submenu');

  if (
    document
      .getElementById('sidebar')
      .classList.contains('collapsed')
  ) {
    return;
  }

  parent.classList.toggle('open');
}

// ========================================
// SIMPLE PAGE ROUTER
// ========================================
function showPage(page) {

  const title = document.getElementById('pageTitle');
  const content = document.getElementById('pageContent');

  const pages = {

    home: {
      title: 'Home',
      html: `
      <iframe
        src="https://datastudio.google.com/embed/reporting/872610ff-5cf7-4c01-ac0e-418f6a53d57c/page/p_7v9hglpe3d"
        width="100%"
        height="900"
        style="border:none; border-radius:10px;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen>
      </iframe>
    `
    },

    profile: {
      title: 'Edit Profile',
      html: `

        <form id="profileForm">

          <div class="input-group">
            <i class="fa fa-user"></i>
            <input
              type="text"
              id="profileFullname"
              value="${currentUser.fullname || ''}"
              required
            />
          </div>

          <div class="input-group">
            <i class="fa fa-building"></i>
            <input
              type="text"
              id="profileCompany"
              value="${currentUser.company || ''}"
            />
          </div>

          <div class="input-group">
            <i class="fa fa-envelope"></i>
            <input
              type="email"
              id="profileEmail"
              value="${currentUser.email || ''}"
              required
            />
          </div>

          <button type="submit" class="btn-primary">
            Save Profile
          </button>

        </form>
      `
    },

    password: {
      title: 'Change Password',
      html: `

        <form id="passwordForm">

          <div class="input-group password-group">
            <i class="fa fa-lock"></i>

            <input
              type="password"
              id="oldPassword"
              placeholder="Old Password"
              required
            />

            <span
              class="toggle-password"
              onclick="togglePassword('oldPassword', this)">
              <i class="fa fa-eye"></i>
            </span>
          </div>

          <div class="input-group password-group">
            <i class="fa fa-lock"></i>

            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              required
            />

            <span
              class="toggle-password"
              onclick="togglePassword('newPassword', this)">
              <i class="fa fa-eye"></i>
            </span>
          </div>

          <button type="submit" class="btn-primary">
            Change Password
          </button>

        </form>
      `
    }
  };

  const pageData = pages[page] || pages.home;

  title.textContent = pageData.title;
  content.innerHTML = pageData.html;

  if (page === 'profile') {
    document
      .getElementById('profileForm')
      ?.addEventListener('submit', handleProfileUpdate);
  }

  if (page === 'password') {
    document
      .getElementById('passwordForm')
      ?.addEventListener('submit', handlePasswordChange);
  }
}

// ========================================
// AUTO LOGOUT
// ========================================
let inactivityTimer;

function resetInactivityTimer() {

  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {

    showMessage(
      'Session Expired',
      'You have been logged out due to inactivity.',
      'warning'
    );

    setTimeout(() => {
      closeModal();
      logout();
    }, 1500);

  }, AUTO_LOGOUT_TIME);
}

function initAutoLogout() {

  const events = [
    'mousemove',
    'mousedown',
    'keypress',
    'scroll',
    'touchstart',
    'click'
  ];

  events.forEach(event => {
    document.addEventListener(
      event,
      resetInactivityTimer
    );
  });

  resetInactivityTimer();
}

function getFingerprint() {

  return btoa(
    navigator.userAgent +
    navigator.language +
    screen.width +
    screen.height +
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone
  );
}

function resetLogoutTimer() {

  clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {

    showMessage(
      'Session Expired',
      'Logged out due to inactivity.',
      'warning'
    );

    setTimeout(() => {
      logout();
    }, 1200);

  }, AUTO_LOGOUT_TIME);

}
