const db = require('./db');

class Mission {
  // Get all missions from the database
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Missions');
    return rows;
  }

  // Get a specific mission by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Missions WHERE MissionID = ?', [id]);
    return rows[0];
  }

  // Create a new mission
  static async create(data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    const [result] = await db.execute(
      'INSERT INTO Missions (SpaceshipID, Destination, LaunchDate, Duration) VALUES (?, ?, ?, ?)',
      [spaceshipId, destination, launchDate, duration]
    );
    return result.insertId;
  }

  // Update an existing mission
  static async update(id, data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    await db.execute(
      'UPDATE Missions SET SpaceshipID = ?, Destination = ?, LaunchDate = ?, Duration = ? WHERE MissionID = ?',
      [spaceshipId, destination, launchDate, duration, id]
    );
  }

  // Partially update an existing mission
  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(value => (value === undefined ? null : value));
    values.push(id);
    await db.execute(`UPDATE Missions SET ${fields} WHERE MissionID = ?`, values);
  }

  // Delete a mission by ID
  static async delete(id) {
    await db.execute('DELETE FROM Missions WHERE MissionID = ?', [id]);
  }
}

module.exports = Mission;
