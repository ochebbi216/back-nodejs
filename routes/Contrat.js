const router = require('express').Router();

const ContratController = require('../controllers/Contrat');

router.post('/add', ContratController .create);
router.get('/all', ContratController .findAll);
router.get('/getbyid/:id', ContratController .findById);
router.put('/update/:id', ContratController .update);
router.delete('/delete/:id', ContratController .delete);




module.exports = router;