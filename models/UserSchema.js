const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true 
},
  email:{type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
  },

  likedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }
  ],

  bookmarkedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }
  ]
}, { timestamps: true });// This Timestamp add created at and updated at automaatically managed by Moongoose

module.exports = mongoose.model('User', userSchema);
