const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
    unique:true
  },
});

module.exports = mongoose.model('Utilisateur', schema);
