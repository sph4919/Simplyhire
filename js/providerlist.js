
 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const service = params.get('servicetype');  
if(service===null)
{
 window.location.href = "/SmartPage.html";
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
          window.location.href = "/ErrorPage.html";
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
          p.innerHTML = data[i].short_description;
          let providerName = h2.innerHTML;
          providerCard.addEventListener('click',event => toTheProfile(providerName,event))
          providerCard.append(h2, p);
          providerContainer.append(providerCard);

       }

   }
  catch(err)
   {
    window.location.href = "/ErrorPage.html";
   } 

    
};

function toTheProfile(providerName)
{

    window.location.href = `../profile.html?providerName=${encodeURIComponent(providerName)}`;

}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
   try 
		{
      const res = await fetch(`${API_BASE}user/logout`,
		    {
          method: 'POST',
          credentials : 'include',
          headers: { 'Content-Type': 'application/json' }
        });

      if (res.ok)
          {
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
