const UserOwner = require('../models/ownerModel');
const Pets = require('../models/petModel');
const Pet = require('../models/petModel');
const UserSitter = require ('../models/sitterModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function addUserAndPet(req, res) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.user.password_owner, saltRounds);
    const userData = {
        firstName: req.user.firstName_owner,
        lastName: req.user.lastName_owner,
        email: req.user.email_owner,
        password:hashedPassword,
        //password: req.user.password_owner,
        phone: req.user.phone_owner,
        city: req.user.city_owner
      };

      const petData = {
        type: req.pet.type_animal,
        race: req.pet.race,
        name: req.pet.nom_animal,
        age: req.pet.age_pet,
        sexe: req.pet.sexe,
        sterilisation: req.pet.sterilisation,
        ententeChats: req.pet.ententeChats,
        ententeChiens: req.pet.ententeChiens,
      };

  try {
    const newUser = new UserOwner(userData);
    const newPet = new Pet(petData);
    
    await newPet.save();
    let idAnimal=await Pet.findOne({
      "type":petData.type,
      "race":petData.race,
      "name":petData.name,
      "age":petData.age,
      "sexe":petData.sexe,
      "sterilisation":petData.sterilisation,
      "ententeChats":petData.ententeChats,
      "ententeChiens":petData.ententeChiens
    })

    idAnimal=idAnimal._id
    newUser.pets.push(idAnimal);
    await newUser.save();
    res.status(200)
    res.send("Propriétaire et animal ajouté")
  } catch (err) {
    res.status(500)
    res.send("Impossible d'ajouter le propriétaire et animal")
  }
}

async function login(req, res) {
  try {
    const { name, password } = req.body;

    const user = await UserOwner.findOne({ firstName: name }) || await UserSitter.findOne({ firstName: name });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const userType = user instanceof UserOwner ? 'UserOwner' : 'UserSitter';
    
    const token = jwt.sign({ _id: user._id, userType }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).status(200).json({ message: 'Login successful', user, userType, token });
    console.log(userType)
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err });
  }
}

async function addPetSitter(req, res) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.password_sitter, saltRounds);
  console.log(req)
  const sitterData = {
      firstName: req.firstName_sitter,
      lastName: req.lastName_sitter,
      email: req.email_sitter,
      password: hashedPassword,
      age: req.age_sitter,
      phone: req.phone_sitter,
      price: req.price_sitter,
      city: req.city_sitter,
      description: req.description_sitter,
      petsAcceptes:req.petsAcceptes,
      services: req.services,
  };

  console.log('Sitter data:', sitterData);

  try {
      const newSitter = new UserSitter(sitterData);
      console.log(newSitter)
      const savedSitter = await newSitter.save();
      await console.log(savedSitter)

      res.status(200).json({ message: 'Pet sitter registered successfully', savedSitter });
  } catch (err) {
      res.status(500).json({ message: 'Error registering pet sitter', error: err });
  }
}

async function getUserById(req, res){
  // L'ID de l'utilisateur est obtenu à partir du middleware d'authentification
  try {
  const user = await UserOwner.findById(req.user._id).select('-password');
  if (!user) throw Error('User does not exist');
  res.json(user);
} catch (err) {
  res.status(400).json({ msg: err.message });
}
}



async function displayLastPetSitter(req,res){
  try {
    const petSitters = await UserSitter.find({})
      .sort({ _id: -1 })
      .limit(4);
    res.json(petSitters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function findAnimal(req,res){
  try {
    const owner = await UserOwner.findById(req.user._id).populate('pets');
    res.json(owner);
    console.log(owner.pets)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAnimalById(req, res){
  console.log(req.params.id)
  try {

    const pet = await Pets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

async function searchSitter(city, service, pet){
  var demande = {
    city: city
  };

  if (service) {
    demande['services.' + service] = true;
  }
  if (pet) {
    demande['petsAcceptes.' + pet] = true;
  }

  try {
    return UserSitter.find(demande);
  } catch (err) {
    console.error(err);
  }
}

async function getPetSitterById(req, res){
  try {
    const petSitter = await UserSitter.findById(req.params.id);
    if (!petSitter) {
      return res.status(404).json({ message: 'Pet sitter not found' });
    }
    res.json(petSitter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}
async function getOwnerById(req, res){
  console.log(req.params.id)
  try {
    const petSitter = await UserOwner.findById(req.params.id);
    if (!petSitter) {
      return res.status(404).json({ message: 'Pet sitter not found' });
    }
    res.json(petSitter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

async function upload(req, res) {
  try {
    if(!req.file) {
      return res.status(400).json({ message: 'No file received' });
    }
    
    // Suppose que UserSitter est un modèle Mongoose
    await UserSitter.updateOne({ _id: req.user._id }, { profileImage: req.file.filename });
    
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

async function updateUser(req, res) {
  
  try {
    // Trouver l'utilisateur basé sur l'id passé dans la requête
    const user = await UserOwner.findById(req.user._id);
    
    if (!user) {
      return res.status(404).send("L'utilisateur n'a pas été trouvé");
    }

    // Mise à jour des informations de l'utilisateur
    user.firstName = req.body.firstName_owner || user.firstName;
    user.lastName = req.body.lastName_owner || user.lastName;
    user.email = req.body.email_owner || user.email;

    if (req.body.password_owner) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(req.body.password_owner, saltRounds);
    }

    user.phone = req.body.phone_owner || user.phone;
    user.city = req.body.city_owner || user.city;

    // Enregistrement de l'utilisateur mis à jour
    await user.save();

    res.status(200).send("Profil utilisateur mis à jour avec succès");
  } catch (err) {
    res.status(500).send("Impossible de mettre à jour le profil utilisateur");
  }
}

async function logout(req,res){
  req.session.destroy((err) => {
    if(err) {
        console.log(err);
    }
    res.redirect('/home');
});
}



module.exports = {
  addUserAndPet,login, addPetSitter, getUserById, displayLastPetSitter, searchSitter, getPetSitterById,getOwnerById, findAnimal, getAnimalById,
upload, updateUser, logout};



