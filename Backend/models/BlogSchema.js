const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true
  },
  subTitle: {
    type: String,
    required: true,
    trim:true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    

  },
  image:{
    type:String,
    required:true
  },
  isPublished:{
    type:Boolean,
    required: true,
    default: false
  },
  
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [                      
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogPostSchema);
