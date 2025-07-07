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
         <h2>Request ID: ${data[i].request_id}</h2>
         <p><strong>Description:</strong> ${data[i].description}</p>
         <p><strong>Location:</strong> ${data[i].address}, ${data[i].city}, ${data[i].state} ${data[i].zip}</p>
         <p><strong>Status:</strong> <span class="status-text">${data[i].status}</span></p>
         <button class="accept-button">Accept the Application</button>
`;

          notificationContainer.append(notificationCard);
          let button = notificationCard.querySelector(".accept-button");
          let reqId = data[i].request_id;
          button.addEventListener('click', event => acceptedFunction(reqId,event));
       }

   }
  catch(err)
   {
    console.log(err);
   } 

};


async function acceptedFunction(reqId, event) {
  const button = event.target;
  const statusText = button.previousElementSibling.querySelector('.status-text');

  try {
    const res = await fetch('http://localhost:3000/provider/requestAccepted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reqId }),
      credentials: 'include'
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      statusText.textContent = "confirm";
      statusText.style.color = "#00ff90";
      button.disabled = true;
      button.textContent = "Accepted";
      button.style.background = "gray";
      button.style.cursor = "not-allowed";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Server error");
  }
}
