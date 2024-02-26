const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  etage: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  surface: {
    type: Number,
    required: true,
  },
  equipements: {
    type: [String],
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    required: true,
    enum: ['disponible', 'vendu', 'réservé'],
  },
  immeuble_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Immeuble',
    required: false,
  },
});

module.exports = mongoose.model('Appartement', schema);
