const router = require('express').Router();

const FactureController = require('../controllers/Facture');

router.post('/add', FactureController.create);
router.get('/all', FactureController.findAll);
router.get('/getbyid/:id', FactureController.findById);
router.put('/update/:id', FactureController.update);
router.delete('/delete/:id', FactureController.delete);




module.exports = router;