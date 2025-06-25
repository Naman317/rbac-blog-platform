const express = require('express');
const router = express.Router();
const MsgController = require('../controllers/MsgController');
const auth = require('../Middleware/AuthMiddleware');
const role = require('../Middleware/RoleMiddleware');

router.get('/announcement', MsgController.getmsg);

router.post('/announcement', auth, role('admin'), MsgController.Sendmsg);

module.exports = router;
