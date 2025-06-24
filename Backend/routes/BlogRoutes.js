const express = require('express');
const router = express.Router();

const blogController=require("../controllers/BlogController")
const auth=require('../Middleware/AuthMiddleware')

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

router.post('/like/:id', auth, blogController.likePost);
router.post('/bookmark/:id', auth, blogController.bookmarkPost);

module.exports = router;



module.exports = router;