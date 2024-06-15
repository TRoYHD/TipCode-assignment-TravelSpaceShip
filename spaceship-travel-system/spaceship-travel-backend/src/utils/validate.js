const Joi = require('joi');

const validateSpaceship = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    capacity: Joi.number().required(),
    launchDate: Joi.date().required(),
    status: Joi.string().valid('Ready', 'In Mission', 'Under Maintenance').required()
  });
  return schema.validate(data);
};

const validateCrewMember = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    experienceLevel: Joi.string().valid('Beginner', 'Intermediate', 'Expert').required(),
    assignedSpaceshipID: Joi.number().allow(null).optional()
  });
  return schema.validate(data);
};


const validateMission = (data) => {
  const schema = Joi.object({
    spaceshipId: Joi.number().required(),
    destination: Joi.string().valid('Moon', 'Mars', 'Jupiter').required(),
    launchDate: Joi.date().required(),
    duration: Joi.number().required()
  });
  return schema.validate(data);
};

module.exports = {
  validateSpaceship,
  validateCrewMember,
  validateMission
};
