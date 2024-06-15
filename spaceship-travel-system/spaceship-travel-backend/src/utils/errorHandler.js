const handleError = (res, error) => {
    res.status(500).json({ error: error.message });
  };
  
  const handleValidationError = (res, error) => {
    res.status(400).json({ error: error.details[0].message });
  };
  
  module.exports = {
    handleError,
    handleValidationError
  };
  