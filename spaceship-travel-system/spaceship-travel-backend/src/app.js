const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const rateLimiter = require('./utils/rateLimiter');

const spaceshipRoutes = require('./routes/spaceships');
const crewMemberRoutes = require('./routes/crewMembers');
const missionRoutes = require('./routes/missions');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Enable CORS for all routes
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
// Apply rate limiter to all requests
// app.use(rateLimiter);

// Routes
app.use('/spaceships', spaceshipRoutes);
app.use('/crewmembers', crewMemberRoutes);
app.use('/missions', missionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
