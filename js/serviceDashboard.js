document.addEventListener('DOMContentLoaded', fetchServiceDash);


async function fetchServiceDash()
{


  try
   {
     
      const res = await fetch('http://localhost:3000/api/serviceDashboardFetch', {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

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
          serviceContainer.append(card);

       }

   }
  catch(err)
   {
    console.log(err);
   } 

    
};

