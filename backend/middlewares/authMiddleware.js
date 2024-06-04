const jwt = require("jsonwebtoken");
const admin = require("../configs/firebaseAdminConfig");


const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Store decoded user information in req.user
      req.user = decodedToken;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};


module.exports = { protect };