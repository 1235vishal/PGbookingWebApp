const db = require('../db');

const createAdminTable = `
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP
)`;

db.query(createAdminTable, (err) => {
    if (err) throw err;
    console.log('Admin table ready');
});

module.exports = {
    registerAdmin: (name, email, password, callback) => {
        const sql = 'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, password], callback);
    },

    getAdminByEmail: (email, callback) => {
        const sql = 'SELECT * FROM admin WHERE email = ?';
        db.query(sql, [email], callback);
    },

    updateResetToken: (email, token, expires, callback) => {
        const sql = 'UPDATE admin SET reset_token = ?, reset_token_expires = ? WHERE email = ?';
        db.query(sql, [token, expires, email], (error, results) => {
            if (error) {
                console.error('Error updating reset token:', error);
                return callback(error);
            }
            if (results.affectedRows === 0) {
                return callback(new Error('No admin found with this email'));
            }
            callback(null, results);
        });
    },

    getAdminByResetToken: (token, callback) => {
        const sql = 'SELECT * FROM admin WHERE reset_token = ? AND reset_token_expires > NOW()';
        db.query(sql, [token], callback);
    },

    updatePassword: (adminId, password, callback) => {
        const sql = 'UPDATE admin SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?';
        db.query(sql, [password, adminId], callback);
    }
};
