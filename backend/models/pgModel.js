// const db = require('../db');

// const createPGTable = () => {
//     const sql = `
//         CREATE TABLE IF NOT EXISTS pg_list (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             pg_name VARCHAR(255),
//             pg_type VARCHAR(100),
//             address TEXT,
//             rent_start_from DECIMAL(10,2),
//             number_of_floors INT,
//             latitude DECIMAL(10,6),
//             longitude DECIMAL(10,6),
//             zone VARCHAR(100),
//             main_image VARCHAR(255),
//             additional_images TEXT,
//             video_url VARCHAR(255),
//             facilities TEXT,
//             description TEXT,
//             owner_name VARCHAR(255),
//             phone_number VARCHAR(20),
//             email_address VARCHAR(100),
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//     `;
//     db.query(sql, (err) => {
//         if (err) throw err;
//         console.log("PG table created or already exists.");
//     });
// };

// const insertPG = (data, callback) => {
//     const sql = `INSERT INTO pg_list SET ?`;
//     db.query(sql, data, callback);
// };

// module.exports = { createPGTable, insertPG };


const db = require('../db');

const createPGTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS pg_list (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pg_name VARCHAR(255),
            pg_type VARCHAR(100),
            address TEXT,
            rent_start_from DECIMAL(10,2),
            number_of_floors INT,
            latitude DECIMAL(10,6),
            longitude DECIMAL(10,6),
            zone VARCHAR(100),
            main_image VARCHAR(255),
            additional_images TEXT,
            video_url VARCHAR(255),
            facilities TEXT,
            description TEXT,
            owner_name VARCHAR(255),
            phone_number VARCHAR(20),
            email_address VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(sql, (err) => {
        if (err) throw err;
        console.log("PG table created or already exists.");
    });
};

const insertPG = (data, callback) => {
    const sql = `INSERT INTO pg_list SET ?`;
    db.query(sql, data, callback);
};

const updatePG = (id, data, callback) => {
    const sql = `UPDATE pg_list SET ? WHERE id = ?`;
    db.query(sql, [data, id], callback);
};

module.exports = { createPGTable, insertPG, updatePG };