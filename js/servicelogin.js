
console.log("HI script working");

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
				let providerId = result.results[0].serviceprovider_id;
				console.log(providerId);
				let proId = result[0].serviceprovider_id;
				console.log(proId);
				let pId = result.serviceprovider_id;
				console.log(pId);
				
                 if (res.status == 202)
				  {
			       const params = new URLSearchParams();
                   params.set("providerId", result.providerId);
                //    window.location.href = `/Simplyhire/serviceDashboard.html?${params.toString()}`;
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


