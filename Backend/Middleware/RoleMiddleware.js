const roleMiddleware = (role) => {
    return (req, res, next) => {
      if (!req.user){
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (req.user.role !== role){
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
      console.log(' Checking role:', req.user.role);

      next();
    };
  };
  
  module.exports = roleMiddleware;
  