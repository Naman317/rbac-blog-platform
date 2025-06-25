const express = require('express');
const router = express.Router();
<<<<<<< HEAD
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
=======

const blogController = require("../controllers/BlogController");
const auth = require('../Middleware/AuthMiddleware');
const role = require('../Middleware/RoleMiddleware');
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423

// ----------- Public Blog Routes ----------- //
router.get('/', blogController.getAllBlogs);               // Get all blogs
router.get('/:id', blogController.getBlog);               // Get single blog by ID

<<<<<<< HEAD


router.post(
  '/',
  auth,
  role('admin'),
  upload.single('image'), // 'image' is the form field name
  blogController.create
);
=======
// ----------- Authenticated User Actions ----------- //
router.post('/like/:id', auth, blogController.likePost);       // Like/unlike a blog
router.post('/bookmark/:id', auth, blogController.bookmarkPost); // Bookmark/unbookmark

// ----------- Admin Routes ----------- //
router.post('/', auth, role('admin'), blogController.create);        // Create blog
router.put('/:id', auth, role('admin'), blogController.update);      // Update blog
router.delete('/:id', auth, role('admin'), blogController.delete);   // Delete blog
router.get('/top-liked', auth, role('admin'), blogController.getTopLiked); // Top liked blogs
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423

module.exports = router;
