const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  numero: {
    type: String,
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
  date : {
    type: Date,
    default:Date.now,
},
});

module.exports = mongoose.model('Facture', schema);
