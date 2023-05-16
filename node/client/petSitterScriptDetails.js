window.onload = function() {
  const URLServeur = "http://localhost:4000/";
  const queryString = window.location.search.substring(1); // Supprimez le '?' au début
  const parameters = queryString.split('&'); // Divisez la chaîne en utilisant '&' comme séparateur
  console.log(parameters)

  let id;
  for (let i = 0; i < parameters.length; i++) {
    const parameter = parameters[i];
    const [key, value] = parameter.split('='); // Divisez chaque paramètre en utilisant '=' comme séparateur

    switch (key) {
      case 'id':
        id = value;
        localStorage.setItem('selectedPetSitterId', id); // Store the petSitter id in localStorage
        break;
    }
  }

  console.log(id)


  const url = new URL(URLServeur + 'api/petSitter/' + id); // Assuming your API endpoint is something like /api/petSitter/:id

  // Make the request
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(petSitter => {
    console.log(petSitter.profileImage)
    // Update the HTML fields with the pet sitter data
    document.getElementById('prenom').textContent = petSitter.firstName;
    document.getElementById('city').textContent = petSitter.city;
    document.getElementById('age').textContent = new Date().getFullYear() - new Date(petSitter.age).getFullYear() + " ans";
    // You need to have the description field in your petSitter object
    document.getElementById('description').textContent = petSitter.description;
    let serviceHome = petSitter.services.home_stay; // Remplacez ceci par la valeur réelle de l'attribut
let displayValueHome = serviceHome ? "oui" : "non";
document.getElementById("home_stay").textContent = displayValueHome;

let serviceWalk = petSitter.services.home_stay; // Remplacez ceci par la valeur réelle de l'attribut
let displayValueWalk = serviceWalk ? "oui" : "non";
document.getElementById("dog_walks").textContent = displayValueWalk;

let profileImageElement = document.getElementById('profile-image');

// Récupérez le chemin de l'image de profil à partir de la base de données (par exemple, via une requête AJAX)
let profileImage = '../public/uploads/'+ petSitter.profileImage;

// Mettez à jour l'attribut src de l'image avec le chemin de l'image de profil
profileImageElement.src = profileImage;
  })
  .catch((error) => {
    console.log('Error:', error);
  });
  document.getElementById('choose-petsitter').addEventListener('click', function() {
    if (localStorage.getItem('auth-token')) {
      window.location.href=URLServeur+'recap'
      
      
      localStorage.setItem('selectedPetSitterId', id);
    }
  })
  

};


