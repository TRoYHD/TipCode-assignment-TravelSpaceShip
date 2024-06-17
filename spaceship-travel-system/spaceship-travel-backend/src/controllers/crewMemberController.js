// Import the CrewMember model and validation/error handling utilities
const CrewMember = require('../models/CrewMember');
const { validateCrewMember } = require('../utils/validate');
const { handleError, handleValidationError } = require('../utils/errorHandler');

// Get all crew members from the database
exports.getAllCrewMembers = async (req, res) => {
  try {
    const crewMembers = await CrewMember.findAll();
    res.json(crewMembers);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a specific crew member by its ID
exports.getCrewMemberById = async (req, res) => {
  try {
    const crewMember = await CrewMember.findById(req.params.id);
    if (!crewMember) return res.status(404).json({ error: 'Crew Member not found' });
    res.json(crewMember);
  } catch (error) {
    handleError(res, error);
  }
};

// Check if a crew member name is unique
exports.checkUniqueName = async (req, res) => {
  try {
    const { name, excludeId } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const isUnique = await CrewMember.isNameUnique(name, excludeId);
    res.json({ isUnique });
  } catch (error) {
    console.error('Error checking unique name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new crew member
exports.createCrewMember = async (req, res) => {
  const { error } = validateCrewMember(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const crewMemberId = await CrewMember.create(req.body);
    res.status(201).json({ CrewMemberID: crewMemberId });
  } catch (error) {
    if (error.message === 'Crew member with this name already exists.') {
      return res.status(400).json({ error: error.message });
    }
    handleError(res, error);
  }
};

// Update an existing crew member
exports.updateCrewMember = async (req, res) => {
  const { error } = validateCrewMember(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await CrewMember.update(req.params.id, req.body);
    res.json({ message: 'Crew Member updated' });
  } catch (error) {
    if (error.message === 'Crew member with this name already exists.') {
      return res.status(400).json({ error: error.message });
    }
    handleError(res, error);
  }
};

// Partially update an existing crew member
exports.partialUpdateCrewMember = async (req, res) => {
  try {
    await CrewMember.partialUpdate(req.params.id, req.body);
    res.json({ message: 'Crew Member partially updated' });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a crew member by its ID
exports.deleteCrewMember = async (req, res) => {
  try {
    const crewMember = await CrewMember.findById(req.params.id);
    if (!crewMember) {
      return res.status(404).json({ error: 'Crew Member not found' });
    }
    await CrewMember.delete(req.params.id);
    res.json({ message: 'Crew Member deleted' });
  } catch (error) {
    handleError(res, error);
  }
};
