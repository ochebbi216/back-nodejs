const Utilisateur = require('../models/Utilisateur'); // Assuming correct path
const { validationResult } = require('express-validator'); // For data validation
exports.create = (req,res)=>
    {
        const {body}=req;
        Utilisateur.create(body)

        .then((data) => {
            console.log("the new user is : ", data);
            res.json({success: true, msg: "user are added now."});
        })
        .catch((error) => {
          res.json({success: false, msg: "user are not added."});
            console.log("user not saved :( ", error);
            res.status(400).send(error);
        });
    };
// exports.create = async (req, res) => {
//   try {
//     // Validate data using express-validator (customize rules as needed)
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { body } = req; // Destructure data from request
//     const utilisateurToSave = new Utilisateur(body);
//     const savedUtilisateur = await utilisateurToSave.save(); // Use await for async/await

//     console.log("The new Utilisateur is:", savedUtilisateur);
//     res.status(201).json(savedUtilisateur); // Use 201 for created resources
//   } catch (error) {
//     console.error("Error creating Utilisateur:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.findAll = async (req, res) => {
  try {
    const filtres = req.query; // Use query object for filters
    const utilisateurs = await Utilisateur.find(filtres).lean(); // Use lean for performance

    console.log("All Utilisateurs:", utilisateurs);
    res.json(utilisateurs);
  } catch (error) {
    console.error("Error finding Utilisateurs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserNameById = async (req, res) => {
  try {
    const { id } = req.params;

    const utilisateur = await Utilisateur.findById(id).lean(); // Use lean for performance

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur not found" });
    }

    const { nom } = utilisateur; // Get the 'nom' field from utilisateur

    console.log(`Nom of Utilisateur ${id} is:`, nom);
    res.json({ nom });
  } catch (error) {
    console.error("Error getting nom of Utilisateur:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findById(id).lean(); // Use lean for performance

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur not found" });
    }

    console.log(`Utilisateur ${id} is:`, utilisateur);
    res.json(utilisateur);
  } catch (error) {
    console.error("Error finding Utilisateur:", error);
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

    const updatedUtilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, body, {
      new: true, // Return updated document
    }).lean(); // Use lean for performance

    if (!updatedUtilisateur) {
      return res.status(404).json({ error: "Utilisateur not found" });
    }

    console.log(`Utilisateur ${id} is updated:`, updatedUtilisateur);
    res.json({ success:true,msj: "client updated" });
  } catch (error) {
    console.error("Error updating Utilisateur:", error);
    res.status(500).json({ success:false ,error: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUtilisateur = await Utilisateur.findOneAndDelete({ _id: id });

    if (!deletedUtilisateur) {
      return res.status(404).json({ error: "Utilisateur not found" });
    }

    console.log(`Utilisateur ${id} is deleted`);
    res.json({ message: "Utilisateur deleted" }); // Include a clear message
  } catch (error) {
    console.error("Error deleting Utilisateur:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
