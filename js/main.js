document.addEventListener('DOMContentLoaded', fetchServies);

async function fetchServies()
{
    const serviceCards = document.querySelectorAll('.service-card');


  try
   {
      const res = await fetch(`http://localhost:3000/api/mainFetch`);
      let data = res.json();
      console.log(data);
      const card = document.getElementById('card');
      card.setAttribute("data-servicetype",data);
      const name = document.getElementById('serviceName');
      const description = document.getElementById('serviceDescription');
    
      name.value = data.something;
      description.value = data.something;
      

   }
  catch(err)
   {
    console.log(err);
   } 

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-servicetype');
            window.location.href = `providerlist.html?servicetype=${serviceType}`;
        });
    });
};
