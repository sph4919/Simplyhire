let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",validateindexuser);


async function login(event) {
    event.preventDefault();
    const email = document.getElementById('service-email').value;
    const password = document.getElementById('service-password').value;

    const response = await fetch('http://localhost:3000/servicelogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.text();
    alert(result);

    if (response.ok && result.success) {
       
        // window.location.href = "serviceindex.js";  
    } else {
        alert("Invalid credentials. Please try again.");
    }



}

document.getElementById('user-form').addEventListener('submit', login);


