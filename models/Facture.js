const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  periode: {
    type: String,
    required: true,
  },
  paiement_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paiement',
    required: true,
  },
});

module.exports = mongoose.model('Facture', schema);
