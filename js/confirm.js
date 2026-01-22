 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

 function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}


let mainBtn = document.getElementById("mainBtn");
mainBtn.addEventListener('click',mainBtnfun);

 function mainBtnfun()
{
     const params = new URLSearchParams();
     params.set("userId", userId);
     window.location.href = `/Simplyhire/main.html?${params.toString()}`

}