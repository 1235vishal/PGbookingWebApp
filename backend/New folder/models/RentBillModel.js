const db = require('../db');

const createRentBillTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS rent_bills (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tenant_id INT NOT NULL,
            tenant_name VARCHAR(255) NOT NULL,
            tenant_phone VARCHAR(20) NOT NULL,
            pg_name VARCHAR(255) NOT NULL,
            room_number VARCHAR(50) NOT NULL,
            due_date DATE NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            message TEXT,
            status ENUM('pending', 'paid') DEFAULT 'pending',
            razorpay_order_id VARCHAR(255),
            razorpay_payment_id VARCHAR(255),
            payment_date TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
        )
    `;

    db.query(query, (err) => {
        if (err) {
            console.error('Error creating rent_bills table:', err);
        } else {
            console.log('Rent bills table created or already exists');
        }
    });
};

module.exports = createRentBillTable;