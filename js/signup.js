
 const API_BASE = 'https://simplyhirebackend.onrender.com';

let signup = document.getElementById("signupform");
signup.addEventListener("submit",validateUserSignup)

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




async function validateUserSignup(event)
{
	    event.preventDefault();
        let userName = document.getElementById("user-name-signup")
		let userEmail = document.getElementById("user-email-signup");
		let userPassword = document.getElementById("user-password-signup");
		let formIsValid = true;

		if (!validateName(userName)) 
		{
			let error = document.getElementById("errorBox");
			error.innerHTML = "Invalid User Name / Should not include numbers";
			formIsValid = false;
		} 
	
		if (!validateEmail( userEmail)) 
        {
			let error = document.getElementById("errorBox");
			error.innerHTML = "Invalid Email / Eg - abc@anymail.anydomain";
			formIsValid = false;
		} 
		
		if (!validatePassword(userPassword )) 
		{
           	let error = document.getElementById("errorBox");
			error.innerHTML = "Invalid User Password must be more than 6 char";
			formIsValid = false;
		} 

		if(!formIsValid)
        {
			event.preventDefault();
		}
		else
        {
		  let name = userName.value;
		  let email = userEmail.value;
		  let password = userPassword.value;
		  console.log(name);
		    console.log(email);
			  console.log(password);
		  
           
        let userBool = false;
			 try 
			 {
               const res = await fetch(`${API_BASE}/user/check`,
		      {
                method: 'POST',
				credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
              });

                const result = await res.json();
				console.log(result);
                if (res.status == 201)
				  {
			    	   window.location.href = "/Simplyhire/index.html";
				       userBool = true;
                  }
				 else 
				   {
					let error = document.getElementById("errorBox");
		            error.innerHTML = result.message;
                   }
             } 
			 catch (err) 
			 {
                	let error = document.getElementById("errorBox");
			        error.innerHTML = "Server is overloaded by love please try again";
             }


             if(userBool==false)
			 {
		
		     try 
			   {
				console.log("inserting in db");
                const res = await fetch(`${API_BASE}/user/signup`,
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, password })
                });

                const result = await res.json();
				console.log(result);
                 if (res.status == 201)
				  {
				     window.location.href = "/Simplyhire/index.html";
                  }
				else 
				   {
				    let error = document.getElementById("errorBox");
		            error.innerHTML = result.message;
                   }
               } 
			 catch (err) 
			   {
                    let error = document.getElementById("errorBox");
			        error.innerHTML = "Server is overloaded by love please try again";
               }
			 } 
        }
			
}

