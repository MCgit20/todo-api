const pool = require('./database');
const { v4: uuidv4 } = require('uuid');

class TaskModel {
  static async getAll() {
    const res = await pool.query('SELECT * FROM tasks ORDER BY createdAt DESC');
    return res.rows;
  }

  static async getById(id) {
    const res = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(description) {
    const id = uuidv4();
    const status = 'PENDING';
    const now = new Date();
    const query = `
      INSERT INTO tasks (id, description, status, createdAt, updatedAt)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const res = await pool.query(query, [id, description, status, now, now]);
    return res.rows[0];
  }

  static async update(id, data) {
    const task = await this.getById(id);
    if (!task) return null;

    const description = data.description !== undefined ? data.description : task.description;
    const status = data.status !== undefined ? data.status : task.status;
    const updatedAt = new Date();

    const query = `
      UPDATE tasks SET description = $1, status = $2, updatedAt = $3
      WHERE id = $4 RETURNING *;
    `;
    const res = await pool.query(query, [description, status, updatedAt, id]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
}

module.exports = TaskModel;