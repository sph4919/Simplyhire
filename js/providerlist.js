
const params = new URLSearchParams(window.location.search);
const service = params.get('servicetype');  
console.log(service);

document.addEventListener('DOMContentLoaded', fetchServies);


async function fetchServies()
{
    
  try
   {
     
       const res = await fetch(`http://localhost:3000/api/providerListFetch/${service}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

      let data = await res.json();
      console.log(data);


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
    console.log(err);
   } 

    
};

function toTheProfile(providerName)
{

    window.location.href = `../profile.html?providerName=${encodeURIComponent(providerName)}`;

}
