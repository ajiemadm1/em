// ========================================
// CONFIGURATION
// ========================================
const API_URL = 'https://script.google.com/macros/s/AKfycbziE2uoPTZrjc3kYiYGmrNSRSbS4JXtBeUNIyjltUts0VEG0G4SuDOWgFgCbUxfvLoO/exec';

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentUser = null;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Event Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Event Signup
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Restore session jika ada
  restoreSession();
});

// ========================================
// SHOW LOGIN / SIGNUP
// ========================================
function showLogin() {
  const loginCard = document.getElementById('loginCard');
  const signupCard = document.getElementById('signupCard');

  if (loginCard) loginCard.classList.remove('hidden');
  if (signupCard) signupCard.classList.add('hidden');
}

function showSignup() {
  const loginCard = document.getElementById('loginCard');
  const signupCard = document.getElementById('signupCard');

  if (signupCard) signupCard.classList.remove('hidden');
  if (loginCard) loginCard.classList.add('hidden');
}

// ========================================
// API HELPER
// ========================================
async function api(action, data = {}) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });

    return await res.json();
  } catch (err) {
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
    alert('Please complete all fields.');
    return;
  }

  const res = await api('signup', {
    username,
    fullname,
    company,
    email,
    password
  });

  if (!res.success) {
    alert(res.message || 'Registration failed.');
    return;
  }

  alert(
    'Registration successful.\n' +
    'Your account is waiting for admin activation.'
  );

  document.getElementById('signupForm').reset();
  showLogin();
}

// ========================================
// LOGIN
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

  const btn = e.target.querySelector('button');
  const original = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = 'Signing in...';

  const res = await api('login', {
    username,
    password
  });

  btn.disabled = false;
  btn.innerHTML = original;

  if (!res.success) {
    alert(res.message || 'Login failed.');
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
// RESTORE SESSION
// ========================================
function restoreSession() {
  const session = localStorage.getItem('sessionUser');

  if (!session) return;

  currentUser = JSON.parse(session);
  loadDashboard();
}

// ========================================
// LOAD DASHBOARD
// ========================================
function loadDashboard() {
  const authContainer = document.getElementById('authContainer');
  const dashboard = document.getElementById('dashboard');
  const userNameDisplay = document.getElementById('userNameDisplay');

  if (authContainer) authContainer.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');

  if (userNameDisplay && currentUser) {
    userNameDisplay.textContent =
      currentUser.fullname ||
      currentUser.username ||
      'User';
  }

  if (typeof showPage === 'function') {
    showPage('home');
  }
}

// ========================================
// LOGOUT
// ========================================
function logout() {
  localStorage.removeItem('sessionUser');
  currentUser = null;

  const authContainer = document.getElementById('authContainer');
  const dashboard = document.getElementById('dashboard');

  if (dashboard) dashboard.classList.add('hidden');
  if (authContainer) authContainer.classList.remove('hidden');

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

  const email = document
    .getElementById('profileEmail')
    .value
    .trim();

  const company = document
    .getElementById('profileCompany')
    ?.value
    .trim() || '';

  const res = await api('updateProfile', {
    username: currentUser.username.toLowerCase(),
    fullname,
    email,
    company
  });

  if (!res.success) {
    alert(res.message || 'Update failed.');
    return;
  }

  currentUser.fullname = fullname;
  currentUser.email = email;
  currentUser.company = company;

  localStorage.setItem(
    'sessionUser',
    JSON.stringify(currentUser)
  );

  document.getElementById('userNameDisplay').textContent =
    fullname;

  alert('Profile updated successfully.');
}

// ========================================
// CHANGE PASSWORD
// ========================================
async function handlePasswordChange(e) {
  e.preventDefault();

  const oldPassword =
    document.getElementById('oldPassword').value;

  const newPassword =
    document.getElementById('newPassword').value;

  if (newPassword.length < 6) {
    alert('New password must be at least 6 characters.');
    return;
  }

  const res = await api('changePassword', {
    username: currentUser.username.toLowerCase(),
    oldPassword,
    newPassword
  });

  if (!res.success) {
    alert(res.message || 'Password change failed.');
    return;
  }

  alert('Password changed successfully.');
  document.getElementById('passwordForm').reset();
}
