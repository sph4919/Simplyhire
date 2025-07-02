document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('service-signupform');
  const nameI = document.getElementById('service-user-name');
  const emailI= document.getElementById('service-user-email');
  const passI = document.getElementById('service-user-password');
  const jobI  = document.getElementById('job-id-service');
  const shortI= document.getElementById('short-description');
  const descI = document.getElementById('service-description');
  const rateI = document.getElementById('per-hour-rate-service');

  // Load services into the job dropdown
  (async function listServices() {
    try {
      const r = await fetch('http://localhost:3000/api/listServices');
      const data = await r.json();
      data.forEach(svc => {
        const opt = document.createElement('option');
        opt.value = svc.service_type;
        opt.textContent = svc.service_type;
        jobI.append(opt);
      });
    } catch (e) {
      console.error('Could not load services', e);
    }
  })();

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic client-side validations
    if (!/^[A-Za-z ]+$/.test(nameI.value)) {
      return alert('Please enter a valid name');
    }
    if (!/^\S+@\S+\.\S+$/.test(emailI.value)) {
      return alert('Please enter a valid email');
    }
    if (passI.value.length < 6) {
      return alert('Password must be at least 6 chars');
    }
    if (descI.value.trim().split(/\s+/).length < 10) {
      return alert('Description must be at least 10 words');
    }

    const payload = {
      name:             nameI.value.trim(),
      email:            emailI.value.trim(),
      password:         passI.value,
      type:             jobI.value,
      shortDescription: shortI.value.trim(),
      description:      descI.value.trim(),
      rate:             Number(rateI.value)
    };

    try {
      // 1) Check if email exists
      const check = await fetch(
        'http://localhost:3000/api/serviceSignUpCheck',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: payload.email })
        }
      );

      if (check.status === 409) {
        alert('Email already registered. Redirecting to login…');
        return window.location.href = '/serviceLogin.html';
      }
      if (!check.ok) {
        const err = await check.json();
        return alert(`Error ${check.status}: ${err.message}`);
      }

      // 2) Sign up
      const signup = await fetch(
        'http://localhost:3000/api/serviceSignup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      const result = await signup.json();
      if (signup.status === 201) {
        alert('Signup successful! Redirecting to login…');
        window.location.href = '/serviceLogin.html';
      } else {
        alert(`Error ${signup.status}: ${result.message}`);
      }
    }
    catch (err) {
      console.error('Network error:', err);
      alert('Server unreachable');
    }
  });
});