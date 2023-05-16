const mongoose = require('mongoose');
const UserOwner = require('./models/ownerModel');

mongoose.connect('mongodb+srv://lala:lala@cluster0.ajchegt.mongodb.net/pets?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données MongoDB');
    
    // Création d'un nouveau document user_owner
    const userOwner = new UserOwner({
        firstName: 'Dupont',
        lastName: 'Marie',
        email: 'marie.dupont@gmail.com',
        password: 'monmotdepasse',
        phone: '0123456789',
      
    });

    // Enregistrement du document dans la base de données
    userOwner.save()
      .then(() => console.log('Le document user_owner a été enregistré avec succès'))
      .catch((err) => console.error(err));
    
  })
  .catch((err) => {
    console.log('Erreur de connexion à la base de données MongoDB', err);
  });