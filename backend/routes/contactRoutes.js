// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/contactModel');

// router.post('/', (req, res) => {
//     const { name, email, description } = req.body;

//     if (!name || !email || !description) {
//         return res.status(400).json({
//             success: false,
//             message: 'All fields are required'
//         });
//     }

//     Contact.create({ name, email, description }, (err, newContact) => {
//         if (err) {
//             console.error('Error submitting contact form:', err);
//             return res.status(500).json({
//                 success: false,
//                 message: 'Error submitting contact form',
//                 error: err.message
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Contact form submitted successfully!',
//             data: newContact
//         });
//     });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const db = require('../db');
// Get all contacts
router.get('/', (req, res) => {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching contacts',
                error: err.message
            });
        }

        res.status(200).json(results);
    });
});

// Submit contact form
router.post('/', (req, res) => {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    Contact.create({ name, email, description }, (err, newContact) => {
        if (err) {
            console.error('Error submitting contact form:', err);
            return res.status(500).json({
                success: false,
                message: 'Error submitting contact form',
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully!',
            data: newContact
        });
    });
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contacts WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact:', err);
            return res.status(500).json({
                success: false,
                message: 'Error deleting contact',
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    });
});

// Get total count of contact leads
router.get('/count', (req, res) => {
    const query = 'SELECT COUNT(*) as total FROM contacts';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error counting contacts:', err);
            return res.status(500).json({
                success: false,
                message: 'Error counting contacts',
                error: err.message
            });
        }

        res.status(200).json({ total: results[0].total });
    });
});

module.exports = router;