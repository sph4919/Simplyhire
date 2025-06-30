
let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",sendAutenReq);



async function sendAutenReq(event)
 {
  event.preventDefault();
  let UserEmail = document.getElementById("user-email");
  let UserPassword = document.getElementById("user-password");
  let email = UserEmail.value;
  let password = UserPassword.value;

	 try 
		 {
      const res = await fetch(`http://localhost:3000/api/userLogin`,
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
        alert("Login successful! with correct creds");
			  console.log("Validation scuccessfull.");
			  window.location.href = "../main.html";
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
};
