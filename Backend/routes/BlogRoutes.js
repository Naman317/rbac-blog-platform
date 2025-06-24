const express = require('express');
const router = express.Router();

const blogController = require("../controllers/BlogController");
const auth = require('../Middleware/AuthMiddleware');
const role = require('../Middleware/RoleMiddleware');

// ----------- Public Blog Routes ----------- //
router.get('/', blogController.getAllBlogs);               // Get all blogs
router.get('/:id', blogController.getBlog);               // Get single blog by ID

// ----------- Authenticated User Actions ----------- //
router.post('/like/:id', auth, blogController.likePost);       // Like/unlike a blog
router.post('/bookmark/:id', auth, blogController.bookmarkPost); // Bookmark/unbookmark

// ----------- Admin Routes ----------- //
router.post('/', auth, role('admin'), blogController.create);        // Create blog
router.put('/:id', auth, role('admin'), blogController.update);      // Update blog
router.delete('/:id', auth, role('admin'), blogController.delete);   // Delete blog
router.get('/top-liked', auth, role('admin'), blogController.getTopLiked); // Top liked blogs

module.exports = router;
