window.onload = function() {
    fetchReservations();
}

async function fetchReservations() {
    const response = await fetch('http://localhost:4000/api/listeReservationsSitter', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const reservations = data.reservations;

    for (let reservation of reservations) {
        const ownerReponse = await fetch(`http://localhost:4000/api/owner/${reservation.user}`);
        const petResponse = await fetch(`http://localhost:4000/api/pet/${reservation.petId}`);
        if (!ownerReponse.ok || !petResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const owner = await ownerReponse.json();
        const pet = await petResponse.json();
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const totalPrice = owner.price * diffDays; // Remplacez owner.price par la valeur correcte

        const reservationDiv = document.createElement('div');
        reservationDiv.className = 'reservation-card';

        const ownerName = document.createElement('h2');
        ownerName.textContent = owner.firstName;
        reservationDiv.appendChild(ownerName);

        const reservationDetails = document.createElement('div');
        reservationDetails.className = 'details';
        reservationDetails.innerHTML = `
            <h3> Garde pour ${pet.name}</h3>
            <p>Start Date: ${new Date(reservation.startDate).toLocaleDateString()}</p>
            <p>End Date: ${new Date(reservation.endDate).toLocaleDateString()}</p>
            <p>${diffDays} jours</p>
            <p>${totalPrice} euros </p>
            <p id="status-${reservation._id}">Status: ${reservation.status}</p>
        `;
        reservationDiv.appendChild(reservationDetails);

        const availabilityButton = document.createElement('button');
        availabilityButton.textContent = 'Je suis disponible pour cette garde';
        availabilityButton.id = "disponibility";
        reservationDiv.appendChild(availabilityButton);

        const contactButton = document.createElement('button');
contactButton.textContent = 'Contacter';
contactButton.id = 'contact-button';
contactButton.dataset= reservation.user; 
// Stockez l'ID du petSitter dans un attribut de données

reservationDetails.appendChild(contactButton);

// Lorsque le bouton de contact est cliqué, redirigez vers la page de messagerie avec l'ID du petSitter dans l'URL
contactButton.addEventListener('click', () => {
    window.location.href = `http://localhost:4000/messages?recipient=${reservation.user}&request=${reservation._id}`;
});

        document.body.appendChild(reservationDiv);

        
        availabilityButton.addEventListener('click', async () => {
            try {
                await updateReservationStatus(reservation._id);
                // Update status text
                const statusElement = document.getElementById(`status-${reservation._id}`);
                statusElement.textContent = 'Status: disponible';
            } catch (error) {
                console.log('Error:', error);
            }
        });
    }
    

    async function updateReservationStatus(reservationId) {
        const response = await fetch(`http://localhost:4000/api/reservations/${reservationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                status: 'disponible' // Remplacez 'updatedStatus' par le nouveau statut que vous voulez définir
            })
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }
}
