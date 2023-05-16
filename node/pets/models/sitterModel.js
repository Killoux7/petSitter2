const mongoose = require('mongoose');

const sitterModel = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: {
    type: String,
    required: false
  },
  password: { type: String, required: true },
  age: { type: Date },
  phone: { type: String, required: true },
  price: { type: String },
  city: { type: String },
  description: { type: String },
  housingType: {type: String},
  petsAcceptes: {
    dogs: { type: Boolean },
    cats: { type: Boolean },
    hamster: { type: Boolean }
  },
  services: {
    home_stay:{ type: Boolean },
    dog_walks:{ type: Boolean },
  },
 
  
  

  

});

const UserSitter = mongoose.model('Sitter', sitterModel, 'userSitter');

module.exports = UserSitter;