document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/services/snowblower')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.container');
            container.innerHTML = ''; // Clear existing content
            data.forEach(service => {
                const box = document.createElement('div');
                box.className = 'snowblower-box';
                box.innerHTML = `
                    <h2>${service.name}</h2>
                    <p>Description: ${service.description}</p>
                    <p>Hourly Rate: $${service.hourly_rate}/hr</p>
                    <p>Rating: ${service.rating}/5</p>
                    <button class="book-btn">Book Now</button>
                `;
                container.appendChild(box);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
