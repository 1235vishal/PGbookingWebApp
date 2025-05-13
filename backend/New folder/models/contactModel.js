// const db = require('../db');

// class Contact {
//     static initialize(callback) {
//         const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS contacts (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         description TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//         db.query(createTableQuery, (err) => {
//             if (err) {
//                 console.error('Error creating contacts table:', err);
//                 return callback(err);
//             }
//             console.log('Contacts table initialized');
//             callback(null);
//         });
//     }

//     static create(contactData, callback) {
//         const { name, email, description } = contactData;
//         const query = 'INSERT INTO contacts (name, email, description) VALUES (?, ?, ?)';

//         db.query(query, [name, email, description], (err, result) => {
//             if (err) {
//                 console.error('Error creating contact:', err);
//                 return callback(err);
//             }
//             callback(null, { id: result.insertId, ...contactData });
//         });
//     }
// }

// // Initialize the table when the model is loaded
// Contact.initialize((err) => {
//     if (err) throw err;
// });

// module.exports = Contact;
const db = require('../db');

class Contact {
    static initialize(callback) {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating contacts table:', err);
                return callback(err);
            }
            console.log('Contacts table initialized');
            callback(null);
        });
    }

    static create(contactData, callback) {
        const { name, email, description } = contactData;
        const query = 'INSERT INTO contacts (name, email, description) VALUES (?, ?, ?)';

        db.query(query, [name, email, description], (err, result) => {
            if (err) {
                console.error('Error creating contact:', err);
                return callback(err);
            }
            callback(null, { id: result.insertId, ...contactData });
        });
    }

    static getAll(callback) {
        const query = 'SELECT * FROM contacts ORDER BY created_at DESC';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching contacts:', err);
                return callback(err);
            }
            callback(null, results);
        });
    }

    static delete(id, callback) {
        const query = 'DELETE FROM contacts WHERE id = ?';

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error('Error deleting contact:', err);
                return callback(err);
            }
            callback(null, result.affectedRows);
        });
    }
}

// Initialize the table when the model is loaded
Contact.initialize((err) => {
    if (err) throw err;
});

module.exports = Contact;