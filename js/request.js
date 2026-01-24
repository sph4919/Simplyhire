 const API_BASE = 'https://simplyhirebackend.onrender.com';

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
const service = params.get('servicetype');  
const personalName = params.get('providerName');  

if(personalName===null)
{
  window.location.href="/SmartPage.html";
}


// Description: at least 10 words
function validateDescription(text) {
  const words = text.trim().split(/\s+/);
  return words.length >= 10;
}

// Canadian street address: number + street name
// e.g. "123 Main St", "4567 Rue Wellington"
function validateStreetAddress(addr) {
  const streetRegex = /^[0-9]+\s+[A-Za-z0-9\s\.\-,'’]+$/;
  return streetRegex.test(addr.trim());
}

// City: letters, spaces, hyphens, apostrophes
function validateCity(city) {
  const cityRegex = /^[A-Za-z\-\s']+$/;
  return cityRegex.test(city.trim());
}

// Province/territory
function validateProvince(prov) {
  const provRegex = /^^[A-Za-z\-\s']+$/i;
  return provRegex.test(prov.trim());
}

// Canadian postal code: A1A 1A1 or A1A1A1
function validatePostalCode(code) {
  const pcRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return pcRegex.test(code.trim());
}

// --------------- Service Provider ID Fetch ---------------



let serviceProviderId;

document.addEventListener('DOMContentLoaded', findServiceProviderId);

async function findServiceProviderId() {
  try {
    const res = await fetch(`${API_BASE}/user/findServiceProviderId/${personalName}`, {
      method: 'GET',
      credentials: 'include',
    });

  const payload = await res.json();

    if (res.status == 500) 
      {
       window.location.href = "/Simplyhire/ErrorPage.html";
      }
     console.log(payload.result[0].serviceprovider_id);  //for debugging
     serviceProviderId = payload.result[0].serviceprovider_id;
  }
  catch (err) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please Contact us on Contact info .';
    

  }
  
}

async function toTheConformation(event) {
  event.preventDefault();

  const street      = document.getElementById('street').value;
  const city        = document.getElementById('city').value;
  const state       = document.getElementById('state').value;
  const zip         = document.getElementById('zip').value;
  const description = document.getElementById('reqDescription').value;

  let invalidValues = false;

  // Run validations
  if (!validateStreetAddress(street)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid street address (e.g. "123 Main St").';
    invalidValues =  true;
  }
  if (!validateCity(city)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid city name (letters, spaces, hyphens).';
    invalidValues =  true;
  }
  if (!validateProvince(state)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid Canadian province name.';
    invalidValues =  true;
  }
  if (!validatePostalCode(zip)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid Canadian postal code (e.g. A1A 1A1).';
    invalidValues =  true;
  }
  if (!validateDescription(description)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter at least 10 words in the description.';
    invalidValues =  true;
  }
  if (!serviceProviderId) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Contact the admin. Try to login again page.';
    invalidValues =  true;
  }

  if(invalidValues==false)
  {
  try {
    const res = await fetch(`${API_BASE}/user/createRequest/${userId}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street, city, state, zip, description, serviceProviderId
      })
    });

    const result = await res.json();
    console.log(result); //for debugging
    if (res.status === 201)
       {
        const params = new URLSearchParams();
        params.set("userId", userId);
        window.location.href = `/Simplyhire/confirm.html?${params.toString()}`
       } 
    else
       {
         let errorMessage = document.getElementById("errorBox");
         errorMessage.innerHTML= 'Request generation error plz contact admin or login again';
       }
  }
  catch (err) {
          let error = document.getElementById('errorBox');
          error.innerHTML = "Server is high , please contact admin";
        }
}
}


// Wire up the "Submit Request" button
const reqBtn = document.getElementById('reqButton');
if (reqBtn) 
{
  reqBtn.addEventListener('click', toTheConformation);
}



let mainClicked = document.getElementById("mainButton");
mainClicked.addEventListener('click',moveToMain);

function moveToMain()
{
     const params = new URLSearchParams();
     params.set("userId", userId);
     window.location.href = `/Simplyhire/main.html?${params.toString()}`

}

let contactClicked = document.getElementById("ContactButton");
contactClicked.addEventListener('click',moveToContact);

async function moveToContact()
{   
    const params = new URLSearchParams();
    params.set("userId", userId);
    window.location.href = `/Simplyhire/contact.html?${params.toString()}`
}



let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);


async function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}
