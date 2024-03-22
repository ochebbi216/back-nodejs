const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['vente', 'location','surplan'],
  },
  date_debut: {
    type: Date,
    required: false,
  },
  date_fin: {
    type: Date,
    required: false,
  },
  montant_total: {
    type: Number,
    required: true,
  },
  avance: {
    type: Number,
    required: false,
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

  date : {
    type: Date,
    default:Date.now,
},
});

module.exports = mongoose.model('Contrat', schema);
