const Facture = require('../models/Facture'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation

exports.create = async (req, res) => {
  try {
    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req; // Destructure data from request
    const factureToSave = new Facture(body);
    const savedFacture = await factureToSave.save(); // Use await for async/await

    console.log("The new Facture is:", savedFacture);
    res.json({success: true, msg: "Facture are added now.",facture:savedFacture });
  } catch (error) {
    console.error("Error creating Facture:", error);
    res.json({success: false, error:error });
  }
};

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const factures = await Facture.find(filtres).lean(); // Use lean for performance

    console.log("All Factures:", factures);
    res.json(factures);
  } catch (error) {
    console.error("Error finding Factures:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await Facture.findById(id).lean(); // Use lean for performance

    if (!facture) {
      return res.status(404).json({ error: "Facture not found" });
    }

    console.log(`Facture ${id} is:`, facture);
    res.json(facture);
  } catch (error) {
    console.error("Error finding Facture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedFacture = await Facture.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedFacture) {
      return res.status(404).json({ error: "Facture not found" });
    }

    console.log(`Facture ${id} is updated:`, updatedFacture);
    res.json(updatedFacture);
  } catch (error) {
    console.error("Error updating Facture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFacture = await Facture.findOneAndDelete({ _id: id });

    if (!deletedFacture) {
      return res.status(404).json({ error: "Facture not found" });
    }

    console.log(`Facture ${id} is deleted`);
    res.json({ message: "Facture deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Facture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
