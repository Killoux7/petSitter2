const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  type: { type: String, required: true },
  race: { type: String, required: true },
  name: { type: String, required: true},
  age: { type: String, required: true },
  sexe: { type: String, required: true  },
  sterilisation: { type: String, required: true  },
  ententeChats: { type: String, required: true  },
  ententeChiens: { type: String, required: true  },
});

const Pets = mongoose.model('Pet', petSchema, 'pets');

module.exports = Pets;