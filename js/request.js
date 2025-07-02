const params = new URLSearchParams(window.location.search);
const personalName = params.get('providerName');  

document.addEventListener('DOMContentLoaded',findServiceProviderId);

let reqButton = document.getElementById("reqButton");
reqButton.addEventListener('click',toTheConformation);

let serviceProviderId;

async function findServiceProviderId()

{
          try
			 {
               const res = await fetch('http://localhost:3000/api/findServiceProviderId',
		      {
                method: 'POST',
				credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({personalName})
              });

                const payload = await res.json();
                const outcome = payload.result;
                if (res.status == 201)
				  {
                       serviceProviderId = outcome[0].serviceproviderid;
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

   };


async function toTheConformation(event)
{
    event.preventDefault();
    let street = document.getElementById("street").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let description = document.getElementById("reqDescription").value;
    
    
          try
			 {
               const res = await fetch('http://localhost:3000/api/createRequest',
		      {
                method: 'POST',
				credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({street,city,state,zip,description,serviceProviderId})
              });

                const result = await res.json();
			        	console.log(result);
                if (res.status == 201)
				  {
                   alert("Request created");
				   window.location.href = "../comformationPage.html";
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

   };
