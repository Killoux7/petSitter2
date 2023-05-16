const URLServeur = "http://localhost:4000/";
let idAnimal;
window.onload = async function() {
    try {
      
      const url = new URL(URLServeur + 'api/recap');
  
      const response = await fetch(url, {
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
      
      console.log(data)
      const pets = data.pets; // Tableau des animaux de compagnie
  
      pets.forEach((pet) => {
        localStorage.setItem('petId', pet._id);
        idAnimal= pet.id
        const nomChien = pet.name; // Nom du chien
        const raceChien = pet.race; // Race du chien
        const ageChien = pet.age; // Âge du chien
         
  
        const ficheChien = document.createElement('div');
        ficheChien.classList.add('fiche-chien'); // Ajouter une classe CSS pour le style
      
        // Créer un élément h2 pour le nom du chien
        const chiennom = document.createElement('p');
        chiennom.id='nomChien'
        chiennom.textContent ="Nom de l'animal: " + nomChien
      
        // Créer un élément p pour la race du chien
        const pRace = document.createElement('p');
        pRace.id = "pRace";
        pRace.textContent = "Race:" +raceChien;
      
        // Créer un élément p pour l'âge du chien
        const pAge = document.createElement('p');
        pAge.id = "pAge";
        pAge.textContent = "age: "  + ageChien;
      
        // Ajouter les éléments au conteneur de la fiche du chien
        ficheChien.appendChild(chiennom);
        ficheChien.appendChild(pRace);
        ficheChien.appendChild(pAge);
      
        // Ajouter la fiche du chien à un conteneur HTML existant
        const conteneurChiens = document.getElementById('conteneurAnimal');
        conteneurChiens.appendChild(ficheChien);
      });
  
      // Fetch petSitter details
      const petSitterId = localStorage.getItem('selectedPetSitterId');
      console.log(petSitterId)
      const petSitterUrl = new URL(URLServeur + 'api/petSitter/' + petSitterId);
  
      const petSitterResponse = await fetch(petSitterUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
      });
  
      if (!petSitterResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const petSitter = await petSitterResponse.json();
      console.log(petSitter)

      const fichePs = document.createElement('div');
      fichePs.classList.add('ps'); // Ajouter une classe CSS pour le style
      
        // Créer un élément h2 pour le nom du chien
        const nomPs = document.createElement('p');
        nomPs.id='nomPs'
        nomPs.textContent ="Animal gardé par: " +  petSitter.firstName;
        const prix = document.createElement('p');
        prix.id='prix'
        prix.textContent ="Prix: " +  petSitter.price + "€ par jour"
      
        
      
        // Ajouter les éléments au conteneur de la fiche du chien
        fichePs.appendChild(nomPs);
        fichePs.appendChild(prix);
        const conteneurPetSitters = document.getElementById('conteneurPetSitters');
        conteneurPetSitters.appendChild(fichePs);

      // Other details...
  
    } catch (error) {
      console.log('Error:', error);
    }
  
    const searchCriteria = JSON.parse(localStorage.getItem('searchCriteria'));
    const dateDebut = new Date(searchCriteria.dateDebut);
    const dateFin = new Date(searchCriteria.dateFin);

    // Calculer le nombre de jours entre les deux dates
    const difference = dateFin - dateDebut;
    const nombreJours = difference / (1000 * 60 * 60 * 24);

    // Déterminer le type de service
    let service;
    if (searchCriteria.service === 'home_stay') {
    service = '🏠 Garde à la maison';
    } else if (searchCriteria.service === 'dog_walks') {
    service = '🚶 Promenades';
    }

    // Déterminer l'animal
    let pet;
    if (searchCriteria.pet === 'dogs') {
    pet = ' 🐶 Chien';
    } else if (searchCriteria.pet === 'cats') {
    pet = ' 🐱 Chat';
    }else{
      pet="🐹 Rongeur"
    }
    // Créer un conteneur pour les critères de recherche
    const searchCriteriaContainer = document.createElement('div');
    searchCriteriaContainer.classList.add('search-criteria');

    const formattedDateDebut = dateDebut.toLocaleDateString('fr-FR');
    const formattedDateFin = dateFin.toLocaleDateString('fr-FR');
    const dateGarde = document.createElement('p');
    dateGarde.textContent = "📅 " + formattedDateDebut + '➡️' + formattedDateFin;
    searchCriteriaContainer.appendChild(dateGarde);

    // Ajouter les éléments au conteneur
    const pDays = document.createElement('p');
    pDays.textContent = `Nombre de jours : ${nombreJours}`;
    searchCriteriaContainer.appendChild(pDays);

    const pService = document.createElement('p');
    pService.textContent = `Type de service : ${service}`;
    searchCriteriaContainer.appendChild(pService);

    const pPet = document.createElement('p');
    pPet.textContent = `Animal : ${pet}`;
    searchCriteriaContainer.appendChild(pPet);

    // Ajouter le conteneur à un conteneur HTML existant
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.appendChild(searchCriteriaContainer);

  };
  document.getElementById('confirm-reservation').addEventListener('click', function() {
    
    const reservationUrl = new URL(URLServeur + 'api/reservations');
    
    const petSitterId = localStorage.getItem('selectedPetSitterId');
    const petId = localStorage.getItem('petId');
    const { service, dateDebut, dateFin } = JSON.parse(localStorage.getItem('searchCriteria'));
  
    const reservationData = {
      petSitterId,
      petId,
      startDate: dateDebut,
      endDate: dateFin,
      serviceType: service
    };
    console.log(reservationData)
  
    fetch(reservationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify(reservationData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Réservation créée avec succès:', data);
      // Rediriger vers une autre page ou mettre à jour l'interface utilisateur comme vous le souhaitez
      window.location.href = URLServeur+ 'tesDemandes'
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  });