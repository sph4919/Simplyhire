
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

const params = new URLSearchParams(window.location.search);
const personalName = params.get('providerName');
if(personalName===null)
{
  window.location.href="/SmartPage.html";
}

let serviceProviderId;

document.addEventListener('DOMContentLoaded', findServiceProviderId);

async function findServiceProviderId() {
  try {
    const res = await fetch('http://localhost:3000/user/findServiceProviderId', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personalName })
    });
 if(res.status == 401)
        {
          window.location.href = "/ErrorPage.html";
        }
  const payload = await res.json();

    if (res.status == 500) 
      {
      window.location.href = "/ErrorPage.html";
      }

    serviceProviderId = rows[0].serviceproviderid;
    console.log('Found serviceProviderId =', serviceProviderId);
  }
  catch (err) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please Contact us on Contact info you will be short directed to Contact page in 10 sec.';
    setTimeout(()=>{window.location.href="/contact.html"},10000);
  }
  
}

async function toTheConformation(event) {
  event.preventDefault();

  const street      = document.getElementById('street').value;
  const city        = document.getElementById('city').value;
  const state       = document.getElementById('state').value;
  const zip         = document.getElementById('zip').value;
  const description = document.getElementById('reqDescription').value;

  // Run validations
  if (!validateStreetAddress(street)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid street address (e.g. "123 Main St").';
  }
  if (!validateCity(city)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid city name (letters, spaces, hyphens).';
  }
  if (!validateProvince(state)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid Canadian province name.';
  }
  if (!validatePostalCode(zip)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter a valid Canadian postal code (e.g. A1A 1A1).';
  }
  if (!validateDescription(description)) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Please enter at least 10 words in the description.';
  }
  if (!serviceProviderId) {
    let errorMessage = document.getElementById("errorBox");
    errorMessage.innerHTML= 'Service provider ID not set yet. Try reloading the page.';
  }

  
  try {
    const res = await fetch('http://localhost:3000/user/createRequest', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street, city, state, zip, description, serviceProviderId
      })
    });

    const result = await res.json();
    if (res.status === 201)
       {
        window.location.href = '/comformationPage.html';
       } 
    else
       {
       alert('Error: ' + (result.message || res.status));
       }
  }
  catch (err) {
    console.error('Fetch error:', err);
    alert('Server error while creating request');
  }
}

// Wire up the "Submit Request" button
const reqBtn = document.getElementById('reqButton');
if (reqBtn) {
  reqBtn.addEventListener('click', toTheConformation);
}

// --------------- Logout Functionality ---------------

async function logOutFunction() {
  try {
    const res = await fetch('http://localhost:3000/user/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      window.location.href = '/index.html';
    }
    else {
      const err = await res.json();
      alert('Logout failed: ' + err.message);
    }
  }
  catch (e) {
    console.error('Network error on logout:', e);
    alert('Could not reach server.');
  }
}

const logoutBtn = document.getElementById('logOut');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logOutFunction);
}
