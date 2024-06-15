const db = require('./db');

class CrewMember {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM CrewMembers');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM CrewMembers WHERE CrewMemberID = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, role, experienceLevel, assignedSpaceshipID } = data;
    const [result] = await db.execute(
      'INSERT INTO CrewMembers (Name, Role, ExperienceLevel, AssignedSpaceshipID) VALUES (?, ?, ?, ?)', 
      [name, role, experienceLevel, assignedSpaceshipID || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, role, experienceLevel, assignedSpaceshipID } = data;
    await db.execute(
      'UPDATE CrewMembers SET Name = ?, Role = ?, ExperienceLevel = ?, AssignedSpaceshipID = ? WHERE CrewMemberID = ?', 
      [name, role, experienceLevel, assignedSpaceshipID || null, id]
    );
  }

  static async partialUpdate(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(value => (value === undefined ? null : value));
    values.push(id);
    await db.execute(`UPDATE CrewMembers SET ${fields} WHERE CrewMemberID = ?`, values);
  }

  static async delete(id) {
    await db.execute('DELETE FROM CrewMembers WHERE CrewMemberID = ?', [id]);
  }
}

module.exports = CrewMember;
