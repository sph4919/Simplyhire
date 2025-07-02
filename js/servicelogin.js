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
                const res = await fetch('http://localhost:3000/api/serviceUserLogin',
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({email, password })
                });

                const result = await res.json();
				console.log(result);
                 if (res.status == 201)
				  {
                   alert("Login successful! with correct creds");
				   console.log("Validation scuccessfull.");
				   window.location.href = "../userdashboard.html";
                  }
				else 
				   {
				   alert("Error: " + result.message + "Incorrect emial and password");
                   }
               } 
			 catch (err) 
			   {
                console.error("Fetch error:", err);
                alert("Server error");
               }


}




