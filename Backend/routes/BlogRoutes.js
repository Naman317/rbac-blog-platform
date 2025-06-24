const express = require('express');
const router = express.Router();


const auth=require('../Middleware/AuthMiddleware')

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);


module.exports = router;