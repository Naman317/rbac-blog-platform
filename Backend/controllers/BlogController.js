const Blog=require("../models/BlogSchema");
const User = require('../models/UserSchema');


//============For User
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };  
  
  exports.likePost = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      const userId = req.user._id;
  
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      if (blog.likedBy.includes(userId)) {
        blog.likedBy.pull(userId);
        blog.likes -= 1;
      } else {
        blog.likedBy.push(userId);
        blog.likes += 1;
      }
  
      await blog.save();
      res.json({ likes: blog.likes });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.bookmarkPost = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const blogId = req.params.id;
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.bookmarkedPosts.includes(blogId)) {
        user.bookmarkedPosts.pull(blogId);
      } else {
        user.bookmarkedPosts.push(blogId);
      }
  
      await user.save();
      res.json({ bookmarks: user.bookmarkedPosts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // ================For Admin============================//

  //======Create
  exports.createPost = async (req, res) => {
    try {
      const { title, subTitle, content, category, image, isPublished } = req.body;
  
      const blog = new Blog({
        title,
        subTitle,
        content,
        category,
        image,
        isPublished
      });
  
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  //======Update
  exports.updatePost = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  //=======Delete
  exports.deletePost = async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getTopLikedBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find()
        .sort({ likes: -1 })
        .limit(5);
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };