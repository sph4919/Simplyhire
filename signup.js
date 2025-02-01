
let signup = document.getElementById("signupform");
signup.addEventListener("submit",validatesignupUser)

async function login(event) {
    event.preventDefault();

    const name = document.getElementById('user-name-signup').value;
    const email = document.getElementById('user-email-signup').value;
    const password = document.getElementById('user-password-signup').value;

    const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password })
    });

    const result = await response.text();
    alert(result);

    if (response.ok && result.success) {
       
        // window.location.href = "main.html";  
    } else {
        alert("Invalid credentials. Please try again.");
    }



}

document.getElementById('signupform').addEventListener('submit', login);