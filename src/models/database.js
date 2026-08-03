const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tododb',
});

// Initialisation de la table au démarrage
const initDb = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY,
      description TEXT NOT NULL,
      status VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

initDb().catch(err => console.error('Erreur initialisation DB:', err));

module.exports = pool;