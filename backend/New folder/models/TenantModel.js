const db = require('../db');

const createTenantTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS tenants (
            id INT AUTO_INCREMENT PRIMARY KEY,
            booking_id INT NOT NULL,
            user_id INT NOT NULL,
            pg_id INT NOT NULL,
            room_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            rent DECIMAL(10,2) NOT NULL,
            check_in_date DATE NOT NULL,
            id_proof_front VARCHAR(255) NOT NULL,
            id_proof_back VARCHAR(255) NOT NULL,
            user_image VARCHAR(255) NOT NULL,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (booking_id) REFERENCES bookings(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (pg_id) REFERENCES pg_list(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
    `;

    db.query(query, (err) => {
        if (err) {
            console.error('Error creating tenants table:', err);
        } else {
            console.log('Tenants table created or already exists');
        }
    });
};

module.exports = createTenantTable;