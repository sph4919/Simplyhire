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
                const res = await fetch('http://localhost:3000/provider/serviceUserLogin',
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
				  credentials: 'include', 
                  body: JSON.stringify({email, password})
                });

                const result = await res.json();
				console.log(result);
                 if (res.status == 201)
				  {
				   window.location.href = "../serviceDashboard.html";
                  }
				else 
				   {
				   alert("Error: " + result.message + "Incorrect email and password");
                   }
               } 
			 catch (err) 
			   {
                console.error("Fetch error:", err);
                alert("Server error");
               }


}




