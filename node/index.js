const { exec } = require('child_process');

// Exécute la commande pour lancer app.js dans le dossier "pets"
const child = exec('node pets/app.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l'exécution de app.js : ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

// Gestion des erreurs de lancement
child.on('error', (error) => {
  console.error(`Erreur lors de la tentative de lancement de app.js : ${error}`);
});
