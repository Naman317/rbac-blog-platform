const roleMiddleware = (role) => {
    return (req, res, next) => {
      if (!req.user){
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (req.user.role !== role){
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
<<<<<<< HEAD
      console.log(' Checking role:', req.user.role);

=======
>>>>>>> 7860b08a7565a39ba9b2c6a3d232e38e48a46423
      next();
    };
  };
  
  module.exports = roleMiddleware;
  