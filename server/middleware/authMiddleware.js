const jwt = require('jsonwebtoken');
const authService = require('../ServiceDB/authService');
require('dotenv').config(); // Load environment variables

const checkIsUserAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];

      // Use the JWT secret key from your .env file
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      const decoded = jwt.verify(token, jwtSecret);
      const userID = decoded.userID;

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
