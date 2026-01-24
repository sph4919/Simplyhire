 const API_BASE = 'https://simplyhirebackend.onrender.com';

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);


async function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}

