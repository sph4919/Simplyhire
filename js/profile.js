 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
const service = params.get('servicetype');  
const personalName = params.get('providerName');  

if(personalName===null)
{
  window.location.href = "/Simplyhire/SmartPage.html";
}


document.addEventListener('DOMContentLoaded', fetchServies);

let clickedButton = document.getElementById("createReqButton");
clickedButton.addEventListener('click',event => toTheRequest(personalName,event));



async function fetchServies()
{
    
  try
   { 
      const res = await fetch(`${API_BASE}/user/providerInfoFetch/${personalName}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });
   
      let data = await res.json();
        if(res.status == 500)
      {
        let error = document.getElementById('errorBox');
        error.innerHTML = result.message;
      }
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
    
     window.location.href = "/Simplyhire/ErrorPage.html";
   
   } 

    
};

function toTheRequest(personalName)
{
     const params = new URLSearchParams();
     params.set("userId", userId);
     params.set("servicetype", service);
     params.set("providerName", personalName);
     window.location.href = `/Simplyhire/request.html?${params.toString()}`;
}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);


async function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}
