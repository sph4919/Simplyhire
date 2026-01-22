 const API_BASE = 'https://simplyhirebackend.onrender.com';

let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",sendAutenReq);



async function sendAutenReq(event)
 {
  event.preventDefault();
  let UserEmail = document.getElementById("user-email");
  let UserPassword = document.getElementById("user-password");
  let email = UserEmail.value;
  let password = UserPassword.value;

  try{
      const res = await fetch(`${API_BASE}/user/userLogin`,
		     {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             credentials: 'include', 
             body: JSON.stringify({email, password})
             });
 
        const result = await res.json();
 
        if (res.status == 202)
		{   console.log(result.userId);
        
           const params = new URLSearchParams();
           params.set("userId", result.userId);
           window.location.href = `/Simplyhire/main.html?${params.toString()}`;
           
            
        }
        else if (res.status == 401)
        {
            let errorMessage = document.getElementById("errorBox");
            errorMessage.innerHTML= result.message;
        }
        else
        {
            let errorMessage = document.getElementById("errorBox");
            errorMessage.innerHTML= result.message;
        }
    }
    catch(err)
     {
          let errorMessage = document.getElementById("errorBox");
          errorMessage.innerHTML= "Server : dont disburb me , I am busy talking with my boyfriend. I am feeling low pllz try again..";
    }
    
};




