// JavaScript pour le carrousel de commentaires
const carousel = document.querySelector('.carousel');
const comments = carousel.querySelectorAll('.comment');
const commentWidth = 335; // Largeur de chaque commentaire en pixels
let currentIndex = 0;

// Cloner les cartes et les placer à la fin
const totalComments = comments.length;
for (let i = 0; i < totalComments; i++) {
  const clone = comments[i].cloneNode(true);
  carousel.appendChild(clone);
}

function slideTo(index) {
  carousel.style.transition = 'transform 0.3s ease-in-out';
  carousel.style.transform = `translateX(-${index * commentWidth}px)`;
  currentIndex = index;
}

function showNextComment() {
  const nextIndex = currentIndex + 1;
  slideTo(nextIndex);

  // Vérifier si on atteint la dernière carte clonée
  if (nextIndex === totalComments) {
    // Réinitialiser la position du carrousel à la première carte
    setTimeout(() => {
      carousel.style.transition = 'none';
      slideTo(0);
    }, 300);
  }
}

function handleTransitionEnd() {
  if (currentIndex === totalComments) {
    carousel.style.transition = 'none';
    slideTo(0);
  }
}

carousel.addEventListener('transitionend', handleTransitionEnd);

// Défilement automatique toutes les 5 secondes
setInterval(showNextComment, 5000);
