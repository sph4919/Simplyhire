 const API_BASE = 'https://simplyhirebackend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('service-signupform');
  const nameI = document.getElementById('service-user-name');
  const emailI= document.getElementById('service-user-email');
  const passI = document.getElementById('service-user-password');
  const jobI  = document.getElementById('job-id-service');
  const shortI= document.getElementById('short-description');
  const descI = document.getElementById('service-description');
  const rateI = document.getElementById('per-hour-rate-service');
 

  // Load services into the job dropdown
  (async function listServices() {
    try {
      const r = await fetch(`${API_BASE}/provider/listServices`);
      const data = await r.json();
      data.forEach(svc => {
        const opt = document.createElement('option');
        opt.value = svc.service_type;
        opt.textContent = svc.service_type;
        jobI.append(opt);
      });
    } catch (e) {
        let error = document.getElementById("errorBox");
			error.innerHTML = 'Server is on smoke break plz try it again';
    }
  })();


  form.addEventListener('submit', async e => 
    {
     e.preventDefault();
     let formIsValid = true;

    if (!/^[A-Za-z ]+$/.test(nameI.value)) {
      let error = document.getElementById("errorBox");
			error.innerHTML = "'Please enter a valid name";
			formIsValid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(emailI.value)) {
      let error = document.getElementById("errorBox");
		  error.innerHTML = "'Please enter a valid email";
			formIsValid = false;
    }
    if (passI.value.length < 6) {
      let error = document.getElementById("errorBox");
			error.innerHTML = 'Password must be at least 6 chars';
			formIsValid = false;
    }
    if (descI.value.trim().split(/\s+/).length < 10) {
      let error = document.getElementById("errorBox");
			error.innerHTML = 'Description must be at least 10 words';
			formIsValid = false;
    }

    const payload = {
      name:             nameI.value.trim(),
      email:            emailI.value.trim(),
      password:         passI.value,
      type:             jobI.value,
      shortDescription: shortI.value.trim(),
      description:      descI.value.trim(),
      rate:             Number(rateI.value)
    };

    if(formIsValid===true)
    {
      let userExist = false;
       try {
        console.log("check the user exist or not"); //for debugging
 
          const check = await fetch(
          `${API_BASE}/provider/serviceSignUpCheck`,
          {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ email: payload.email })
          }
         );
         console.log(check.json()); //for degugging

        if (check.status === 409)
         {
           console.log("User exist "); //for debugging
           let error = document.getElementById("errorBox");
		    	 error.innerHTML = 'Email already registered. ';
		       userExist = true;
         }
        if (check.status === 500)
         {
           let error = document.getElementById("errorBox");
		     	 error.innerHTML = "server error plz contact the admin";
         }
   
       if(userExist===false)
       {
        console.log("creating req");
         const signup = await fetch(`${API_BASE}/provider/serviceSignup`,
         {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
         }
       );

         const result = await signup.json();
         if (signup.status === 201)
           {
             window.location.href = '/serviceLogin.html';
           } 
         else 
           {
            let error = document.getElementById("errorBox");
		       	error.innerHTML = result.message;
           }
      }
    }
    catch (err) 
    {
      let error = document.getElementById("errorBox");
			error.innerHTML = 'Server is on smoke break plz try it again';
    }
  }
  });
});