// ========================================
// CONFIGURATION
// ========================================
const API_URL = 'https://script.google.com/macros/s/AKfycbziE2uoPTZrjc3kYiYGmrNSRSbS4JXtBeUNIyjltUts0VEG0G4SuDOWgFgCbUxfvLoO/exec';

// ========================================
// API HELPER
// ========================================
async function api(action, data = {}) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action,
        ...data
      })
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
}

// ========================================
// SIGN UP
// Menyimpan ke:
// 1. User_Ext  -> Username, Nama, PT, Email
// 2. Pswd_Ext  -> Username, Password, Status
// Username otomatis lowercase
// Status default = Non Aktif
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
// Hanya user dengan Status = Aktif
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
// UPDATE PROFILE
// Update sheet User_Ext
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
// Update sheet Pswd_Ext
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
