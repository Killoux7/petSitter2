const pNom=document.getElementById("prenom_petsitter")
const ville=document.getElementById("ville")



document.addEventListener('DOMContentLoaded', async () => {
    const petSittersContainer = document.querySelector('.card-container');
  
    try {
      const response = await fetch(URLServeur+'api/last-pet-sitters');
      const petSitters = await response.json();
  
      petSitters.forEach((petSitter) => {
        const petSitterCard = document.createElement('div');
        petSitterCard.classList.add('card');
  
        const petSitterName = document.createElement('p');
        petSitterName.id = 'prenom_petsitter';
        petSitterName.textContent = petSitter.firstName; // prénom du pet sitter

        const petSitterImage = document.createElement('img'); // Nouvel élément img
        petSitterImage.src = petSitter.imageUrl; // URL de l'image du pet sitter
        petSitterImage.alt = `Photo de ${petSitter.firstName}`; // Texte alternatif pour l'image
            petSitterImage.id = '../public/uploads/'+ petSitter.profileImage
  
        const petSitterAge = document.createElement('p');
        petSitterAge.id = 'age';
        // Calculer l'âge basé sur la date de naissance
        const age = new Date().getFullYear() - new Date(petSitter.age).getFullYear();
        petSitterAge.textContent = `${age} ans`;
  
        const petSitterCity = document.createElement('p');
        petSitterCity.id = 'ville';
        petSitterCity.textContent = petSitter.city; // ville du pet sitter
  
        petSitterCard.appendChild(petSitterName);
        petSitterCard.appendChild(petSitterAge);
        petSitterCard.appendChild(petSitterCity);
  
        petSittersContainer.appendChild(petSitterCard);
      });
    } catch (err) {
      console.error('Failed to fetch pet sitters:', err);
    }
  });


  document.getElementById('searchbutton').addEventListener('click', searchingPetSitter);

let selectedService = null
 window.onload = function() {
  document.getElementById('home_stay').addEventListener('click', () => {
    selectedService = 'home_stay';
  });

  document.getElementById('dog_walks').addEventListener('click', () => {
    selectedService = 'dog_walks';
  });
}

async function searchingPetSitter() {
  const city = document.getElementById('location').value;
  const service = selectedService; // Utilisez simplement selectedService ici

  const selectedAnimalElement = document.getElementById('animal');
  let pet;
  if (selectedAnimalElement.value === 'Chien') {
    pet = 'dogs';
  } else if (selectedAnimalElement.value === 'Chat') {
    pet = 'cats';
  } else if (selectedAnimalElement.value === 'Rongeurs') {
    pet = 'hamster';
  }

  const dateDebut= document.getElementById("dateDebut").value;
  const dateFin= document.getElementById("dateFin").value;

  const searchCriteria = {
    service,
    city,
    pet,
    dateDebut,
    dateFin
  };

  // Enregistrer les critères de recherche dans le stockage local
  localStorage.setItem('searchCriteria', JSON.stringify(searchCriteria));

  const query="service="+service+"&localisation="+city+"&dateDe="+dateDebut+"&dateAu="+dateFin+"&animal="+pet;
  console.log(query);
  let urlRedirection="recherchePetSitter.html";
  urlRedirection+="?"+query;
  window.location.href = urlRedirection;

  window.location.search;
  console.log(url);
}

async function toggleButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.classList.toggle("active");
}


  