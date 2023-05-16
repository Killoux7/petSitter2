
window.onload = function () {
    let params = new URLSearchParams(window.location.search);

    let recipientId = params.get('recipient');
    let requestId = params.get('request');

    console.log(recipientId); // affiche '645d5f83cd73e585d7468800' (ou quel que soit le recipientId)
    console.log(requestId); // 



    // Récupération du formulaire et du textarea
    let form = document.getElementById('message-form');
    let textarea = document.getElementById('message');
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // Récupération du token à partir du localStorage
    let token = localStorage.getItem('auth-token');

    // Décodage du token pour obtenir les informations de l'utilisateur
    let decoded = parseJwt(token);
    console.log(decoded)


    // Ajout d'un écouteur d'événement au formulaire pour intercepter la soumission
    form.addEventListener('submit', function (event) {
        // Empêcher la soumission par défaut du formulaire
        event.preventDefault();

        // Récupération du message
        let messageText = textarea.value;

        // Envoi du message à l'API
        fetch('http://localhost:4000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                reservationId: requestId,
                senderId: decoded._id,// Vous devrez remplacer cela par l'ID réel de l'utilisateur connecté
                recipient: recipientId,
                text: messageText
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du message');
            }
            return response.json();
        }).then(data => {
            console.log('Message envoyé avec succès', data);
            textarea.value = ''; // Effacer le textarea après l'envoi réussi du message
        }).catch(error => {
            console.error('Erreur:', error);
        });
    });
    console.log(recipientId)
    console.log(decoded._id)

    function addMessage() {
        fetch('http://localhost:4000/api/messages?user1=' + decoded._id + '&user2=' + recipientId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des messages');
            }
            return response.json();
        }).then(data => {
            console.log('Messages récupérés avec succès', data);
            let container = document.getElementById('message-container');

            // Effacez les anciens messages
            container.innerHTML = '';

            // Ajoutez chaque message au conteneur
            for (let message of data) {
                // Créez un nouvel élément pour le message
                let messageElement = document.createElement('div');
                messageElement.classList.add('message-bubble');

                // Ajoutez le nom de l'expéditeur au-dessus de la bulle du message
                let senderNameElement = document.createElement('div');
                senderNameElement.textContent = message.senderName; // Vous devez remplacer cela par le véritable nom de l'expéditeur
                senderNameElement.classList.add('sender-name');
                messageElement.appendChild(senderNameElement);

                // Ajoutez le texte du message à la bulle du message
                let textElement = document.createElement('div');
                textElement.textContent = message.text;
                messageElement.appendChild(textElement);

                // Ajoutez une horodatage en dessous de la bulle du message
                let timestampElement = document.createElement('div');
                timestampElement.textContent = new Date(message.date).toLocaleString(); // Vous devez remplacer cela par le véritable horodatage du message
                timestampElement.classList.add('timestamp');
                messageElement.appendChild(timestampElement);

                // Ajoutez une classe différente en fonction de l'utilisateur qui a envoyé le message
                if (message.senderId == decoded._id) {
                    messageElement.classList.add('my-message');
                } else {
                    messageElement.classList.add('their-message');
                }

                // Ajoutez l'élément au conteneur
                container.appendChild(messageElement);
            }

        }).catch(error => {
            console.error('Erreur:', error);
        });
    }


    addMessage();

    // Actualisation automatique toutes les 5 secondes
    setInterval(addMessage, 5000);

    // ...
}