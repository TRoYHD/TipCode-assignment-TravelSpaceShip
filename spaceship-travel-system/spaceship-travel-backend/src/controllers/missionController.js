const Mission = require('../models/Mission');
const { validateMission } = require('../utils/validate');
const { handleError, handleValidationError } = require('../utils/errorHandler');

// Get all missions from the database
exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.findAll();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific mission by its ID
exports.getMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) return res.status(404).json({ error: 'Mission not found' });
    res.json(mission);
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new mission
exports.createMission = async (req, res) => {
  const { error } = validateMission(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const missionId = await Mission.create(req.body);
    res.status(201).json({ MissionID: missionId });
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing mission
exports.updateMission = async (req, res) => {
  const { error } = validateMission(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await Mission.update(req.params.id, req.body);
    res.json({ message: 'Mission updated' });
  } catch (error) {
    handleError(res, error);
  }
};

// Partially update an existing mission
exports.partialUpdateMission = async (req, res) => {
  try {
    await Mission.partialUpdate(req.params.id, req.body);
    res.json({ message: 'Mission partially updated' });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a mission by its ID
exports.deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) return res.status(404).json({ error: 'Mission not found' });

    await Mission.delete(req.params.id);
    res.json({ message: 'Mission deleted' });
  } catch (error) {
    handleError(res, error);
  }
};
