const express = require('express');
const router = express.Router();
const blogController=require("../controllers/BlogController")
const auth=require('../Middleware/AuthMiddleware')
const role=require('../Middleware/RoleMiddleware')

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.post('/like/:id', auth, blogController.likePost);
router.post('/bookmark/:id', auth, blogController.bookmarkPost);


router.post('/', auth, role('admin'), blogController.createPost);
router.put('/:id', auth, role('admin'), blogController.updatePost);
router.delete('/:id', auth, role('admin'), blogController.deletePost);
router.get('/top-liked', auth, role('admin'), adminController.getTopLikedBlogs);

module.exports = router;



module.exports = router;