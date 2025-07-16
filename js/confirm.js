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

       if(res.status == 401)
        {
          window.location.href = "/ErrorPage.html";
        }
         
      }
        catch (e) 
        {
          console.error('Network error on logout:', e);
          alert('Could not reach server.');
        }
}



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
