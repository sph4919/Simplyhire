
const params = new URLSearchParams(window.location.search);
const personalName = params.get('providerName');  
console.log(personalName);



let reqButton = document.getElementById("reqButton");
clickedButton.addEventListener('click',toTheConformation);



async function toTheConformation()

{
    
    let street = document.getElementById("street").innerHTML;
    let city = document.getElementById("city").innerHTML;
    let state = document.getElementById("state").innerHTML;
    let zip = document.getElementById("zip").innerHTML;
    let description = document.getElementById("reqDescription").innerHTML;
    l
          try
			 {
               const res = await fetch('http://localhost:3000/api/createRequest',
		      {
                method: 'POST',
				credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({street,city,state,zip,description,personalName})
              });

                const result = await res.json();
				console.log(result);
                if (res.status == 201)
				  {
                   alert("Request created");
				   window.location.href = "../conformationPage";
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
