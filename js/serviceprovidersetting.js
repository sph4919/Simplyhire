 const API_BASE = 'https://simplyhirebackend.onrender.com';
document.addEventListener('DOMContentLoaded', getSettingDetail);


const params = new URLSearchParams(window.location.search);
const serviceproviderId = params.get('serviceproviderId');  
if(serviceproviderId==null)
{
  window.location.href = "/Simplyhire/SmartPage.html";
}


async function getSettingDetail()
{
  try
   {
      const res = await fetch(`${API_BASE}/provider/getSettingDetail/${serviceproviderId}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

    if(res.status == 401)
        {
          window.location.href = "/Simplyhire/ErrorPage.html";

        }
      let data = await res.json();
      console.log(data);

    const providerName = document.getElementById('providerName');
    const providerRate = document.getElementById('currentRate');

          providerName.innerHTML = data[0].name;
          providerRate.innerHTML = "$" + data[0].rate;

   }

  catch(err)
   {
    console.log(err);
   } 

    
};

let rateButton = document.getElementById('changeRate');
rateButton.addEventListener('click',updateRate);

async function updateRate()
{
    let newRate = document.getElementById('hourly-rate').value;
     try 
	 {
      const res = await fetch(`${API_BASE}/provider/updateRate`,
	     {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({newRate,serviceproviderId}),
        credentials: 'include'
       });

        const result = await res.json();
				console.log(result);
        if (res.status == 200)
				  {
           window.location.reload();
				   console.log("Rate updated scuccessfull.");
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
	 } 
    



   
let dashboardClicked = document.getElementById("DashButton");
 dashboardClicked.addEventListener('click',moveToUserDash);
function moveToUserDash()
{
 
    const params = new URLSearchParams();
    params.set("serviceproviderId", serviceproviderId);
    window.location.href = `/Simplyhire/servicedashboard.html?${params.toString()}`;
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
