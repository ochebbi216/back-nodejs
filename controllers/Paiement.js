const Paiement = require('../models/Paiement'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation

exports.create = async (req, res) => {
  try {
    // Validate data using express-validator (customize rules as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req; // Destructure data from request
    const paiementToSave = new Paiement(body);
    const savedPaiement = await paiementToSave.save(); // Use await for async/await

    console.log("The new Paiement is:", savedPaiement);
    res.json({success: true, msg: "Paiement are added now."});
  } catch (error) {
    console.error("Error creating Paiement:", error);
    res.json({success: false,error:error, msg: "Paiement are not added."});
  }
};

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const paiements = await Paiement.find(filtres).lean(); // Use lean for performance

    console.log("All Paiements:", paiements);
    res.json(paiements);
  } catch (error) {
    console.error("Error finding Paiements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const paiement = await Paiement.findById(id).lean(); // Use lean for performance

    if (!paiement) {
      return res.status(404).json({ error: "Paiement not found" });
    }

    console.log(`Paiement ${id} is:`, paiement);
    res.json(paiement);
  } catch (error) {
    console.error("Error finding Paiement:", error);
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

    const updatedPaiement = await Paiement.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedPaiement) {
      return res.status(404).json({ error: "Paiement not found" });
    }

    console.log(`Paiement ${id} is updated:`, updatedPaiement);
    res.json({success:true,msj:"client updated"});
  } catch (error) {
    console.error("Error updating Paiement:", error);
    res.status(500).json({success:false, error:"Internal server error"});
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPaiement = await Paiement.findOneAndDelete({ _id: id });

    if (!deletedPaiement) {
      return res.status(404).json({ error: "Paiement not found" });
    }

    console.log(`Paiement ${id} is deleted`);
    res.json({ message: "Paiement deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Paiement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};