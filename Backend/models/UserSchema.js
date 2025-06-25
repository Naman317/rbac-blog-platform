const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
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
    default: 'user'
  },

  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],

  bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],

  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
