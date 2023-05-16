function showAnimalInfo(event) {
  event.preventDefault();
  const humanForm = document.getElementById('human-form');
  const animalInfoContainer = document.getElementById('animal-info-container');

  // Get all inputs in the humanForm div
  const inputs = humanForm.querySelectorAll('input');
  const userData = {};

  // Iterate over each input and collect the data
  inputs.forEach(input => {
    // Ensure the input has a name attribute
    if (input.name) {
      userData[input.name] = input.value;
    }
  });

  // Save data to the animal form
  const animalForm = document.getElementById('animal-form');
  for (const [key, value] of Object.entries(userData)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    animalForm.appendChild(input);
  }

  humanForm.style.display = 'none';
  animalInfoContainer.style.display = 'block';
}

 // Liste d'animaux et leurs races
        const animals = [
          {
            name: 'Chien',
            races: ['Labrador', 'Berger Allemand', 'Golden Retriever', 'Bulldog', 'Beagle']
          },
          {
            name: 'Chat',
            races: ['Siamois', 'Persan', 'Maine Coon', 'Sphynx', 'Bengal']
          }
        ];
    
        const animalSelect = document.getElementById('animal-select');
        const raceSelect = document.getElementById('race-select');
    
        // Remplir le selecteur d'animaux
        function fillAnimalSelect() {
          animals.forEach((animal, index) => {
            const option = document.createElement('option');
            option.value = animal.name; // Ici, on utilise le nom de l'animal comme valeur
            option.textContent = animal.name;
            animalSelect.appendChild(option);
          });
        }
    
        // Mettre à jour les races en fonction de l'animal sélectionné
        function updateRaces() {
          const selectedAnimalName = animalSelect.value;
          const selectedAnimal = animals.find(animal => animal.name === selectedAnimalName);
        
          // Vider le selecteur de races
          raceSelect.innerHTML = '';
        
          // Remplir le selecteur de races avec les nouvelles options
          selectedAnimal.races.forEach(race => {
            const option = document.createElement('option');
            option.value = race;
            option.textContent = race;
            raceSelect.appendChild(option);
          });
        }
    
        // Remplir le selecteur d'animaux et mettre à jour les races lors du chargement de la page
        document.addEventListener('DOMContentLoaded', () => {
          fillAnimalSelect();
          updateRaces();
        });



















        const boutonEnregistrerOwner= document.getElementById("boutonEnregistrerOwner")
        boutonEnregistrerOwner.addEventListener("click", enregistrementUserAndPet)


        const URLServeur= "http://localhost:4000/"
        

        function communicationAvecLeBackPOST(data, URL) {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              console.log("element ajouté")
            } else if (this.readyState === XMLHttpRequest.DONE) {
              console.log("erreur de connexion de type " + this.readyState);
            }
          };
          xhr.open('POST', URL, true);
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
          // Convert the combined data to a JSON string
          const jsonData = JSON.stringify(data);
        
          xhr.send(jsonData);
        }
        
        



function enregistrementUserAndPet(){
  //formulaire pour proprietaire
  const nom= document.getElementById("firstName_owner").value
  const prenom= document.getElementById("lastName_owner").value
  const email= document.getElementById("email_owner").value
  const password= document.getElementById("password_owner").value
  const num= document.getElementById("phone_owner").value
  const ville= document.getElementById("ville").value

  //Les informations sur le pet
  const type= document.getElementById("animal-select").value
  const race= document.getElementById("race-select").value
  const nomAnimal= document.getElementById("name_pet").value

  const age_pet= document.getElementById("age_pet").value
  const male= document.getElementById("male")
  const femele= document.getElementById("female")
  const sterelizeOui= document.getElementById("sterilized-yes")
  const sterelizeNon= document.getElementById("sterilized-no")
  const ententeChatOui= document.getElementById("chats-yes")
  const ententeChatNon= document.getElementById("chats-no")
  const ententeChiensYes= document.getElementById("dogs-yes")
  const ententeChiensNon= document.getElementById("dogs-no")

  console.log(prenom)
  console.log(nom)
  console.log(type)
  console.log(race)



  let sexe="male";
  

  if(male.checked){
      sexe="male"
  }
  if(femele.checked){
      sexe="femele"
  }
 

  let sterilisation="oui"

  if(sterelizeOui.checked){
    sterilisation="oui"
  }
  if(sterelizeNon.checked){
    sterilisation="non"
  }

  let ententeChat="oui";


  if(ententeChatOui.checked){
    ententeChat="oui"
  }
  if(ententeChatNon.checked){
    ententeChat="non"
  }

  let ententeChien="oui"

  if(ententeChiensYes.checked){
    ententeChienententeChienOui="oui"
  }
  if(ententeChiensNon.checked){
    ententeChien="non"
  }



  const objetHumain={
      "firstName_owner":nom,
      "lastName_owner":prenom,
      "email_owner":email,
      "password_owner":password,
      "phone_owner":num,
      "city_owner":ville
  }

  const objetAnimal={
      "type_animal":type,
      "race":race,
      "nom_animal":nomAnimal,
      "age_pet":age_pet,
      "sexe":sexe,
      "sterilisation": sterilisation,
      "ententeChiens":ententeChien,
      "ententeChats":ententeChat 
        }

        const data = {
          user: objetHumain,
          pet: objetAnimal
        };

    
    communicationAvecLeBackPOST(data, URLServeur+"register")
    window.location.href = URLServeur + "login";
  }





