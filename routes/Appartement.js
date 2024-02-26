const router = require('express').Router();

const AppartementController = require('../controllers/Appartement');

router.post('/add', AppartementController.create);
router.get('/all', AppartementController.findAll);
router.get('/getbyid/:id', AppartementController.findById);
router.put('/update/:id', AppartementController.update);
router.delete('/delete/:id', AppartementController.delete);




module.exports = router;