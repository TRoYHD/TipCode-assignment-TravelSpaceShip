const db = require('./models/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    console.log('Database connection successful:', rows[0].solution); // Should print 2
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testConnection();
