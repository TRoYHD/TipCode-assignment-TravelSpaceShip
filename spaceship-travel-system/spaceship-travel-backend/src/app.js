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

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Enable CORS for all routes
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.post('/generate-token', (req, res) => {
  const payload = { role: 'admin' };
  const secret = 'your_secret_key';
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  res.json({ token });
});

// Handle preflight requests
app.options('*', cors());

// Apply rate limiter to all requests
// app.use(rateLimiter);

// Apply JWT verification middleware to protected routes
app.use('/spaceships', authMiddleware, spaceshipRoutes);
app.use('/crewmembers', authMiddleware, crewMemberRoutes);
app.use('/missions', authMiddleware, missionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
