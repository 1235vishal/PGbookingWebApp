const express = require('express');
const router = express.Router();
const db = require('../db');
const createTenantTable = require('../models/TenantModel');

// Ensure tenants table is created
createTenantTable();

// Create new tenant
router.post('/create', async (req, res) => {
    try {
        const {
            bookingId,
            userName,
            userPhone,
            pgName,
            pgRent,
            checkInDate,
            selectedRoom
        } = req.body;

        // Get booking details
        const bookingQuery = `
            SELECT user_id, pg_id, id_proof_front, id_proof_back, user_image 
            FROM bookings 
            WHERE id = ?
        `;

        db.query(bookingQuery, [bookingId], (err, bookingResults) => {
            if (err) {
                console.error('Error fetching booking:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching booking details'
                });
            }

            if (bookingResults.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            const booking = bookingResults[0];

            // Insert tenant
            const insertQuery = `
                INSERT INTO tenants (
                    booking_id, user_id, pg_id, room_id, name, 
                    phone, rent, check_in_date, id_proof_front, 
                    id_proof_back, user_image
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                bookingId,
                booking.user_id,
                booking.pg_id,
                selectedRoom,
                userName,
                userPhone,
                pgRent,
                checkInDate,
                booking.id_proof_front,
                booking.id_proof_back,
                booking.user_image
            ];

            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error creating tenant:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error creating tenant'
                    });
                }

                res.status(201).json({
                    success: true,
                    message: 'Tenant created successfully',
                    tenantId: result.insertId
                });
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

// Get available rooms for a specific PG
router.get('/available-rooms/:pgId', (req, res) => {
    const pgId = req.params.pgId;
    const query = `
        SELECT * FROM rooms 
        WHERE pg_id = ? AND room_status = 'available'
        ORDER BY room_number
    `;

    db.query(query, [pgId], (err, results) => {
        if (err) {
            console.error('Error fetching available rooms:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching available rooms'
            });
        }

        res.json({
            success: true,
            rooms: results
        });
    });
});

// Get all tenants
router.get('/all-tenants', (req, res) => {
    const query = `
        SELECT t.*, p.pg_name, r.room_number, r.floor_wing
        FROM tenants t
        JOIN pg_list p ON t.pg_id = p.id
        JOIN rooms r ON t.room_id = r.id
        ORDER BY t.created_at DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tenants:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching tenants'
            });
        }

        res.json({
            success: true,
            tenants: results
        });
    });
});

// Get tenant by user ID
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT t.*, p.pg_name, r.room_number, r.floor_wing
        FROM tenants t
        JOIN pg_list p ON t.pg_id = p.id
        JOIN rooms r ON t.room_id = r.id
        WHERE t.user_id = ? AND t.status = 'active'
        ORDER BY t.created_at DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching tenant:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching tenant data'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tenant found for this user'
            });
        }

        res.json({
            success: true,
            tenants: results // Changed from tenant: results[0] to tenants: results
        });
    });
});

// Delete tenant
router.delete('/delete/:id', (req, res) => {
    const tenantId = req.params.id;
    const query = 'DELETE FROM tenants WHERE id = ?';

    db.query(query, [tenantId], (err, result) => {
        if (err) {
            console.error('Error deleting tenant:', err);
            return res.status(500).json({
                success: false,
                message: 'Error deleting tenant'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tenant not found'
            });
        }

        res.json({
            success: true,
            message: 'Tenant deleted successfully'
        });
    });
});

// Update tenant
router.put('/update/:id', (req, res) => {
    const tenantId = req.params.id;
    const { name, phone, check_in_date, rent } = req.body;

    const query = `
        UPDATE tenants 
        SET name = ?, phone = ?, check_in_date = ?, rent = ?
        WHERE id = ?
    `;

    const values = [name, phone, check_in_date, rent, tenantId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating tenant:', err);
            return res.status(500).json({
                success: false,
                message: 'Error updating tenant'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tenant not found'
            });
        }

        res.json({
            success: true,
            message: 'Tenant updated successfully'
        });
    });
});

module.exports = router;