const express = require('express');
<<<<<<< HEAD
const Authn = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Authn.register);
router.post('/login', Authn.login);
router.get('/verify/:token',Authn.verify);
=======
const { register, login} = require('../controllers/AuthController');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423

module.exports = router;
