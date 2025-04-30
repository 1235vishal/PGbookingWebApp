const db = require('../db');

// Auto create table if not exists
const createWhatsappNumberTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS whatsapp_numbers (
            id INT PRIMARY KEY AUTO_INCREMENT,
            number VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    db.query(createTableQuery, (error) => {
        if (error) {
            console.error('Error creating WhatsApp number table:', error);
            throw error;
        }
        console.log('WhatsApp number table created or already exists');
    });
};

// Initialize table
createWhatsappNumberTable();

// WhatsApp number model methods
const WhatsappNumber = {
    // Get the current WhatsApp number
    getCurrentNumber: (callback) => {
        db.query(
            'SELECT number FROM whatsapp_numbers ORDER BY id DESC LIMIT 1',
            (error, results) => {
                if (error) return callback(error);
                callback(null, results[0]?.number || null);
            }
        );
    },

    // Update WhatsApp number
    updateNumber: (number, callback) => {
        // First delete existing numbers
        db.query('DELETE FROM whatsapp_numbers', (error) => {
            if (error) return callback(error);

            // Then insert new number
            db.query(
                'INSERT INTO whatsapp_numbers (number) VALUES (?)',
                [number],
                (error, results) => {
                    if (error) return callback(error);
                    callback(null, results.insertId);
                }
            );
        });
    },

    // Delete WhatsApp number
    deleteNumber: (callback) => {
        db.query('DELETE FROM whatsapp_numbers', (error) => {
            if (error) return callback(error);
            callback(null, true);
        });
    }
};

module.exports = WhatsappNumber;