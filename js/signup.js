
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
			window.alert("Invalid name")
			formIsValid = false;
		} 
	
		if (!validateEmail( userEmail)) 
        {
			window.alert("Invalid user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(userPassword )) 
		{
            window.alert("Set invalid password")
			formIsValid = false;
		} 

		if(!formIsValid)
        {
			console.log("invalid info for signUp");
			event.preventDefault();
		}
		else
        {
		  let name = userName.value;
		  let email = userEmail.value;
		  let password = userPassword.value;
           

        let userBool = false;
			 try 
			 {
               const res = await fetch('http://localhost:3000/user/check',
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
                   alert("User already exits");
				   window.location.href = "../index.html";
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
                const res = await fetch('http://localhost:3000/user/signup',
		        {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, password })
                });

                const result = await res.json();
				console.log(result);
                 if (res.status == 201)
				  {
                   alert("Signup successful!");
				   console.log("Validation scuccessfull.");
				   window.location.href = "../index.html";
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

