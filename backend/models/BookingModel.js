// const db = require('../db');

// const createBookingTable = () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS bookings (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_id INT NOT NULL,
//             pg_id INT NOT NULL,
//             name VARCHAR(255) NOT NULL,
//             phone VARCHAR(20) NOT NULL,
//             rent DECIMAL(10,2) NOT NULL,
//             check_in_date DATE NOT NULL,
//             id_proof_front VARCHAR(255) NOT NULL,
//             id_proof_back VARCHAR(255) NOT NULL,
//             user_image VARCHAR(255) NOT NULL,
//             booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (user_id) REFERENCES users(id),
//             FOREIGN KEY (pg_id) REFERENCES pgs(id)
//         )
//     `;

//     db.query(query, (err) => {
//         if (err) {
//             console.error('Error creating bookings table:', err);
//         } else {
//             console.log('Bookings table created or already exists');
//         }
//     });
// };

// module.exports = createBookingTable;
const db = require('../db');

const createBookingTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            pg_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            rent DECIMAL(10,2) NOT NULL,
            check_in_date DATE NOT NULL,
            id_proof_front VARCHAR(255) NOT NULL,
            id_proof_back VARCHAR(255) NOT NULL,
            user_image VARCHAR(255) NOT NULL,
            booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (pg_id) REFERENCES pg_list(id)  -- Changed from pgs(id) to pg_list(id)
        )
    `;

    db.query(query, (err) => {
        if (err) {
            console.error('Error creating bookings table:', err);
            // More detailed error logging
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                console.error('Referenced table might not exist. Please ensure pg_list and users tables exist.');
            }
        } else {
            console.log('Bookings table created or already exists');
        }
    });
};

module.exports = createBookingTable;