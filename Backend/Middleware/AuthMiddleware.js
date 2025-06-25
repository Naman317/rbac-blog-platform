const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const JWT_KEY = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token is there' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = await User.findById(decoded.id).select('-password'); //it means excluding the password
    console.log('Authenticated User:', req.user);

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
