const CrewMember = require('../models/CrewMember');
const { validateCrewMember } = require('../utils/validate');
const { handleError, handleValidationError } = require('../utils/errorHandler');

exports.getAllCrewMembers = async (req, res) => {
  try {
    const crewMembers = await CrewMember.findAll();
    res.json(crewMembers);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getCrewMemberById = async (req, res) => {
  try {
    const crewMember = await CrewMember.findById(req.params.id);
    if (!crewMember) return res.status(404).json({ error: 'Crew Member not found' });
    res.json(crewMember);
  } catch (error) {
    handleError(res, error);
  }
};

exports.createCrewMember = async (req, res) => {
  const { error } = validateCrewMember(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const crewMemberId = await CrewMember.create(req.body);
    res.status(201).json({ CrewMemberID: crewMemberId });
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateCrewMember = async (req, res) => {
  const { error } = validateCrewMember(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await CrewMember.update(req.params.id, req.body);
    res.json({ message: 'Crew Member updated' });
  } catch (error) {
    handleError(res, error);
  }
};

exports.partialUpdateCrewMember = async (req, res) => {
  try {
    await CrewMember.partialUpdate(req.params.id, req.body);
    res.json({ message: 'Crew Member partially updated' });
  } catch (error) {
    handleError(res, error);
  }
};

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
