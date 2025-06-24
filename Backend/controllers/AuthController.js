const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
