const express = require('express');
const Authn = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Authn.register);
router.post('/login', Authn.login);
router.get('/verify/:token',Authn.verify);

module.exports = router;
