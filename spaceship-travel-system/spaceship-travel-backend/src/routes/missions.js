// Import Express.js and create a router
const express = require('express');
const router = express.Router();

// Import the mission controller and authentication middleware
const missionController = require('../controllers/missionController');
const authMiddleware = require('../utils/jwt/authMiddleware');

// Define routes for missions with authentication middleware
router.get('/', authMiddleware, missionController.getAllMissions); // Get all missions
router.get('/:id', authMiddleware, missionController.getMissionById); // Get a specific mission by ID
router.post('/', authMiddleware, missionController.createMission); // Create a new mission
router.put('/:id', authMiddleware, missionController.updateMission); // Update an existing mission
router.patch('/:id', authMiddleware, missionController.partialUpdateMission); // Partially update an existing mission
router.delete('/:id', authMiddleware, missionController.deleteMission); // Delete a mission

module.exports = router;
