document.addEventListener('DOMContentLoaded', fetchRequests);


async function fetchRequests()
{
   
  try
   {
      const res = await fetch('http://localhost:3000/api/userReqFetch', {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

      let data = await res.json();
      console.log(data);


    const reqContainer = document.getElementById('reqContainer');


       for(let i=0; i< data.length;i++)
       {
          
           const response = await fetch(`http://localhost:3000/api/providerNameFetch/${data[i].serviceprovider_id}`, {
           method: 'GET',
           credentials: 'include',  
           mode: 'cors'              
         });

          let dataName = await response.json();
          console.log(dataName);

          const reqCard = document.createElement("div");
          reqCard.classList.add("request-card");
          const h2 = document.createElement('h2');
          h2.innerHTML = dataName[0].name;
          const p1 = document.createElement('p');
          p1.classList.add("req-description");
          p1.innerHTML = data[i].description;
          const p2 = document.createElement('p');
          p2.classList.add("req-status");
          let reqStatus = data[i].status;
          p2.innerHTML = reqStatus.toString().toUpperCase();
          const p3 = document.createElement('p');
          p3.classList.add("req-address");
          p3.innerHTML = data[i].address + " " + data[i].city + " " +  data[i].state;

          reqCard.append(h2, p1 , p2 , p3 );
          reqContainer.append(reqCard);

       }

   }
  catch(err)
   {
    console.log(err);
   } 

    
};

