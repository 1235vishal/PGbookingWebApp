const db = require('../db');

const createRoomTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pg_id INT,
            room_number VARCHAR(50),
            floor_wing VARCHAR(100),
            room_type VARCHAR(50),
            base_rent DECIMAL(10,2),
            room_status VARCHAR(50),
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (pg_id) REFERENCES pg_list(id)
        )
    `;
    db.query(sql, (err) => {
        if (err) throw err;
        console.log("Room table created or already exists.");
    });
};

const insertRoom = (data, callback) => {
    const sql = `INSERT INTO rooms SET ?`;
    db.query(sql, data, callback);
};

const updateRoom = (id, data, callback) => {
    // Remove updated_at from the query as it's automatically handled by MySQL
    const sql = `UPDATE rooms SET ? WHERE id = ?`;
    db.query(sql, [data, id], callback);
};



module.exports = { createRoomTable, insertRoom, updateRoom };