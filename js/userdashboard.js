
 const API_BASE = 'https://simplyhirebackend.onrender.com';

document.addEventListener('DOMContentLoaded', fetchRequests);


async function fetchRequests()
{
   
  try
   {
      const res = await fetch(`${API_BASE}/user/userReqFetch`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });
      if(res.status = 200)
      {

      let data = await res.json();
      console.log(data); //for debugging
      const reqContainer = document.getElementById('reqContainer');

       for(let i=0; i< data.length;i++)
       {
          
           const response = await fetch(`${API_BASE}/user/providerNameFetch/${data[i].serviceprovider_id}`, {
           method: 'GET',
           credentials: 'include',  
           mode: 'cors'              
         });

          let dataName = await response.json();
          console.log(dataName); //for debugging

          const reqCard = document.createElement("div");
          reqCard.classList.add("request-card");
          const h2 = document.createElement('h2');
          h2.innerHTML = "Provider Name: "+ dataName[0].name;
          const p1 = document.createElement('p');
          p1.classList.add("req-description");
          p1.innerHTML ="Description Of Job "+ data[i].description;
          const p2 = document.createElement('p');
          p2.classList.add("req-status");
          let reqStatus = "Status: "+ data[i].status;
          p2.innerHTML = reqStatus.toString().toUpperCase();
          const p3 = document.createElement('p');
          p3.classList.add("req-address");
          p3.innerHTML = "Address: "+ data[i].address + " " + data[i].city + " " +  data[i].state;
          reqCard.append(h2, p1 , p2 , p3 );
          reqContainer.append(reqCard);

       }

      }
      else if(res.status==401)
      {
        window.location.href='/ErrorPage.html';
      }

   }
  catch(err)
   {
   window.location.href='/ErrorPage.html';
   } 

    
};

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
