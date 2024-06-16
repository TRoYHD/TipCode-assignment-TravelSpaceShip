const jwt = require('jsonwebtoken');

const secret = 'your_secret_key';
const verifyJwt = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Forbidden: No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = verifyJwt;
