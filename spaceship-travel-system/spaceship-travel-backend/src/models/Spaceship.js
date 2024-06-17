const db = require('./db');

class Spaceship {
  // Get all spaceships from the database
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Spaceships');
    return rows;
  }

  // Get a specific spaceship by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Spaceships WHERE SpaceshipID = ?', [id]);
    return rows[0];
  }

  // Check if a spaceship name is unique
  static async isNameUnique(name, excludeId = null) {
    let query = 'SELECT COUNT(*) as count FROM Spaceships WHERE Name = ?';
    const params = [name];
    if (excludeId) {
      query += ' AND SpaceshipID != ?';
      params.push(excludeId);
    }
    const [rows] = await db.execute(query, params);
    return rows[0].count === 0;
  }

  // Create a new spaceship
  static async create(data) {
    const { name, capacity, launchDate, status } = data;
    const [result] = await db.execute(
      'INSERT INTO Spaceships (Name, Capacity, LaunchDate, Status) VALUES (?, ?, ?, ?)',
      [name, capacity, launchDate, status]
    );
    return result.insertId;
  }

  // Update an existing spaceship
  static async update(id, data) {
    const { name, capacity, launchDate, status } = data;
    await db.execute(
      'UPDATE Spaceships SET Name = ?, Capacity = ?, LaunchDate = ?, Status = ? WHERE SpaceshipID = ?',
      [name, capacity, launchDate, status, id]
    );
  }

  // Partially update an existing spaceship
  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(value => (value === undefined ? null : value));
    values.push(id);
    await db.execute(`UPDATE Spaceships SET ${fields} WHERE SpaceshipID = ?`, values);
  }

  // Delete a spaceship by ID
  static async delete(id) {
    await db.execute('DELETE FROM Spaceships WHERE SpaceshipID = ?', [id]);
  }
}

module.exports = Spaceship;
