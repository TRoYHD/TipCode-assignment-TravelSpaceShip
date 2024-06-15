const express = require('express');
const router = express.Router();
const spaceshipController = require('../controllers/spaceshipController');

router.get('/', spaceshipController.getAllSpaceships);
router.post('/', spaceshipController.createSpaceship);
router.get('/:id', spaceshipController.getSpaceshipById);
router.put('/:id', spaceshipController.updateSpaceship);
router.patch('/:id', spaceshipController.partialUpdateSpaceship);
router.delete('/:id', spaceshipController.deleteSpaceship);

module.exports = router;
