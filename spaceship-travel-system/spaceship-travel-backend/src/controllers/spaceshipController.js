const Spaceship = require('../models/Spaceship');
const { validateSpaceship } = require('../utils/validate');
const { handleError, handleValidationError } = require('../utils/errorHandler');

exports.getAllSpaceships = async (req, res) => {
  try {
    const spaceships = await Spaceship.findAll();
    res.json(spaceships);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getSpaceshipById = async (req, res) => {
  try {
    const spaceship = await Spaceship.findById(req.params.id);
    if (!spaceship) return res.status(404).json({ error: 'Spaceship not found' });
    res.json(spaceship);
  } catch (error) {
    handleError(res, error);
  }
};

exports.createSpaceship = async (req, res) => {
  const { error } = validateSpaceship(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const spaceshipId = await Spaceship.create(req.body);
    res.status(201).json({ SpaceshipID: spaceshipId });
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateSpaceship = async (req, res) => {
  const { error } = validateSpaceship(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await Spaceship.update(req.params.id, req.body);
    res.json({ message: 'Spaceship updated' });
  } catch (error) {
    handleError(res, error);
  }
};

exports.partialUpdateSpaceship = async (req, res) => {
  try {
    await Spaceship.partialUpdate(req.params.id, req.body);
    res.json({ message: 'Spaceship partially updated' });
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteSpaceship = async (req, res) => {
  try {
    await Spaceship.delete(req.params.id);
    res.json({ message: 'Spaceship deleted' });
  } catch (error) {
    handleError(res, error);
  }
};
