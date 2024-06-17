// Import the database connection
const db = require('./models/db');

// Define an asynchronous function to test the database connection
async function testConnection() {
  try {
    // Execute a simple query to test the connection
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    // Log the result to the console (should print 2)
    console.log('Database connection successful:', rows[0].solution);
  } catch (error) {
    // If there is an error, log the error message to the console
    console.error('Database connection failed:', error.message);
  }
}

// Call the testConnection function to test the database connection
testConnection();
