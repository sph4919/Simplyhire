
let userlogin = document.getElementById("user-form");
userlogin.addEventListener("submit",sendAutenReq);



async function sendAutenReq(event)
 {
  event.preventDefault();
  let UserEmail = document.getElementById("user-email");
  let UserPassword = document.getElementById("user-password");
  let email = UserEmail.value;
  let password = UserPassword.value;

  try{
      const res = await fetch(`http://localhost:3000/user/userLogin`,
		     {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             credentials: 'include', 
             body: JSON.stringify({email, password})
             });
 
        const result = await res.json();
 
        if (res.status == 202)
		{
			window.location.href = "/main.html";
        }
        else if (res.status == 401)
        {
            let errorMessage = document.getElementById("errorBox");
            errorMessage.innerHTML= result.message;
        }
        else
        {
            let errorMessage = document.getElementById("errorBox");
            errorMessage.innerHTML= result.message;
        }
    }
    catch(err)
     {
          let errorMessage = document.getElementById("errorBox");
          errorMessage.innerHTML= "Server : dont disburb me , I am busy taking with my boyfriend. I am feeling low pllz try again..";
    }
    
     
};

const elements = document.querySelectorAll('.user-login, .signup');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.8s ease';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});



document.addEventListener("DOMContentLoaded",sessionHandler);


 async function sessionHandler(event)
{


			 try 
			   {
                const res = await fetch('http://localhost:3000/user/sessionChecker',
		        {
				  credentials: 'include'
                });

                const result = await res.json();
				
                 if (res.status == 200)
				  {
				   console.log("session removed"); //new session started
                  }
	
			 }
			 catch (err) 
			   {
                 let errorMessage = document.getElementById("errorBox");
                 errorMessage.innerHTML= 'Server error plz contact admin if that mf is sleeping';
               }


}