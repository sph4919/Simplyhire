
let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",validateindexuser)



async function login(event) {
    event.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.text();
    alert(result);
}

document.getElementById('user-form').addEventListener('submit', login);