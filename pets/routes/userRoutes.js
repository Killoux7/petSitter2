const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const requireController = require('../controllers/testController');
const verifyToken = require('../auth');
const multer = require('multer');
const path = require('path');


// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/api/last-pet-sitters', userController.displayLastPetSitter);

router.get('/api/searchSitter', function(req, res) {
  var city = req.query.city;
  var service = req.query.service;
  var pet = req.query.pet;

  userController.searchSitter(city, service, pet)
    .then(function(sitters) {
      res.json(sitters);
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
});

router.get('/api/petSitter/:id', userController.getPetSitterById);
router.get('/api/pet/:id', userController.getAnimalById);
router.get('/api/owner/:id', userController.getOwnerById);




router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/home.html'));
});
router.get('/recherchePetSitter', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/recherchePetSitter.html'));
});

router.get('/petSitter', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/petSitter.html'));
});

router.get('/nav', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/templete/nav.html'));
});


router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/register.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/register.html'));
});


router.post('/register', (req, res)=>{
  userController.addUserAndPet(req.body,res)
});

router.get('/registerSitter', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/registerSitter.html'));
});
router.get('/modifier', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/modifier.html'));
});

router.get('/api/user', verifyToken, userController.getUserById);
router.post('/api/user', verifyToken, userController.updateUser);




router.get('/recap', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/recap.html'));
});

router.get('/logout', userController.logout)


router.get('/api/recap', verifyToken, userController.findAnimal);


router.post('/registerSitter', (req, res) =>{
  let reponse=Object.keys(req.body)
  reponse=reponse[0]
  const jsonReponse= JSON.parse(reponse)
  userController.addPetSitter(jsonReponse,res)

  console.log(res)
}, 
)

// Route pour afficher la page de connexion
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

// Route pour connecter un utilisateur
router.post('/loginUser', userController.login);
router.post('/upload',verifyToken,  upload.single('profileImage'), userController.upload)

router.get('/ajouterPhoto', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/upload.html'));
});

router.get('/modifierProfil', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/choix.html'));
});




module.exports = router;