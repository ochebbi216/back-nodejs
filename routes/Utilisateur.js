const router = require('express').Router();

const UtilisateurController = require('../controllers/Utilisateur');

router.post('/add', UtilisateurController.create);
router.get('/all', UtilisateurController.findAll);
router.get('/getbyid/:id', UtilisateurController.findById);
router.put('/update/:id', UtilisateurController.update);
router.delete('/delete/:id', UtilisateurController.delete);
router.get('/utilisateur/:id', UtilisateurController.getUserNameById);




module.exports = router;