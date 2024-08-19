const jwt = require('jsonwebtoken');
const authService = require('../ServiceDB/authService');

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1]; 

      // Verify token
      const decoded = jwt.verify(token, "MEPHISTO");
      const userID = decoded.userID; 

      // Get user from token
      const user = await authService.findById(userID);

      if (user) {
      
        delete user.password;
        req.user = user;
        next();
      } else {
        console.log(`User not found for ID: ${userID}`); 
        return res.status(401).json({ message: "Unauthorized User" });
      }
    } catch (error) {
      console.error(`Token verification failed: ${error.message}`); 
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    console.log("Authorization header missing"); 
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = checkIsUserAuthenticated;
