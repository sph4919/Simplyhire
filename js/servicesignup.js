let signup = document.getElementById("service-signupform");
signup.addEventListener("submit",serviceValidateSignup);


function validateDescription(description)
{
	let descRegex= /\b(\w+\b\W*){10,}/ig;
	if (descRegex.test(description.value))
		{
			
			return true;
		}
		else
		{
			
			return false;
		}
}

function validateEmail(email)
 {
    let emailRegex =  /^(\w+|\d+)[@]\w+[.]\w{2,3}$/ig;
    if (emailRegex.test(email.value))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validatePassword(password) {
   
    let passwordRegex= /^\w{6,}[^\s]$/ig;
	if (passwordRegex.test(password.value))
		{
			return true;
		}
		else
		{
			return false;
		}
}



function validateName(name) {
   
    let nameRegex= /^[A-Za-z ]+$/ig;
	if (nameRegex.test(name.value))
		{
			
			return true;
		}
		else
		{
			
			return false;
		}
}


async function serviceValidateSignup(event)
{
		event.preventDefault();
	    let serviceName = document.getElementById("service-user-name")
		let serviceEmail = document.getElementById("service-user-email");
		let servicePassword = document.getElementById("service-user-password");
		let serviceJobtype = document.getElementById("job-id-service");
		let serviceDescription = document.getElementById("service-description");
		let serviceRate = document.getElementById("per-hour-rate-service");
		
		

		let formIsValid = true;
		

		if (!validateName(serviceName)) 
			{
				window.alert("Wrong Name")
				formIsValid = false;
			} 
	
		if (!validateEmail(serviceEmail)) 
        {
			window.alert("Wrong user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(servicePassword)) 
		{
            window.alert("Wrong user password")
			formIsValid = false;
		} 
		if (!validateDescription(serviceDescription)) 
		{
			window.alert("Plz provide long description....")
			formIsValid = false;
		} 
	

		if(!formIsValid)
        {
			event.preventDefault();
		}
		else
        {
			let userBool = false;
			let name = serviceName.value;
			let email = serviceEmail.value;
			let password = servicePassword.value;
			let type = serviceJobtype.value;
			let description = serviceDescription.value;
			let rate = serviceRate.value;

			 try 
			 {
               const res = await fetch('http://localhost:3000/api/serviceSigUpCheck',
		      {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
              });

                const result = await res.json();
				console.log(result);
                if (res.status == 201)
				  {
                   alert("/Service User already exits");
				   window.location.href = "../serviceLogin.html";
				   userBool = true;
                  }
				 else 
				   {
				   alert("Error: " + result.message);
                   }
             } 
			 catch (err) 
			 {
                console.error("Fetch error:", err);
                alert("Server error");
             }


             if(userBool==false)
			 {
		
		     try 
			   {
                const res = await fetch('http://localhost:3000/api/serviceSignup',
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({name,email,password,type,description,rate })  });

                const result = await res.json();
				console.log(result);
                 if (res.status == 201)
				  {
                   alert("Serivce Signup successful!");
				   console.log("Validation scuccessfull.");
				   window.location.href = "../dashboard.html";
                  }
				else 
				   {
				   alert("Error: " + result.message);
                   }
               } 
			 catch (err) 
			   {
                console.error("Fetch error:", err);
                alert("Server error");
               }
			 } 
        };
			
}


