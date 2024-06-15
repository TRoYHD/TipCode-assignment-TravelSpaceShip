const db = require('./db');

class Mission {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Missions');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Missions WHERE MissionID = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    const [result] = await db.execute('INSERT INTO Missions (SpaceshipID, Destination, LaunchDate, Duration) VALUES (?, ?, ?, ?)', [spaceshipId, destination, launchDate, duration]);
    return result.insertId;
  }

  static async update(id, data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    await db.execute('UPDATE Missions SET SpaceshipID = ?, Destination = ?, LaunchDate = ?, Duration = ? WHERE MissionID = ?', [spaceshipId, destination, launchDate, duration, id]);
  }

  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);
    await db.execute(`UPDATE Missions SET ${fields} WHERE MissionID = ?`, values);
  }

  static async delete(id) {
    await db.execute('DELETE FROM Missions WHERE MissionID = ?', [id]);
  }
}

module.exports = Mission;
