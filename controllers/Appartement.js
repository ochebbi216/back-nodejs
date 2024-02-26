const Appartement = require('../models/Appartement'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation

exports.create = async (req, res) => {
  try {
    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req; // Destructure data from request
    const appartementToSave = new Appartement(body);
    const savedAppartement = await appartementToSave.save(); // Use await for async/await

    console.log("The new Appartement is:", savedAppartement);
    res.status(201).json({success:true,msj:savedAppartement}); // Use 201 for created resources
  } catch (error) {
    console.error("Error creating Appartement:", error);
    res.status(500).json({success:false, error: error});
  }
};

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const appartements = await Appartement.find(filtres).lean(); // Use lean for performance

    console.log("All Appartements:", appartements);
    res.json(appartements);
  } catch (error) {
    console.error("Error finding Appartements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const appartement = await Appartement.findById(id).lean(); // Use lean for performance

    if (!appartement) {
      return res.status(404).json({ error: "Appartement not found" });
    }

    console.log(`Appartement ${id} is:`, appartement);
    res.json(appartement);
  } catch (error) {
    console.error("Error finding Appartement:", error);
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

    const updatedAppartement = await Appartement.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedAppartement) {
      return res.status(404).json({ error: "Appartement not found" });
    }

    console.log(`Appartement ${id} is updated:`, updatedAppartement);
    res.status(201).json({success:true,msj:updatedAppartement}); 
  } catch (error) {
    console.error("Error updating Appartement:", error);
    res.status(500).json({success:false, error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppartement = await Appartement.findOneAndDelete({ _id: id });

    if (!deletedAppartement) {
      return res.status(404).json({ error: "Appartement not found" });
    }

    console.log(`Appartement ${id} is deleted`);
    res.json({ message: "Appartement deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Appartement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
