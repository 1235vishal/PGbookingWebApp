const mysql = require('mysql2');
const db = require('../db');

// Create testimonials table if it doesn't exist
const createTestimonialsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS testimonials (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            image VARCHAR(255) NOT NULL,
            rating DECIMAL(2,1) NOT NULL,
            review TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating testimonials table:', err);
        } else {
            console.log('Testimonials table checked/created successfully');
        }
    });
};

// Initialize table
createTestimonialsTable();

// Testimonial model methods
const Testimonial = {
    create: (testimonialData, callback) => {
        const sql = 'INSERT INTO testimonials (name, image, rating, review) VALUES (?, ?, ?, ?)';
        db.query(sql, [testimonialData.name, testimonialData.image, testimonialData.rating, testimonialData.review], callback);
    },

    getAll: (callback) => {
        const sql = 'SELECT * FROM testimonials ORDER BY created_at DESC';
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM testimonials WHERE id = ?';
        db.query(sql, [id], callback);
    },

    update: (id, testimonialData, callback) => {
        const sql = 'UPDATE testimonials SET name = ?, image = ?, rating = ?, review = ? WHERE id = ?';
        db.query(sql, [testimonialData.name, testimonialData.image, testimonialData.rating, testimonialData.review, id], callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM testimonials WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Testimonial;