const Blog=require("../models/BlogSchema");
const User = require('../models/UserSchema');


//============For User
//----all blog
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message:"Couldn't fetch blogs. Try again later." });
    }
  };
  
  //-----get_one_blog_by_id------
  exports.getBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Didn't find the blog" });
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message:"Error fetching" });
    }
  };  
//---Like_Unlike
  exports.likePost = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      const userId = req.user._id;
  
      if (!blog){
        return res.status(404).json({ message: 'Not found' });
      }
  
      const hasLiked = blog.likedBy.includes(userId);

      if (hasLiked) {
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

  //-----Get_Bookmark_blog
  exports.bookmarkPost = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const blogId = req.params.id;
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isBookmarked = user.bookmark.includes(blogId);
  
      if (isBookmarked) {
        user.bookmark.pull(blogId); 
      } else {
        user.bookmark.push(blogId); 
      }
  
      await user.save();
      res.status(200).json({
        message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
        bookmarks: user.bookmark
      });
    } catch (err) {
      res.status(500).json({ message: 'Error updating bookmark', error: err.message });
    }
  };

 //-----Get All Bookmarked Blogs for a User-----
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmark');
    if (!user) {
       return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.bookmark); 
      // 
      } catch (err) {
        res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
       }
  };
  
  
  
  
  
  
  
  
  // ================For Admin============================//

  //======Create
  exports.create = async (req, res) => {
    try {
      const { title, subTitle, content, category, isPublished } = req.body;
  
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      if (!image) return res.status(400).json({ message: 'Image upload failed' });
  
      const blog = new Blog({
        title,
        subTitle,
        content,
        category,
        isPublished,
        image,
      });
  
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      console.error('Error in creating blog:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  //======Update
  exports.update = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const { title, subTitle, content, category, isPublished } = req.body;
  
      blog.title = title;
      blog.subTitle = subTitle;
      blog.content = content;
      blog.category = category;
      blog.isPublished = isPublished === 'true'; 
  
      if (req.file) {
        blog.image = `/uploads/${req.file.filename}`;
      }
  
      await blog.save();
      res.json(blog);
    } catch (err) {
      console.error('Error updating blog:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  //=======Delete
  exports.delete = async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: 'Blog successfully deleted. ' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
//===Get_Top_Blogs
exports.getTopLiked = async (req, res) => {
  try {
    console.log('🔍 [ADMIN] Fetching top liked blogs');

    const blogs = await Blog.find({ isPublished: true }) 
      .sort({ likes: -1 })
      .limit(5);

    console.log('Top liked blogs found:', blogs.length);
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error in getTopLiked:', err.message);
    res.status(500).json({
      message: 'Failed to get top liked blogs',
      error: err.message,
    });
  }
};
