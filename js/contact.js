let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
   try 
	  {
          const res = await fetch('http://localhost:3000/api/logout',
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
