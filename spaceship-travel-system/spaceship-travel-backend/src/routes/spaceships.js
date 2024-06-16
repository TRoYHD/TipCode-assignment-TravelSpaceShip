const express = require('express');
const router = express.Router();
const spaceshipController = require('../controllers/spaceshipController');
const authMiddleware = require('../utils/jwt/authMiddleware');

router.get('/', authMiddleware, spaceshipController.getAllSpaceships);
router.get('/:id', authMiddleware, spaceshipController.getSpaceshipById);
router.post('/', authMiddleware, spaceshipController.createSpaceship);
router.put('/:id', authMiddleware, spaceshipController.updateSpaceship);
router.patch('/:id', authMiddleware, spaceshipController.partialUpdateSpaceship);
router.delete('/:id', authMiddleware, spaceshipController.deleteSpaceship);

module.exports = router;
