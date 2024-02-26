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
  type: {
    type: String,
    required: true,
    enum: ['acheteur', 'locataire'],
  },
});

module.exports = mongoose.model('Utilisateur', schema);
