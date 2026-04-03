fetch('/auth/current-user')
  .then(res => res.json())
  .then(data => {
    const status = document.getElementById('status');
    const authTitle = document.getElementById('auth-title');
    const authDesc = document.getElementById('auth-desc');
    const authLink = document.getElementById('auth-link');

    if (data.displayName) {
      status.textContent = `✅ Logged in as ${data.displayName}`;
      status.classList.add('logged-in');
      authTitle.textContent = 'Logout';
      authDesc.textContent = 'Click to log out of your account';
      authLink.href = '/auth/logout';
    } else {
      status.textContent = '🔴 Not logged in';
      status.classList.add('logged-out');
    }
  })
  .catch(() => {
    const status = document.getElementById('status');
    status.textContent = '🔴 Not logged in';
    status.classList.add('logged-out');
  });