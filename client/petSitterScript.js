let service, localisation, dateDebut,dateFin, animal;
window.onload = function() {
  const URLServeur = "http://localhost:4000/";
  const queryString = window.location.search.substring(1); // Supprimez le '?' au début
  const parameters = queryString.split('&'); // Divisez la chaîne en utilisant '&' comme séparateur



  for (let i = 0; i < parameters.length; i++) {
    const parameter = parameters[i];
    const [key, value] = parameter.split('='); // Divisez chaque paramètre en utilisant '=' comme séparateur

    switch (key) {
      case 'service':
        service = value;
        break;
      case 'localisation':
        localisation = value;
        break;
      case 'dateDe':
        dateDebut = value;
        break;
      case 'dateAu':
        dateFin = value;
        break;
      case 'animal':
        animal = value;
        break;
    }
  }

  // Prepare the URL
  const url = new URL(URLServeur + 'api/searchSitter');
  url.search = new URLSearchParams({ city: localisation, service, pet: animal });

  // Make the request
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(petSitters => {
    const petSittersContainer = document.querySelector('.card-container');
    petSitters.forEach((petSitter) => {
      const petSitterCard = document.createElement('div');
      petSitterCard.classList.add('card');

      const petSitterName = document.createElement('p');
      petSitterName.id = 'prenom_petsitter';
      petSitterName.textContent = petSitter.firstName; // prénom du pet sitter

      const petSitterAge = document.createElement('p');
      petSitterAge.id = 'age';
      // Calculer l'âge basé sur la date de naissance
      const age = new Date().getFullYear() - new Date(petSitter.age).getFullYear();
      petSitterAge.textContent = `${age} ans`;

      const petSitterCity = document.createElement('p');
      petSitterCity.id = 'ville';
      petSitterCity.textContent = petSitter.city; // ville du pet sitter

      const buttonMore = document.createElement('button');
      buttonMore.id = 'more';
      buttonMore.textContent = "Voir plus"; // ville du pet sitter
      buttonMore.setAttribute('data-id', petSitter._id);

      petSitterCard.appendChild(petSitterName);
      petSitterCard.appendChild(petSitterAge);
      petSitterCard.appendChild(petSitterCity);
      petSitterCard.appendChild(buttonMore);
      buttonMore.addEventListener('click', detailPetSitter);


      petSittersContainer.appendChild(petSitterCard);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};


function detailPetSitter(){
   
  const petSitterId = event.target.getAttribute('data-id');
  const urlParams = new URLSearchParams({
    id: petSitterId,
    service,
    dateDebut,
    dateFin,
    animal
  });
  
  // Redirigez vers la page de détail du Pet Sitter
  window.location.href = `petSitter.html?${urlParams.toString()}`;
}