const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mode_paiement: {
    type: String,
    required: true,
  },
  type_paiement: {
    type: String,
    required: true,
    enum: ['location', 'vente','facilité'],
  },
  statut_paiement: {
    type: String,
    required: true,
    enum: ['en cours', 'payé', 'en retard'],
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

module.exports = mongoose.model('Paiement', schema);
