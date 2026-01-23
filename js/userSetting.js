 const API_BASE = 'https://simplyhirebackend.onrender.com';
document.addEventListener('DOMContentLoaded', fetchinfo);

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');  
if(userId==null)
{
  window.location.href = "/Simplyhire/SmartPage.html";
}


async function fetchinfo()
{
   
 try{
      const res = await fetch(`${API_BASE}/user/userSetting/${userId}`, {
      method: 'GET',
      credentials: 'include',  
      mode: 'cors'              
    });

    let result = await res.json();
    
   
    if(res.status == 500)
      {
        let error = document.getElementById('errorBox');
        error.innerHTML = result.message;
      }

    if(res.status == 200)
      {
        console.log(result)
        let name = document.getElementById("currentName")
        let email = document.getElementById("currentEmail")
        name.innerHTML = result[0].name;
        email.innerHTML = result[0].email;
      }
    }
    catch(err)
    {
        console.log(err)
        //  window.location.href = "/Simplyhire/ErrorPage.html";
    
    }
    
};

let changeClicked = document.getElementById("changeButton")
changeClicked.addEventListener('submit',changeinfo)


async function changeinfo(event)
 {
  event.preventDefault();
  let newName = document.getElementById("new-name");
  let changedName = newName.value;
  console.log(changedName)

  try{
      const res = await fetch(`${API_BASE}/user/changedName`,
		     {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             credentials: 'include', 
             body: JSON.stringify({changedName,userId})
             });
 
        const result = await res.json();
 
        if (res.status == 200)
	 	     {   
            window.location.reload();
         }
        else
        {
            let errorMessage = document.getElementById("errorBox");
            errorMessage.innerHTML= result.message;
        }
    }
    catch(err)
     {
          let errorMessage = document.getElementById("errorBox");
          errorMessage.innerHTML= "Server : dont disburb me , I am busy talking with my boyfriend. I am feeling low pllz try again..";
    }
    
};



let mainClicked = document.getElementById("mainButton");
mainClicked.addEventListener('click',moveToMain);

function moveToMain()
{
     const params = new URLSearchParams();
     params.set("userId", userId);
     window.location.href = `/Simplyhire/main.html?${params.toString()}`

}


let dashBoardClicked = document.getElementById("DashboardButton");
dashBoardClicked.addEventListener('click',moveToUserDash);

async function moveToUserDash()
{
    const params = new URLSearchParams();
    params.set("userId", userId);
    window.location.href = `/Simplyhire/userdashboard.html?${params.toString()}`
}


let contactClicked = document.getElementById("ContactButton");
contactClicked.addEventListener('click',moveToContact);

async function moveToContact()
{   
    const params = new URLSearchParams();
    params.set("userId", userId);
    window.location.href = `/Simplyhire/conatact.html?${params.toString()}`
}

let logoutClicked = document.getElementById("logOut");
logoutClicked.addEventListener('click',logOutFunction);

async function logOutFunction()
{
    window.location.href = '/Simplyhire/index.html'
}