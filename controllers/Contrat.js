const Contrat = require('../models/Contrat'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation

exports.create = async (req, res) => {
  try {
    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req; // Destructure data from request
    const contratToSave = new Contrat(body);
    const savedContrat = await contratToSave.save(); // Use await for async/await

    console.log("The new Contrat is:", savedContrat);
    res.status(201).json(savedContrat); // Use 201 for created resources
  } catch (error) {
    console.error("Error creating Contrat:", error);
    res.status(500).json({ error: "Internal server error" });
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

    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedContrat = await Contrat.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedContrat) {
      return res.status(404).json({ error: "Contrat not found" });
    }

    console.log(`Contrat ${id} is updated:`, updatedContrat);
    res.json(updatedContrat);
  } catch (error) {
    console.error("Error updating Contrat:", error);
    res.status(500).json({ error: "Internal server error" });
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
