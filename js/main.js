document.addEventListener('DOMContentLoaded', fetchServies);


async function fetchServies()
{
   
  try
   {
     
       const res = await fetch('http://localhost:3000/user/mainFetch', {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

    if(res.status == 401)
        {
          window.location.href = "/ErrorPage.html";
        }
      let data = await res.json();
      console.log(data);


    const serviceContainer = document.getElementById('container');


       for(let i=0; i< data.length;i++)
       {
          const card = document.createElement("div");
          card.classList.add("service-card");
          const h2 = document.createElement('h2');
          h2.classList.add("type-heading");
          h2.innerHTML = data[i].service_type;
          const p = document.createElement('p');
          p.classList.add("type-description");
          p.innerHTML = data[i].service_description;
          card.append(h2, p);
          let serviceName = h2.innerHTML;
          card.addEventListener('click',event => toTheProviderlist(serviceName,event))
          serviceContainer.append(card);

       }

   }
  catch(err)
   {
    console.log(err);
   } 

    
};

function toTheProviderlist(serviceName)
{

    window.location.href = `../providerlist.html?servicetype=${encodeURIComponent(serviceName)}`;

}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
  

   try 
			   {
          const res = await fetch('http://localhost:3000/user/logout',
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
            const err = await res.json();
            alert('Logout failed: ' + err.message);
          }
        }
        catch (e) 
        {
          console.error('Network error on logout:', e);
          alert('Could not reach server.');
        }
      }
