const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const JWT_SECRET = "dasddasdasd@zfdf";

const getuser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if Authorization header exists in the request
    // If no token is sent, user is not authenticated
    if (!authHeader) {
      logger.warn("Access denied: No token provided");
      return res.status(401).json({ error: "Access denied" });
    }

    // Extract the actual JWT from the Authorization header
    // Expected format: "Bearer <token>"
    // split(" ") breaks it into ["Bearer", "<token>"]
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    //  Verify the JWT using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validate token payload structure
    // User id is required
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    logger.error("Invalid or expired token", {
      message: error.message,
    });
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = getuser;
