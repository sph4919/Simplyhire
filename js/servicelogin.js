

 const API_BASE = 'https://simplyhirebackend.onrender.com';

let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",serviceValidateLoginUser);

 async function serviceValidateLoginUser(event)
{
        event.preventDefault();
		let serviceUserEmail = document.getElementById("service-user-email");
		let serviceUserPassword = document.getElementById("service-user-password");
		
		let email = serviceUserEmail.value;
		let password = serviceUserPassword.value;

			 try 
			   {
                const res = await fetch(`${API_BASE}/provider/serviceUserLogin`,
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
				  credentials: 'include', 
                  body: JSON.stringify({email, password})
                });

                const result = await res.json();
				console.log("request intialedd"); // for debugging
				console.log(result);
                 if (res.status == 202)
				  {
				//    window.location.href = "/Simplyhire/serviceDashboard.html";
				window.location.href = "/serviceDashboard.html";
                  }
				else 
				{
				    let errorMessage = document.getElementById("errorBox");
                    errorMessage.innerHTML= 'Plz enter the valid creds or contact admin if facing error';
                } 
			 }
			 catch (err) 
			   {
                 let errorMessage = document.getElementById("errorBox");
                 errorMessage.innerHTML= 'Server error plz contact admin if that mf is sleeping';
               }

}


document.addEventListener("DOMContentLoaded",sessionHandler);

 async function sessionHandler(event)
{


			 try 
			   {
                const res = await fetch(`${API_BASE}/provider/sessionChecker`,
		        {
				  credentials: 'include'
                });

                const result = await res.json();
				
                 if (res.status == 200)
				  {
				   console.log("session removed"); //new session started
                  }
	
			 }
			 catch (err) 
			   {
                 let errorMessage = document.getElementById("errorBox");
                 errorMessage.innerHTML= 'Server error plz contact admin if that mf is sleeping';
               }


}




