// Import the express-rate-limit library
const rateLimit = require('express-rate-limit');

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min time window
  max: 200, // Limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later.', // Message sent when rate limit is exceeded
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
