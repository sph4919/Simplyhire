
const params = new URLSearchParams(window.location.search);
const personalName = params.get('providerName');  

if(personalName===null)
{
 window.location.href = "/SmartPage.html";
}


document.addEventListener('DOMContentLoaded', fetchServies);

let clickedButton = document.getElementById("createReqButton");
clickedButton.addEventListener('click',event => toTheRequest(personalName,event));



async function fetchServies()
{
    
  try
   {
     
      const res = await fetch(`http://localhost:3000/user/providerInfoFetch/${personalName}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });
   if(res.status == 401)
        {
          window.location.href = "/ErrorPage.html";
        }
      let data = await res.json();
      console.log(data); // for debugging


        const profileContainer = document.getElementById('profileBox');
        const h2name = document.createElement('h2');
        h2name.classList.add("personalName");
        h2name.innerHTML = data[0].name;
        const ptype = document.createElement('p');
        ptype.classList.add("personaljobtype");
        ptype.innerHTML = data[0].job_type;
        const pdescrip = document.createElement('p');
        pdescrip.classList.add("personaldescription");
        pdescrip.innerHTML = data[0].description;
        const spanRate = document.createElement('span');
        spanRate.classList.add("personaldescription");
        spanRate.innerHTML = "$" + data[0].rate;
        profileContainer.append(h2name, ptype,pdescrip,spanRate);
   }
  catch(err)
   {
    
        let errorMessage = document.getElementById("errorBox");
        errorMessage.innerHTML= "Server is sleeping by good night";
        
   } 

    
};

function toTheRequest(personalName)
{
     console.log("clicked");
    window.location.href = `../request.html?providerName=${encodeURIComponent(personalName)}`;

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
