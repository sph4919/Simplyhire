 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
console.log(userId)


let mainBtn = document.getElementById("mainBtn");
mainBtn.addEventListener('click',mainBtnfun);
console.log(" Not Clicked")
 function mainBtnfun()
{
    console.log("Clicked")
     const params = new URLSearchParams();
     params.set("userId", userId);
     window.location.href = `/Simplyhire/main.html?${params.toString()}`

}