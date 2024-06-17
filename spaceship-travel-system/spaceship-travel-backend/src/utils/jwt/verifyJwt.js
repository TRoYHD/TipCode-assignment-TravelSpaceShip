// Import the JSON Web Token library
const jwt = require('jsonwebtoken');

// Define the JWT verification middleware function
const verifyJwt = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization'];

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ error: 'Forbidden: No token provided' });
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If the token is invalid or verification fails, return a 401 Unauthorized response
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded payload to the request object
    req.decoded = decoded;
    // Call the next middleware function in the stack
    next();
  });
};

// Export the JWT verification middleware
module.exports = verifyJwt;
