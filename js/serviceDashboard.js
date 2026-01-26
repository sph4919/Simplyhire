 const API_BASE = 'https://simplyhirebackend.onrender.com';


const params = new URLSearchParams(window.location.search);
const serviceproviderId = params.get('serviceproviderId');  
if(serviceproviderId==null)
{
  window.location.href = "/Simplyhire/SmartPage.html";
}


document.addEventListener('DOMContentLoaded', fetchDash);

async function fetchDash()
{
  try
   {
      const res = await fetch(`${API_BASE}/provider/serviceDashboardFetch/${serviceproviderId}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

      if(res.status == 401)
        {
          window.location.href = "/Simplyhire/ErrorPage.html";
               
        }

      let data = await res.json();
      console.log(data); // for dedugging
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


async function acceptedFunction(reqId, event) 
{
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


let editClicked = document.getElementById("EditButton");
editClicked.addEventListener('click',moveToUserEdit);
function moveToUserEdit()
{
 
    const params = new URLSearchParams();
    params.set("serviceproviderId", serviceproviderId);
    window.location.href = `/Simplyhire/serviceProviderSetting.html?${params.toString()}`;
}


let contactClicked = document.getElementById("ContactButton");
contactClicked.addEventListener('click',moveToContact);

 function moveToContact()
 {   
    const params = new URLSearchParams();
    params.set("serviceproviderId", serviceproviderId);
    window.location.href = `/Simplyhire/contact.html?${params.toString()}`;
 }

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html';
}
