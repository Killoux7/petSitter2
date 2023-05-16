const reservationsContainer = document.createElement('div');
reservationsContainer.id = 'reservations-container';
document.body.appendChild(reservationsContainer);
window.onload = function () {
    fetchReservations();
}

async function fetchReservations() {
    const response = await fetch('http://localhost:4000/api/listeReservations', {
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
    console.log(reservations)


    for (let reservation of reservations) {
        console.log(reservation.status)
        const petSitterResponse = await fetch(`http://localhost:4000/api/petSitter/${reservation.petSitter}`);
        const petResponse = await fetch(`http://localhost:4000/api/pet/${reservation.petId}`);
        if (!petSitterResponse.ok || !petResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const petSitter = await petSitterResponse.json();
        const pet = await petResponse.json();
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = petSitter.price * diffDays;

        const reservationDiv = document.createElement('div');
        reservationDiv.className = 'reservation-card';

        const petSitterName = document.createElement('h2');
        petSitterName.textContent = petSitter.firstName;
        reservationDiv.appendChild(petSitterName);


        let statusHTML = '';

        let statusSymbol = '';
        switch (reservation.status.toLowerCase()) {
            case 'disponible':
                statusSymbol = '&#9989;';
                break;
            case 'en attente':
                statusSymbol = '&#8987;';
                break;
            default:
                statusSymbol = '';
        }

        statusHTML = `<p id="status-${reservation._id}">Status: ${reservation.status} ${statusSymbol}</p>`;

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details';
        detailsDiv.innerHTML = `
<h3> Garde pour ${pet.name}</h3>
<p>Start Date: ${new Date(reservation.startDate).toLocaleDateString()}</p>
<p>End Date: ${new Date(reservation.endDate).toLocaleDateString()}</p>
  <p>${diffDays} jours</p>
  <p>${totalPrice} euros </p>
  ${statusHTML} 
`;
        reservationDiv.appendChild(detailsDiv);

        // Bouton "Annuler" toujours présent
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Annuler la garde';
        cancelButton.id = "cancel";
        cancelButton.style.backgroundColor = "red";

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Reserver cette garde';
        confirmButton.id = "confirm";


        if (reservation.status.toLowerCase() === 'en attente') {
        } else if (reservation.status.toLowerCase() === 'annulé') {
            // Ne rien faire si le statut est "en attente" (les boutons ne seront pas ajoutés)
            reservationDiv.style.backgroundColor = '#DC143C';
            detailsDiv.style.color = 'black';
        } else if (reservation.status.toLowerCase() === 'reservé') {
            reservationDiv.appendChild(cancelButton);
        } else {
            reservationDiv.appendChild(cancelButton);
            reservationDiv.appendChild(confirmButton);
        }


        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contacter';
        contactButton.id = 'contact-button';
        contactButton.dataset = petSitter._id;
        // Stockez l'ID du petSitter dans un attribut de données

        reservationDiv.appendChild(contactButton);

        // Lorsque le bouton de contact est cliqué, redirigez vers la page de messagerie avec l'ID du petSitter dans l'URL
        contactButton.addEventListener('click', () => {
            window.location.href = `http://localhost:4000/messages?recipient=${petSitter._id}&request=${reservation._id}`;
        });

        cancelButton.addEventListener('click', async () => {
            try {
                await cancelReservationStatus(reservation._id);
                // Après avoir mis à jour le statut de la réservation, supprimez la reservationDiv du DOM
                //reservationDiv.remove();
            } catch (error) {
                console.log('Error:', error);
            }
        });


        confirmButton.addEventListener('click', async () => {
            try {
                await confirmReservationStatus(reservation._id);
                // Après avoir mis à jour le statut de la réservation, supprimez la reservationDiv du DOM
            } catch (error) {
                console.log('Error:', error);
            }
        });
        document.body.appendChild(reservationDiv);
    }
    async function cancelReservationStatus(reservationId) {
        const response = await fetch(`http://localhost:4000/api/reservations/${reservationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                status: 'annulé'
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Videz le contenu de la page avant de recharger les réservations
        const statusElement = document.getElementById(`status-${reservationId}`);
        statusElement.textContent = 'Status: annulé';

        // Recharger les réservations après la mise à jour
        fetchReservations();
    }

    async function confirmReservationStatus(reservationId) {
        const response = await fetch(`http://localhost:4000/api/reservations/${reservationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                status: 'reservé'
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Videz le contenu de la page avant de recharger les réservations
        const statusElement = document.getElementById(`status-${reservationId}`);
        statusElement.textContent = 'Status: reservé';

        // Recharger les réservations après la mise à jour
        fetchReservations();
    }
}
