 const API_BASE = 'https://simplyhirebackend.onrender.com';

document.addEventListener('DOMContentLoaded', fetchDash);

async function fetchDash()
{
  try
   {
      const res = await fetch(`${API_BASE}/provider/serviceDashboardFetch`, {
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
         <br> <br> <br>
`;

          notificationContainer.append(notificationCard);
          let button = notificationCard.querySelector(".accept-button");
          let reqId = data[i].request_id;
          button.addEventListener('click', event => acceptedFunction(reqId,event));
       }

   }
  catch(err)
   {
    let error = document.getElementById('errorBox');
    error.innerHTML = "Server is high , please contact admin";
   } 

};


async function acceptedFunction(reqId, event) {
  const button = event.target;
  const statusText = button.previousElementSibling.querySelector('.status-text');

  try {
    const res = await fetch(`${API_BASE}/provider/requestAccepted`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reqId }),
      credentials: 'include'
    });

    const result = await res.json();
    console.log(result); // For debugging

    if (res.ok) {
      statusText.textContent = "confirm";
      statusText.style.color = "#00ff90";
      button.disabled = true;
      button.textContent = "Accepted";
      button.style.background = "gray";
      button.style.cursor = "not-allowed";
    }
  } catch (err) {
       let error = document.getElementById('errorBox');
       error.innerHTML = "Server is high , please contact admin";
   
  }
}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);


async function logOutFunction()
{
   try 
		{
      const res = await fetch(`${API_BASE}/provider/logout`,
		    {
          method: 'POST',
          credentials : 'include',
          headers: { 'Content-Type': 'application/json' }
        });

      if (res.ok)
          {
            // window.location.href = '/Simplyhire/index.html';
              window.location.href = '/index.html';
          }
          else 
          {
            let error = document.getElementById('errorBox');
            error.innerHTML = result.message;
          }
        }
        catch (e) 
        {
          let error = document.getElementById('errorBox');
          error.innerHTML = "Server is high , please contact admin";
        }
      }

