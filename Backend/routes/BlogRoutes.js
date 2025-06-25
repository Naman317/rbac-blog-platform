const express = require('express');
const router = express.Router();
const Blog=require("../models/BlogSchema");
const User = require('../models/UserSchema');
const blogController = require("../controllers/BlogController");
const auth = require('../Middleware/AuthMiddleware');
const role = require('../Middleware/RoleMiddleware');
const upload = require('../Middleware/ImgMiddleware');

// ----------- Authenticated User Actions ----------- //
router.post('/like/:id', auth, blogController.likePost);       // Like/unlike a blog
router.post('/bookmark/:id', auth, blogController.bookmarkPost); // Bookmark/unbookmark
router.get('/bookmark', auth, blogController.getBookmarks);
// ----------- Admin Routes ----------- //
router.put('/:id', auth, role('admin'), upload.single('image'), blogController.update);
router.delete('/:id', auth, role('admin'), blogController.delete);   // Delete blog
router.get('/top-liked', auth, role('admin'), blogController.getTopLiked); // Top liked blogs

// ----------- Public Blog Routes ----------- //
router.get('/', blogController.getAllBlogs);               // Get all blogs
router.get('/:id', blogController.getBlog);               // Get single blog by ID



router.post(
  '/',
  auth,
  role('admin'),
  upload.single('image'), // 'image' is the form field name
  blogController.create
);

module.exports = router;
