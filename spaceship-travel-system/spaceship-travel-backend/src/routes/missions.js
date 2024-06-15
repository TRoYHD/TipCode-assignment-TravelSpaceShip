const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

router.get('/', missionController.getAllMissions);
router.post('/', missionController.createMission);
router.get('/:id', missionController.getMissionById);
router.put('/:id', missionController.updateMission);
router.patch('/:id', missionController.partialUpdateMission);
router.delete('/:id', missionController.deleteMission);

module.exports = router;
