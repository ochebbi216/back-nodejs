const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['vente', 'location'],
  },
  date_debut: {
    type: Date,
    required: true,
  },
  date_fin: {
    type: Date,
    required: true,
  },
  montant_total: {
    type: Number,
    required: true,
  },
  avance: {
    type: Number,
    required: true,
  },
  appartement_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appartement',
    required: true,
  },
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true,
  },
});

module.exports = mongoose.model('Contrat', schema);
