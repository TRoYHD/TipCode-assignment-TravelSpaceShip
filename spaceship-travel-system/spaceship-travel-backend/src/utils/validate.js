// Import the Joi validation library
const Joi = require('joi');

// Define a validation function for spaceship data
const validateSpaceship = (data) => {
  // Define the validation schema for a spaceship
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }), // name must be a string and is required with custom messages
    capacity: Joi.number().required().messages({
      'number.base': 'Capacity must be a number',
      'any.required': 'Capacity is required'
    }), // capacity must be a number and is required with custom messages
    launchDate: Joi.date().required().messages({
      'date.base': 'Launch Date must be a valid date',
      'any.required': 'Launch Date is required'
    }), // launch date must be a date and is required with custom messages
    status: Joi.string().valid('Ready', 'In Mission', 'Under Maintenance').required().messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of: Ready, In Mission, Under Maintenance',
      'any.required': 'Status is required'
    }) // status must be one of the specified values and is required with custom messages
  });
  // Validate the data against the schema
  return schema.validate(data);
};

// Define a validation function for crew member data
const validateCrewMember = (data) => {
  // Define the validation schema for a crew member
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }), // name must be a string and is required with custom messages
    role: Joi.string().required().messages({
      'string.base': 'Role must be a string',
      'string.empty': 'Role is required',
      'any.required': 'Role is required'
    }), // role must be a string and is required with custom messages
    experienceLevel: Joi.string().valid('Beginner', 'Intermediate', 'Expert').required().messages({
      'string.base': 'Experience Level must be a string',
      'any.only': 'Experience Level must be one of: Beginner, Intermediate, Expert',
      'any.required': 'Experience Level is required'
    }), // experience level must be one of the specified values and is required with custom messages
    assignedSpaceshipID: Joi.number().allow(null).optional().messages({
      'number.base': 'Assigned Spaceship ID must be a number'
    }) // assigned spaceship ID can be a number or null and is optional with custom messages
  });
  // Validate the data against the schema
  return schema.validate(data);
};

// Define a validation function for mission data
const validateMission = (data) => {
  // Define the validation schema for a mission
  const schema = Joi.object({
    spaceshipId: Joi.number().required().messages({
      'number.base': 'Spaceship ID must be a number',
      'any.required': 'Spaceship ID is required'
    }), // spaceship ID must be a number and is required with custom messages
    destination: Joi.string().valid('Moon', 'Mars', 'Jupiter').required().messages({
      'string.base': 'Destination must be a string',
      'any.only': 'Destination must be one of: Moon, Mars, Jupiter',
      'any.required': 'Destination is required'
    }), // destination must be one of the specified values and is required with custom messages
    launchDate: Joi.date().required().messages({
      'date.base': 'Launch Date must be a valid date',
      'any.required': 'Launch Date is required'
    }), // launch date must be a date and is required with custom messages
    duration: Joi.number().required().messages({
      'number.base': 'Duration must be a number',
      'any.required': 'Duration is required'
    }) // duration must be a number and is required with custom messages
  });
  // Validate the data against the schema
  return schema.validate(data);
};

module.exports = {
  validateSpaceship,
  validateCrewMember,
  validateMission
};
