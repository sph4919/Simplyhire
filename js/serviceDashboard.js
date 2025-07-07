document.addEventListener('DOMContentLoaded', fetchDash);

async function fetchDash()
{
  try
   {
      const res = await fetch('http://localhost:3000/provider/serviceDashboardFetch', {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

      let data = await res.json();
      console.log(data);
      const notificationContainer = document.getElementById('notifications-container');

       for(let i=0; i< data.length;i++)
       {
          const notificationCard = document.createElement("div");
          notificationCard.classList.add("notification-card");
          notificationCard.innerHTML = `
           <h2>RequestId: ${data[i].request_id}</h2>
           <p><strong>Details:</strong>  ${data[i].description}</p>
           <p><strong>Location:</strong> ${data[i].address} ,  ${data[i].city} ,  ${data[i].state} ,  ${data[i].zip}</p>
           <p id="currentStatus"><h3>${data[i].status}</h3></p>
           <button class="accept-button" id="statusButton">Accept the Application</button>`;
          notificationContainer.append(notificationCard);
          let button = document.getElementById(statusButton);
          let reqId = data[i].request_id;
          button.addEventListener('click', event => acceptedFunction(reqId,event));

       }

   }
  catch(err)
   {
    console.log(err);
   } 

};


async function acceptedFunction(reqId)
{
   try 
	 {
      const res = await fetch('http://localhost:3000/provider/requestAccepted',
		{
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({reqId}),
       credentials: 'include'
      });

      const result = await res.json();
		console.log(result);
      if (res.ok)
		 {
		  console.log("accepted");
		  let status = document.getElementById("currentStatus");
        status.innerHTML ="Accepted";
       }
      } 
		catch (err) 
		{
       console.error("Fetch error:", err);
       alert("Server error");
      }
   
}