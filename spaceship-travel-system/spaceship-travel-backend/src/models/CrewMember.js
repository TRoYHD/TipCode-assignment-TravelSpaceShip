const db = require('./db');

class CrewMember {
  // Get all crew members from the database
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM CrewMembers');
    return rows;
  }

  // Get a specific crew member by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM CrewMembers WHERE CrewMemberID = ?', [id]);
    return rows[0];
  }

  // Create a new crew member
  static async create(data) {
    const { name, role, experienceLevel, assignedSpaceshipID } = data;

    // Check if name is unique
    const isUnique = await this.isNameUnique(name);
    if (!isUnique) {
      throw new Error('Crew member with this name already exists.');
    }

    const [result] = await db.execute(
      'INSERT INTO CrewMembers (Name, Role, ExperienceLevel, AssignedSpaceshipID) VALUES (?, ?, ?, ?)',
      [name, role, experienceLevel, assignedSpaceshipID || null]
    );
    return result.insertId;
  }

  // Update an existing crew member
  static async update(id, data) {
    const { name, role, experienceLevel, assignedSpaceshipID } = data;

    // Check if name is unique
    const isUnique = await this.isNameUnique(name, id);
    if (!isUnique) {
      throw new Error('Crew member with this name already exists.');
    }

    await db.execute(
      'UPDATE CrewMembers SET Name = ?, Role = ?, ExperienceLevel = ?, AssignedSpaceshipID = ? WHERE CrewMemberID = ?',
      [name, role, experienceLevel, assignedSpaceshipID || null, id]
    );
  }

  // Partially update an existing crew member
  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(value => (value === undefined ? null : value));
    values.push(id);
    await db.execute(`UPDATE CrewMembers SET ${fields} WHERE CrewMemberID = ?`, values);
  }

  // Delete a crew member by ID
  static async delete(id) {
    await db.execute('DELETE FROM CrewMembers WHERE CrewMemberID = ?', [id]);
  }

  // Find crew members by name
  static async findByName(name) {
    const [rows] = await db.execute('SELECT * FROM CrewMembers WHERE Name = ?', [name]);
    return rows;
  }

  // Check if a crew member name is unique
  static async isNameUnique(name, excludeId = null) {
    let query = 'SELECT COUNT(*) as count FROM CrewMembers WHERE Name = ?';
    const params = [name];
    if (excludeId) {
      query += ' AND CrewMemberID != ?';
      params.push(excludeId);
    }
    const [rows] = await db.execute(query, params);
    return rows[0].count === 0;
  }

  // Unassign crew members from a specific spaceship
  static async unassignFromSpaceship(spaceshipId) {
    await db.execute('UPDATE CrewMembers SET AssignedSpaceshipID = NULL WHERE AssignedSpaceshipID = ?', [spaceshipId]);
  }
}

module.exports = CrewMember;
