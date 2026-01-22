 const API_BASE = 'https://simplyhirebackend.onrender.com';

document.addEventListener("DOMContentLoaded",conformationSessionCheck);

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);


async function conformationSessionCheck()
{
   try 
	  {
          const res = await fetch(`${API_BASE}/user/sessionCheck`,
		        {
                  method: 'GET',
                  credentials : 'include',
                  mode : 'cors'
        
                });

 
         
      }
        catch (e) 
        {
          console.error('Network error on logout:', e);
          alert('Could not reach server.');
        }
}



