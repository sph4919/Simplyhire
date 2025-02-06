document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-servicetype');
            window.location.href = `providerlist.html?servicetype=${serviceType}`;
        });
    });
});
