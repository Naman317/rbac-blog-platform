const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true 
<<<<<<< HEAD
  },
  email: {
    type: String,
=======
},
  email:{type: String,
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423
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
<<<<<<< HEAD
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
=======
  },

  likedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }
  ],

  bookmark: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }
  ]
}, { timestamps: true });// This Timestamp add created at and updated at automaatically managed by Moongoose
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423

module.exports = mongoose.model('User', userSchema);
