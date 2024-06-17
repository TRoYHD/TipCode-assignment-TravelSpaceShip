const Spaceship = require('../models/Spaceship');
const { validateSpaceship } = require('../utils/validate');
const { handleError, handleValidationError } = require('../utils/errorHandler');
const Mission = require('../models/Mission');  

// Get all spaceships from the database
exports.getAllSpaceships = async (req, res) => {
  try {
    const spaceships = await Spaceship.findAll();
    res.json(spaceships);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a specific spaceship by its ID
exports.getSpaceshipById = async (req, res) => {
  try {
    const spaceship = await Spaceship.findById(req.params.id);
    if (!spaceship) return res.status(404).json({ error: 'Spaceship not found' });
    res.json(spaceship);
  } catch (error) {
    handleError(res, error);
  }
};

// Check if a spaceship name is unique
exports.checkUniqueName = async (req, res) => {
  try {
    const { name, excludeId } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const isUnique = await Spaceship.isNameUnique(name, excludeId);
    res.json({ isUnique });
  } catch (error) {
    console.error('Error checking unique name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new spaceship
exports.createSpaceship = async (req, res) => {
  const { error } = validateSpaceship(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const spaceshipId = await Spaceship.create(req.body);
    res.status(201).json({ SpaceshipID: spaceshipId });
  } catch (error) {
    if (error.message === 'Spaceship with this name already exists.') {
      return res.status(400).json({ error: error.message });
    }
    handleError(res, error);
  }
};

// Update an existing spaceship
exports.updateSpaceship = async (req, res) => {
  const { error } = validateSpaceship(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await Spaceship.update(req.params.id, req.body);
    res.json({ message: 'Spaceship updated' });
  } catch (error) {
    if (error.message === 'Spaceship with this name already exists.') {
      return res.status(400).json({ error: error.message });
    }
    handleError(res, error);
  }
};

// Partially update an existing spaceship
exports.partialUpdateSpaceship = async (req, res) => {
  try {
    await Spaceship.partialUpdate(req.params.id, req.body);
    res.json({ message: 'Spaceship partially updated' });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a spaceship by its ID
exports.deleteSpaceship = async (req, res) => {
  try {
    const spaceship = await Spaceship.findById(req.params.id);
    if (!spaceship) {
      return res.status(404).json({ error: 'Spaceship not found' });
    }

    // Check if there are any missions associated with this spaceship
    const associatedMissions = await Mission.findBySpaceshipId(req.params.id);
    if (associatedMissions.length > 0) {
      return res.status(400).json({ error: 'Cannot delete spaceship. There are missions associated with this spaceship.' });
    }

    await Spaceship.delete(req.params.id);
    res.json({ message: 'Spaceship deleted' });
  } catch (error) {
    handleError(res, error);
  }
};
