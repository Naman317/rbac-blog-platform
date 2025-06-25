const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const crypto = require('crypto');

const JWT_KEY = process.env.JWT_KEY;

=======

const JWT_KEY = process.env.JWT_KEY;

//==========================Register====================================//
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const Check_user = await User.findOne({ email });
    
    if (Check_user) {
      return res.status(400).json({ message: 'User with that mail already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPassword, role: role || 'user'});
    await user.save();
    res.status(201).json({ message: 'User is successfully registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error while registering user'});
  }
};
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423

//============================Login========================================//
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User is not registered ! Please register' });
    }
    const p = await bcrypt.compare(password, user.password);

    if (!p) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, JWT_KEY, { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: { 
        id: user._id,name: user.name,email: user.email,role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ah ! Login error' });
  }
};
<<<<<<< HEAD


//==========================Register====================================//
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();

    // Generate verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '10m' });
    const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;

    res.status(201).json({ message: 'Registered successfully', verificationLink });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.verify = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('Invalid user');

    user.verified = true;
    await user.save();

    res.redirect('http://localhost:5173/'); 

  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
};
=======
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423
