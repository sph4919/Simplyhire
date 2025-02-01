let signup = document.getElementById("service-signupform");
signup.addEventListener("submit",validatesignupUser);


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('user-name-service').value;
    const email = document.getElementById('user-email-service').value;
    const password = document.getElementById('user-password-service').value;
    const jobid = document.getElementById ("job-id-service").value;
    const desc = document.getElementById("description-service");
    const rate = document.getElementById("per-hour-rate-service");

    // Send the POST request to the server
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            jobid: jobid,
            desc: desc ,
            rate: rate
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Signup successful');
            window.location.href = 'login.html'; // Redirect after successful signup
        } else {
            alert('Signup failed');
            return response.text(); // Get the error message
        }
    })
    .then(errorMsg => {
        console.error('Error:', errorMsg);
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('Error during signup');
    });
});