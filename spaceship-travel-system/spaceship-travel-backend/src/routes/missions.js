const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');
const authMiddleware = require('../utils/jwt/authMiddleware');

router.get('/', authMiddleware, missionController.getAllMissions);
router.get('/:id', authMiddleware, missionController.getMissionById);
router.post('/', authMiddleware, missionController.createMission);
router.put('/:id', authMiddleware, missionController.updateMission);
router.patch('/:id', authMiddleware, missionController.partialUpdateMission);
router.delete('/:id', authMiddleware, missionController.deleteMission);

module.exports = router;
