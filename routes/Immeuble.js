const router = require('express').Router();

const ImmeubleController = require('../controllers/Immeuble');

router.post('/add', ImmeubleController.create);
router.get('/all', ImmeubleController.findAll);
router.get('/getbyid/:id', ImmeubleController.findById);
router.put('/update/:id', ImmeubleController.update);
router.delete('/delete/:id', ImmeubleController.delete);




module.exports = router;