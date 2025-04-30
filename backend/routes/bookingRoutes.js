const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const createBookingTable = require('../models/BookingModel');

// Ensure bookings table is created
createBookingTable();

// Set up multer for document uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/booking_documents');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create booking route with multiple file uploads
// router.post('/create/:pgId', upload.fields([
//     { name: 'idProofFront', maxCount: 1 },
//     { name: 'idProofBack', maxCount: 1 },
//     { name: 'userImage', maxCount: 1 }
// ]), (req, res) => {
//     const pgId = req.params.pgId;
//     const { name, phone, rent, checkInDate } = req.body;
//     const userId = JSON.parse(req.body.user).id;

//     // Get file paths
//     const idProofFront = req.files.idProofFront[0].path;
//     const idProofBack = req.files.idProofBack[0].path;
//     const userImage = req.files.userImage[0].path;

//     const query = `
//         INSERT INTO bookings 
//         (user_id, pg_id, name, phone, rent, check_in_date, id_proof_front, id_proof_back, user_image)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//         query,
//         [userId, pgId, name, phone, rent, checkInDate, idProofFront, idProofBack, userImage],
//         (err, result) => {
//             if (err) {
//                 console.error('Error creating booking:', err);
//                 return res.status(500).json({ success: false, message: 'Error creating booking' });
//             }
//             res.status(201).json({ success: true, message: 'Booking created successfully', bookingId: result.insertId });
//         }
//     );
// });
// Update the create booking route
router.post('/create/:pgId', upload.fields([
    { name: 'idProofFront', maxCount: 1 },
    { name: 'idProofBack', maxCount: 1 },
    { name: 'userImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const pgId = req.params.pgId;
        const { name, phone, rent, checkInDate, userId } = req.body;

        // Validate required fields
        if (!name || !phone || !rent || !checkInDate || !userId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate files were uploaded
        if (!req.files?.idProofFront?.[0] || !req.files?.idProofBack?.[0] || !req.files?.userImage?.[0]) {
            return res.status(400).json({
                success: false,
                message: 'All documents are required'
            });
        }

        const query = `
            INSERT INTO bookings 
            (user_id, pg_id, name, phone, rent, check_in_date, id_proof_front, id_proof_back, user_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            userId,
            pgId,
            name,
            phone,
            rent,
            checkInDate,
            req.files.idProofFront[0].path,
            req.files.idProofBack[0].path,
            req.files.userImage[0].path
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                bookingId: result.insertId
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
// Get user's booking history
// router.get('/history/:userId', (req, res) => {
//     const userId = req.params.userId;

//     const query = `
//         SELECT b.*, p.pg_name, p.main_image as pg_image
//         FROM bookings b
//         JOIN pgs p ON b.pg_id = p.id
//         WHERE b.user_id = ?
//         ORDER BY b.created_at DESC
//     `;

//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             console.error('Error fetching booking history:', err);
//             return res.status(500).json({ success: false, message: 'Error fetching booking history' });
//         }
//         res.json({ success: true, bookings: results });
//     });
// });
// Update the booking history route to use pg_list instead of pgs
router.get('/history/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT b.*, pl.pg_name, pl.main_image as pg_image
        FROM bookings b
        JOIN pg_list pl ON b.pg_id = pl.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching booking history:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching booking history',
                error: err.message
            });
        }
        res.json({ success: true, bookings: results });
    });
});

// Add these new routes to your existing bookingRoutes.js

// Get all bookings
// router.get('/all', (req, res) => {
//     const query = `
//         SELECT b.*, p.name as pg_name 
//         FROM bookings b
//         JOIN pg_list p ON b.pg_id = p.id
//         ORDER BY b.created_at DESC
//     `;

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching all bookings:', err);
//             return res.status(500).json({ success: false, message: 'Error fetching bookings' });
//         }
//         res.json({ success: true, bookings: results });
//     });
// });
// Get all bookings
router.get('/all', (req, res) => {
    const query = `
        SELECT b.*, pl.pg_name, pl.main_image as pg_image
        FROM bookings b
        JOIN pg_list pl ON b.pg_id = pl.id
        ORDER BY b.created_at DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching all bookings:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching bookings',
                error: err.message
            });
        }
        res.json({ success: true, bookings: results });
    });
});

// Add this route for fetching a single booking
router.get('/:id', (req, res) => {
    const bookingId = req.params.id;
    const query = `
        SELECT b.*, pl.pg_name, pl.main_image as pg_image
        FROM bookings b
        JOIN pg_list pl ON b.pg_id = pl.id
        WHERE b.id = ?
    `;

    db.query(query, [bookingId], (err, results) => {
        if (err) {
            console.error('Error fetching booking:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching booking',
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            booking: results[0]
        });
    });
});
// Delete booking
router.delete('/delete/:id', (req, res) => {
    const bookingId = req.params.id;

    const query = 'DELETE FROM bookings WHERE id = ?';

    db.query(query, [bookingId], (err, result) => {
        if (err) {
            console.error('Error deleting booking:', err);
            return res.status(500).json({ success: false, message: 'Error deleting booking' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({ success: true, message: 'Booking deleted successfully' });
    });
});



// Update booking status
router.put('/update-status/:id', (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status value'
        });
    }

    const query = 'UPDATE bookings SET booking_status = ? WHERE id = ?';

    db.query(query, [status, bookingId], (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return res.status(500).json({
                success: false,
                message: 'Error updating booking status',
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: `Booking ${status} successfully`
        });
    });
});

module.exports = router;