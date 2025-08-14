
    // Elements
    const verifyForm = document.getElementById('verifyForm');
    const resetForm = document.getElementById('resetForm');
    const doneView = document.getElementById('done');
    const alertBox = document.getElementById('alert');

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const verifyBtn = document.getElementById('verifyBtn');

    const pwInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm');
    const pwError = document.getElementById('pwError');
    const confirmError = document.getElementById('confirmError');
    const strengthBar = document.getElementById('strengthBar');
    const togglePw = document.getElementById('togglePw');
    const toggleConfirm = document.getElementById('toggleConfirm');

    // Helpers
    function showAlert(type, message) {
      alertBox.textContent = message;
      alertBox.className = 'alert ' + (type === 'error' ? 'alert--error' : 'alert--success');
      alertBox.hidden = false;
    }
    function clearAlert() {
      alertBox.hidden = true;
      alertBox.textContent = '';
      alertBox.className = 'alert';
    }
    const validEmail = (val) => /\S+@\S+\.\S+/.test(val);

    function scorePassword(pw) {
      let s = 0;
      if (pw.length >= 8) s++;
      if (/[A-Z]/.test(pw)) s++;
      if (/[a-z]/.test(pw)) s++;
      if (/\d/.test(pw)) s++;
      if (/[^\w\s]/.test(pw)) s++;
      return s; // 0–5
    }
    function updateStrength(pw) {
      const score = scorePassword(pw);
      const pct = Math.min(100, Math.max(0, (score / 5) * 100));
      strengthBar.style.width = pct + '%';
      strengthBar.setAttribute('data-score', String(score));
    }

    // UI toggles
    togglePw.addEventListener('click', () => {
      const type = pwInput.type === 'password' ? 'text' : 'password';
      pwInput.type = type;
      togglePw.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
    });
    toggleConfirm.addEventListener('click', () => {
      const type = confirmInput.type === 'password' ? 'text' : 'password';
      confirmInput.type = type;
      toggleConfirm.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
    });
    pwInput.addEventListener('input', (e) => updateStrength(e.target.value));

    // Step 1: Verify email (replace with your API call)
    verifyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert();
      emailError.hidden = true;

      const email = emailInput.value.trim();
      if (!email) {
        emailError.textContent = 'Email is required.';
        emailError.hidden = false;
        return;
      }
      if (!validEmail(email)) {
        emailError.textContent = 'Please enter a valid email.';
        emailError.hidden = false;
        return;
      }

      verifyBtn.disabled = true;
      verifyBtn.textContent = 'Verifying…';

      // TODO: call your endpoint here, e.g.:
      // const res = await fetch('/api/auth/forgot/verify', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
      // const data = await res.json();
      // if (!res.ok) { showAlert('error', data.message || 'Unable to verify email'); ... }

      await new Promise(r => setTimeout(r, 700)); // simulate
      showAlert('success', 'Email verified. Set a new password.');
      verifyForm.hidden = true;
      resetForm.hidden = false;

      verifyBtn.disabled = false;
      verifyBtn.textContent = 'Verify';
    });

    // Step 2: Change password (replace with your API call)
    resetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert();
      pwError.hidden = true;
      confirmError.hidden = true;

      const pw = pwInput.value;
      const c = confirmInput.value;

      if (!pw) {
        pwError.textContent = 'Password is required.';
        pwError.hidden = false;
        return;
      }
      if (pw.length < 8) {
        pwError.textContent = 'Use at least 8 characters.';
        pwError.hidden = false;
        return;
      }
      if (pw !== c) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.hidden = false;
        return;
      }

      const changeBtn = document.getElementById('changeBtn');
      changeBtn.disabled = true;
      changeBtn.textContent = 'Changing…';

      // TODO: call your endpoint here, e.g.:
      // const res = await fetch('/api/auth/forgot/change', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password: pw }) });
      // const data = await res.json();
      // if (!res.ok) { showAlert('error', data.message || 'Could not change password'); changeBtn.disabled=false; changeBtn.textContent='Change password'; return; }

      await new Promise(r => setTimeout(r, 800)); // simulate

      showAlert('success', 'Password changed successfully.');
      resetForm.hidden = true;
      doneView.hidden = false;
    });
