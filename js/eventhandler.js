
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

// Function to validate password using regex
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



 function validateindexuser(event)
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
			console.log("Validation scuccessfull.");
			window.location.href = "main.html"; 
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
		}


}




