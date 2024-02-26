const Immeuble = require('../models/Immeuble'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation

exports.create = async (req, res) => {
  try {
    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req; // Destructure data from request
    const immeubleToSave = new Immeuble(body);
    const savedImmeuble = await immeubleToSave.save(); // Use await for async/await

    console.log("The new Immeuble is:", savedImmeuble);
    res.json({success: true, msg: "Immeuble are added now.",Immeuble:savedImmeuble });

  } catch (error) {
    console.error("Error creating Immeuble:", error);
    res.json({success: false, error:error });
  }
};

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const immeubles = await Immeuble.find(filtres).lean(); // Use lean for performance

    console.log("All Immeubles:", immeubles);
    res.json(immeubles);
  } catch (error) {
    console.error("Error finding Immeubles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const immeuble = await Immeuble.findById(id).lean(); // Use lean for performance

    if (!immeuble) {
      return res.status(404).json({ error: "Immeuble not found" });
    }

    console.log(`Immeuble ${id} is:`, immeuble);
    res.json(immeuble);
  } catch (error) {
    console.error("Error finding Immeuble:", error);
    res.json({success: false, error:error });
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

    const updatedImmeuble = await Immeuble.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedImmeuble) {
      return res.status(404).json({ error: "Immeuble not found" });
    }

    console.log(`Immeuble ${id} is updated:`, updatedImmeuble);
    res.json({success: true, msg:updatedImmeuble });
  } catch (error) {
    console.error("Error updating Immeuble:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImmeuble = await Immeuble.findOneAndDelete({ _id: id });

    if (!deletedImmeuble) {
      return res.status(404).json({ error: "Immeuble not found" });
    }

    console.log(`Immeuble ${id} is deleted`);
    res.json({ message: "Immeuble deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Immeuble:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
