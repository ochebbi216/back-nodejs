
const router = require('express').Router();

const AdminController = require('../controllers/Admin');
router.post('/register', AdminController.register);
router.post('/login', AdminController.login);
router.get('/getbyid/:id', AdminController.findById);
router.put('/update/:id', AdminController.update);
router.get('/all', AdminController.findAll);




module.exports = router;


