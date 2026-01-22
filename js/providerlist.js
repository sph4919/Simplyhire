
 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
const service = params.get('servicetype');   
if(service===null)
{
  window.location.href = "/Simplyhire/SmartPage.html";

}

document.addEventListener('DOMContentLoaded', fetchServies);

async function fetchServies()
{
    
  try
   {
     
       const res = await fetch(`${API_BASE}/user/providerListFetch/${service}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });
     if(res.status == 401)
        {
          window.location.href = "/Simplyhire/ErrorPage.html";
          
        }
       if(res.status == 500)
      {
        let error = document.getElementById('errorBox');
        error.innerHTML = result.message;
      }
      let data = await res.json();
      console.log(data);// for debugging


    const providerContainer = document.getElementById('providerContainer');

       for(let i=0; i< data.length;i++)
       {
          const providerCard = document.createElement("div");
          providerCard.classList.add("provider-card");
          const h2 = document.createElement('h2');
          h2.classList.add("names");
          h2.innerHTML = data[i].name;
          const p = document.createElement('p');
          p.classList.add("personalDescription");
          p.innerHTML = data[i].shortdescription;
          let providerName = h2.innerHTML;
          providerCard.addEventListener('click',event => toTheProfile(providerName,event))
          providerCard.append(h2, p);
          providerContainer.append(providerCard);

       }

   }
  catch(err)
   {
    window.location.href = "/Simplyhire/ErrorPage.html";
   
   } 

    
};

function toTheProfile(providerName)
{    console.log("clicked")
     const params = new URLSearchParams();
     params.set("userId", userId);
     params.set("servicetype", service);
     params.set("providerName", providerName);
     console.log(service)
     window.location.href = `/Simplyhire/profile.html?${params.toString()}`


}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}
