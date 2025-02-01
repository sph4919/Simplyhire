
let signup = document.getElementById("signupform");
signup.addEventListener("submit",validatesignupUser)

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('user-name-signup').value;
    const email = document.getElementById('user-email-signup').value;
    const password = document.getElementById('user-password-signup').value;

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
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Signup successful');
            window.location.href = 'index.html'; // Redirect after successful signup
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