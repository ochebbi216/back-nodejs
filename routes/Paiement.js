const router = require('express').Router();

const PaiementController = require('../controllers/Paiement');

router.post('/add', PaiementController.create);
router.get('/all', PaiementController.findAll);
router.get('/getbyid/:id', PaiementController.findById);
router.put('/update/:id', PaiementController.update);
router.delete('/delete/:id', PaiementController.delete);




module.exports = router;