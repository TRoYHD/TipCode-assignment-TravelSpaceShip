// Import Express.js and create a router
const express = require('express');
const router = express.Router();

// Import the crew member controller and authentication middleware
const crewMemberController = require('../controllers/crewMemberController');
const authMiddleware = require('../utils/jwt/authMiddleware');

// Define routes for crew members with authentication middleware
router.get('/check-name', crewMemberController.checkUniqueName); // Define check-name route first to avoid conflicts
router.get('/', authMiddleware, crewMemberController.getAllCrewMembers); // Get all crew members
router.get('/:id', authMiddleware, crewMemberController.getCrewMemberById); // Get a specific crew member by ID
router.post('/', authMiddleware, crewMemberController.createCrewMember); // Create a new crew member
router.put('/:id', authMiddleware, crewMemberController.updateCrewMember); // Update an existing crew member
router.patch('/:id', authMiddleware, crewMemberController.partialUpdateCrewMember); // Partially update an existing crew member
router.delete('/:id', authMiddleware, crewMemberController.deleteCrewMember); // Delete a crew member

module.exports = router;
