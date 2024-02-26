const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  nb_appartements: {
    type: Number,
    required: true,
  },
  type_vente: {
    type: String,
    required: true,
    enum: ['sur plan', 'prêt à habiter'],
  }
});

module.exports = mongoose.model('Immeuble', schema);
