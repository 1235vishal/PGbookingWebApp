const db = require('../db');

const Zone = {
    createTable: () => {
        const sql = `
      CREATE TABLE IF NOT EXISTS zones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;
        db.query(sql, (err) => {
            if (err) console.error('Error creating zone table:', err);
            else console.log('Zone table ready');
        });
    }
};

module.exports = Zone;
