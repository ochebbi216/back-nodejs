const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  numero: {
    type: String,

    unique: true // Ensure uniqueness of numero field
  },
  montant: {
    type: Number,
    required: true,
  },
 
  mode_paiement: {
    type: String,
    required: true,
    enum: ['cheque', 'virement','espece'],
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
  date: {
    type: Date,
    default:Date.now
  },
});
schema.pre('save', async function(next) {
  try {
    if (!this.isNew) { // If it's not a new document, skip
      return next();
    }

    // Find the highest existing numero
    const highestFacture = await this.constructor.findOne({}, { numero: 1 }).sort({ numero: -1 });

    let nextNumero = 'FC00000'; // Initial value
    if (highestFacture && highestFacture.numero) {
      const lastNumero = parseInt(highestFacture.numero.substring(2)); // Extract the numeric part
      nextNumero = 'FC' + ('00000' + (lastNumero + 1)).slice(-3); // Increment and pad with leading zeroes
    }

    this.numero = nextNumero; // Set the numero field
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Paiement', schema);