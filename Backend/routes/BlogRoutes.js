const express = require('express');
const router = express.Router();
const blogController=require("../controllers/BlogController")
const auth=require('../Middleware/AuthMiddleware')
const role=require('../Middleware/RoleMiddleware')

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.post('/like/:id', auth, blogController.likePost);
router.post('/bookmark/:id', auth, blogController.bookmarkPost);


router.post('/', auth, role('admin'), blogController.create);
router.put('/:id', auth, role('admin'), blogController.update);
router.delete('/:id', auth, role('admin'), blogController.delete);
router.get('/top-liked', auth, role('admin'), blogController.getTopLiked);

module.exports = router;



