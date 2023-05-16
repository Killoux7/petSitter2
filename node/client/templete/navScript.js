const URLServeur = "http://localhost:4000/"
function includeHTML() {
  const navbarContainer = document.getElementById('navbarContainer');
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      navbarContainer.innerHTML = this.responseText;
      updateNav();  // Appelez la fonction updateNav ici
    }
  };
  xhttp.open('GET', URLServeur + 'nav', true);
  xhttp.send();
}



function updateNav() {
  const nav = document.querySelector('nav ul');
  nav.innerHTML = '';  // Réinitialiser la navigation

  let userType = localStorage.getItem('user-type'); // Assumant que le type d'utilisateur est stocké dans le local storage



  if (localStorage.getItem('auth-token')) {
    console.log(userType);
    // Utilisateur est connecté
    if (userType === 'UserOwner') {
      const navItems = ['Mes réservations', 'Mon profil', 'Profil animal', 'Deconnexion'];
      navItems.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#'; // Mettez ici les liens appropriés pour chaque option
        link.textContent = item;
        li.appendChild(link);
        nav.appendChild(li);
        switch (item) {
          case 'Mes réservations':
            link.href = URLServeur + 'tesDemandes'; // Remplacez par la route de votre liste de réservations
            break;
          // Ajoutez ici d'autres cases pour les autres éléments de navigation si nécessaire
          default:
            link.href = URLServeur + 'home'
            link.addEventListener('click', function() {
              localStorage.removeItem('auth-token')
            }); // Remplacez par la route de déconnexion appropriée
            break;
        }
      });
    } else if (userType === 'UserSitter') {
      console.log(userType);
      navItems = ['Mes demandes', 'Mon profil', 'Deconnexion'];
      navItems.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#'; // Mettez ici les liens appropriés pour chaque option
        link.textContent = item;
        li.appendChild(link);
        nav.appendChild(li);
        switch (item) {
          case 'Mes demandes':
            link.href = URLServeur + 'reservationsList'; // Remplacez par la route de votre liste de réservations
            break;
          case 'Mon profil':
            link.href = URLServeur + 'modifierProfil'; // Remplacez par la route de votre liste de réservations
            break;
          case 'Deconnexion':
            link.href = URLServeur + 'home'
            link.addEventListener('click', function() {
              localStorage.removeItem('auth-token')
            }); // Remplacez par la route de déconnexion appropriée
            break;
          // Ajoutez ici d'autres cases pour les autres éléments de navigation si nécessaire
          default:
            link.href = '#';
            break;
        }
      });
    }

  } else {
    console.log(userType);
    // Utilisateur est déconnecté
    navItems = ['Devenir PetSitter', 'Recherche dun Pet Sitter', 'Connexion'];
    navItems.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#'; // Mettez ici les liens appropriés pour chaque option
      link.textContent = item;
      li.appendChild(link);
      nav.appendChild(li);
      switch (item) {
        case 'Connexion':
          link.href = URLServeur + 'login'; // Remplacez par la route de votre liste de réservations
          break;
        case 'Devenir PetSitter':
          link.href = URLServeur + 'registerSitter'; // Remplacez par la route de votre liste de réservations
          break;
        case 'Recherche dun Pet Sitter':
          link.href = URLServeur + 'register'; // Remplacez par la route de votre liste de réservations
          break;
        // Ajoutez ici d'autres cases pour les autres éléments de navigation si nécessaire
        default:
          link.href = '#';
          break;
      }
    });
  }
}
// Appeler la fonction lors du chargement de la page
includeHTML();