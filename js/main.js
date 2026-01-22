 const API_BASE = 'https://simplyhirebackend.onrender.com';
document.addEventListener('DOMContentLoaded', fetchServies);

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
if(userId===null)
{
  window.location.href = "/Simplyhire/SmartPage.html";
}



async function fetchServies()
{
   
 try{
      const res = await fetch(`${API_BASE}/user/mainFetch`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

    let result = await res.json();
    
    if(res.status == 401)
      {
        window.location.href = "/Simplyhire/ErrorPage.html";
      
      }
    if(res.status == 500)
      {
        let error = document.getElementById('errorBox');
        error.innerHTML = result.message;
      }

    if(res.status == 200)
      {
       const serviceContainer = document.getElementById('container');
       for(let i=0; i< result.length;i++)
        {
          const card = document.createElement("div");
          card.classList.add("service-card");
          const h2 = document.createElement('h2');
          h2.classList.add("type-heading");
          h2.innerHTML = result[i].service_type;
          const p = document.createElement('p');
          p.classList.add("type-description");
          p.innerHTML = result[i].servicedescription;
          card.append(h2, p);
          let serviceName = h2.innerHTML;
          card.addEventListener('click',event => toTheProviderlist(serviceName,event))
          serviceContainer.append(card);
        }
      }
    }
    catch(err)
    {
         window.location.href = "/Simplyhire/ErrorPage.html";
    
    }
    
};

function toTheProviderlist(serviceName)
{
     const params = new URLSearchParams();
     params.set("userId", userId);
     params.set("servicetype", serviceName);
     window.location.href = `/Simplyhire/providerlist.html?${params.toString()}`

  

}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
   try 
		{
      const res = await fetch(`${API_BASE}/user/logout`,
		    {
          method: 'POST',
          credentials : 'include',
          headers: { 'Content-Type': 'application/json' }
        });

      if (res.ok)
          {
            window.location.href = '/Simplyhire/index.html';
        
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
