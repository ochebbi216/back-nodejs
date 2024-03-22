const Contrat = require('../models/Contrat'); // Chemin d'accès correct
const Appartement = require('../models/Appartement'); // Ajout de cette ligne pour utiliser le modèle Appartement
const { validationResult } = require('express-validator');

async function updateStatutAppartement(appartementId, typeContrat) {
  try {
    let statut;
    switch (typeContrat) {
      case 'vente':
        statut = 'vendu';
        break;
      case 'location':
        statut = 'loué';
        break;
      case 'surplan':
        statut = 'réservé';
        break;
      default:
        statut = 'disponible';
    }

    await Appartement.findByIdAndUpdate(appartementId, { statut: statut });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de l'appartement:", error);
    throw error;
  }
}


exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contratToSave = new Contrat(req.body);
    const savedContrat = await contratToSave.save();
    await updateStatutAppartement(savedContrat.appartement_id, savedContrat.type); // Correction ici
    console.log("The new Contrat is:", savedContrat);
    res.json({ success: true, msg: "Contrat added successfully." }); // Correction ici
  } catch (error) {
    console.error("Error creating Contrat:", error);
    res.status(500).json({ success: false, msg: "Contrat was not added." }); // Correction ici
  }
};

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const contrats = await Contrat.find(filtres).lean(); // Use lean for performance

    console.log("All Contrats:", contrats);
    res.json(contrats);
  } catch (error) {
    console.error("Error finding Contrats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const contrat = await Contrat.findById(id).lean(); // Use lean for performance

    if (!contrat) {
      return res.status(404).json({ error: "Contrat not found" });
    }

    console.log(`Contrat ${id} is:`, contrat);
    res.json(contrat);
  } catch (error) {
    console.error("Error finding Contrat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedContrat = await Contrat.findOneAndUpdate({ _id: id }, body, { new: true }).lean();

    if (!updatedContrat) {
      return res.status(404).json({ error: "Contrat not found" });
    }
    
    // Mise à jour du statut de l'appartement si nécessaire, en fonction de la logique métier
    await updateStatutAppartement(updatedContrat.appartement_id, updatedContrat.type);

    console.log(`Contrat ${id} is updated:`, updatedContrat);
    res.json({ success: true, msg: "Contrat updated successfully." }); // Correction ici
  } catch (error) {
    console.error("Error updating Contrat:", error);
    res.status(500).json({ success: false, error: "Internal server error" }); // Uniformisation ici
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContrat = await Contrat.findOneAndDelete({ _id: id });

    if (!deletedContrat) {
      return res.status(404).json({ error: "Contrat not found" });
    }

    console.log(`Contrat ${id} is deleted`);
    res.json({ message: "Contrat deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Contrat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
