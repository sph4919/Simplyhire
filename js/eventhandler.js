function validateEmail(email) {
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



 async function validateUserLogin(event)
{
        event.preventDefault();
		let UserEmail = document.getElementById("user-email");
		let UserPassword = document.getElementById("user-password");
		let formIsValid = true;

		let email = UserEmail.value;
		let password = UserPassword.value;
		
	
		if (!validateEmail(UserEmail)) 
        {
			window.alert("Wrong user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(UserPassword)) 
		{
            window.alert("Wrong user password")
			formIsValid = false;
		} 

		if(!formIsValid)
        {
			event.preventDefault();
		}
		else
        {
			
		     try 
			   {
                const res = await fetch('http://localhost:3000/api/userLogin',
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
				   window.location.href = "../main.html";
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
			 
        };

}


function validateName(name) {
   
    let nameRegex= /^\w+[\D]$/ig;
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
		  let email =userEmail.value;
		  let password = userPassword.value;
           

        let userBool = false;
			 try 
			 {
               const res = await fetch('http://localhost:3000/api/check',
		      {
                method: 'POST',
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
                const res = await fetch('http://localhost:3000/api/signup',
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




 function servicevalidateloginuser(event)
{

		let email = document.getElementById("service-user-email");
		let pwd = document.getElementById("service-user-password");
		let formIsValid = true;
		
	
		if (!validateEmail(email)) 
        {
			window.alert("Wrong user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(pwd)) 
		{
            window.alert("Wrong user password")
			formIsValid = false;
		} 
		if(!formIsValid)
        {
			event.preventDefault();
		}
		else
        {
			console.log("Validation scuccessfull.");
			window.alert("sign up success by js")
		}


}


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





function servicevalidatesignup(event)
{
	    let name = document.getElementById("service-user-name")
		let email = document.getElementById("service-user-email");
		let pwd = document.getElementById("service-user-password");
		let description = document.getElementById("service-description");

		let formIsValid = true;
		

		if (!validateName(name)) 
			{
				window.alert("Wrong Name")
				formIsValid = false;
			} 
	
		if (!validateEmail(email)) 
        {
			window.alert("Wrong user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(pwd)) 
		{
            window.alert("Wrong user password")
			formIsValid = false;
		} 
		if (!validateDescription(description)) 
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
			console.log("Validation scuccessfull.");
			window.alert("sign up success by js")
		}


}