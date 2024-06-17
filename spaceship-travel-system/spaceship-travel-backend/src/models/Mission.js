const db = require('./db');
const dayjs = require('dayjs');

class Mission {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Missions');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Missions WHERE MissionID = ?', [id]);
    return rows[0];
  }

  // Find missions by spaceship ID
  static async findBySpaceshipId(spaceshipId) {
    const [rows] = await db.execute('SELECT * FROM Missions WHERE SpaceshipID = ?', [spaceshipId]);
    return rows;
  }

  static async create(data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    const formattedLaunchDate = dayjs(launchDate).format('YYYY-MM-DD');
    try {
      const [result] = await db.execute(
        'INSERT INTO Missions (SpaceshipID, Destination, LaunchDate, Duration) VALUES (?, ?, ?, ?)',
        [spaceshipId, destination, formattedLaunchDate, duration]
      );
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('Spaceship ID does not exist.');
      }
      throw error;
    }
  }

  static async update(id, data) {
    const { spaceshipId, destination, launchDate, duration } = data;
    const formattedLaunchDate = dayjs(launchDate).format('YYYY-MM-DD');
    try {
      await db.execute(
        'UPDATE Missions SET SpaceshipID = ?, Destination = ?, LaunchDate = ?, Duration = ? WHERE MissionID = ?',
        [spaceshipId, destination, formattedLaunchDate, duration, id]
      );
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('Spaceship ID does not exist.');
      }
      throw error;
    }
  }

  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(value => (value === undefined ? null : value));
    values.push(id);
    try {
      await db.execute(`UPDATE Missions SET ${fields} WHERE MissionID = ?`, values);
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('Spaceship ID does not exist.');
      }
      throw error;
    }
  }

  static async delete(id) {
    try {
      await db.execute('DELETE FROM Missions WHERE MissionID = ?', [id]);
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('Cannot delete mission. There are references to this mission.');
      }
      throw error;
    }
  }
}

module.exports = Mission;
