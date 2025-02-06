
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



 function validateloginuser(event)
{

		let email = document.getElementById("user-email");
		let pwd = document.getElementById("user-password");
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
			window.alert("validation success by js")
			console.log("Validation scuccessfull.");
			
		}


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





function validatesignupUser(event)
{
        let name = document.getElementById("user-name-signup")
		let email = document.getElementById("user-email-signup");
		let pwd = document.getElementById("user-password-signup");
		let formIsValid = true;
		

		if (!validateName(name)) 
		{
				window.alert("Invalid name")
				formIsValid = false;
		} 
	
		if (!validateEmail(email)) 
        {
			window.alert("Invalid user email")
			formIsValid = false;
		} 
		
		if (!validatePassword(pwd)) 
		{
            window.alert("Set invalid password")
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