// Import the JSON Web Token library
const jwt = require('jsonwebtoken');

// Define the authentication middleware function
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header (format: 'Bearer <token>')
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded payload to the request object
    req.user = decoded;
    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If the token is invalid, return a 400 Bad Request response
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Export the authentication middleware
module.exports = authMiddleware;
