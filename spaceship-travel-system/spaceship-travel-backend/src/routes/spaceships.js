// Import Express.js and create a router
const express = require('express');
const router = express.Router();

// Import the spaceship controller and authentication middleware
const spaceshipController = require('../controllers/spaceshipController');
const authMiddleware = require('../utils/jwt/authMiddleware');

// Define routes for spaceships with authentication middleware
router.get('/check-name', spaceshipController.checkUniqueName); // Define check-name route first to avoid conflicts
router.get('/', authMiddleware, spaceshipController.getAllSpaceships); // Get all spaceships
router.get('/:id', authMiddleware, spaceshipController.getSpaceshipById); // Get a specific spaceship by ID
router.post('/', authMiddleware, spaceshipController.createSpaceship); // Create a new spaceship
router.put('/:id', authMiddleware, spaceshipController.updateSpaceship); // Update an existing spaceship
router.patch('/:id', authMiddleware, spaceshipController.partialUpdateSpaceship); // Partially update an existing spaceship
router.delete('/:id', authMiddleware, spaceshipController.deleteSpaceship); // Delete a spaceship

// Export the router
module.exports = router;
