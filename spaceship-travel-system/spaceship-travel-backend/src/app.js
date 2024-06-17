// Import required libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const rateLimiter = require('./utils/rateLimiter');
const spaceshipRoutes = require('./routes/spaceships');
const crewMemberRoutes = require('./routes/crewMembers');
const missionRoutes = require('./routes/missions');
const authMiddleware = require('./utils/jwt/authMiddleware');

const app = express(); // Create an Express application

// Middleware setup
app.use(bodyParser.json()); // Parse incoming JSON requests

app.use(session({
  secret: process.env.SECRET_KEY, // Secret key for session
  resave: false, // Don't resave session if not modified
  saveUninitialized: true // Save uninitialized sessions
}));

// Enable CORS for all routes with specific allowed origins
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request if origin is in the allowed list
    } else {
      callback(new Error('Not allowed by CORS')); // Reject request if origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers)
}));

// Route to generate a JWT token
app.post('/generate-token', (req, res) => {
  const payload = { role: 'admin' }; // Define token payload
  const secret = process.env.JWT_SECRET; // Secret key for signing the token
  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Sign token with 1-hour expiration
  res.json({ token }); // Send token as JSON response
});

// Example route to set session data for the express session 
app.post('/set-session-data', (req, res) => {
  req.session.data = req.body; // Set session data from request body
  res.json({ message: 'Session data set' }); // Send success message
});

// Example route to get session data for the express session 
app.get('/get-session-data', (req, res) => {
  const sessionData = req.session.data || {}; // Retrieve session data or an empty object
  res.json(sessionData); // Send session data as JSON response
});

// Handle preflight requests
app.options('*', cors());

// Apply rate limiter to all requests
app.use(rateLimiter);

// Apply JWT verification middleware to protected routes
app.use('/spaceships', authMiddleware, spaceshipRoutes);
app.use('/crewmembers', authMiddleware, crewMemberRoutes);
app.use('/missions', authMiddleware, missionRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Define the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});
