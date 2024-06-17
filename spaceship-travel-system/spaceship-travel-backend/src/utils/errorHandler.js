// Define a function to handle general errors
const handleError = (res, error) => {
  // Send a 500 Internal Server Error response with the error message
  res.status(500).json({ error: error.message });
};

// Define a function to handle validation errors
const handleValidationError = (res, error) => {
  // Send a 400 Bad Request response with the validation error message
  res.status(400).json({ error: error.details[0].message });
};

// Export the error handling functions
module.exports = {
  handleError,
  handleValidationError
};
