const mongoose = require('mongoose');

const userOwnerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  city:{type: String},
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }]
});

const UserOwner = mongoose.model('UserOwner', userOwnerSchema, 'userOwner');

module.exports = UserOwner;