const db = require('./db');

class Spaceship {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Spaceships');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Spaceships WHERE SpaceshipID = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, capacity, launchDate, status } = data;
    const [result] = await db.execute('INSERT INTO Spaceships (Name, Capacity, LaunchDate, Status) VALUES (?, ?, ?, ?)', [name, capacity, launchDate, status]);
    return result.insertId;
  }

  static async update(id, data) {
    const { name, capacity, launchDate, status } = data;
    await db.execute('UPDATE Spaceships SET Name = ?, Capacity = ?, LaunchDate = ?, Status = ? WHERE SpaceshipID = ?', [name, capacity, launchDate, status, id]);
  }

  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);
    await db.execute(`UPDATE Spaceships SET ${fields} WHERE SpaceshipID = ?`, values);
  }

  static async delete(id) {
    await db.execute('DELETE FROM Spaceships WHERE SpaceshipID = ?', [id]);
  }
}

module.exports = Spaceship;
