
// document.addEventListener('DOMContentLoaded', function() {
//     const serviceCards = document.querySelectorAll('.service-card');

//     serviceCards.forEach(card => {
//         card.addEventListener('click', function() {
//             const serviceType = this.getAttribute('data-servicetype');
//             window.location.href = `providerlist.html?servicetype=${serviceType}`;
//         });
//     });
// });


const list= document.querySelectorAll('.provider-card');

list.forEach(names => { names.addEventListener('click',selectAndRedirect )} );

function selectAndRedirect()
{
   
    const nameElement = this.querySelector('h2.names');
    if (nameElement) {
        const innerHTMLContent = nameElement.innerHTML;
        const name = innerHTMLContent;
        console.log(innerHTMLContent);
        window.location.href = `profile.html?name=${name}`;
    }
}