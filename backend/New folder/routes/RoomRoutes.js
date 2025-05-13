const express = require('express');
const router = express.Router();
const { createRoomTable, insertRoom, updateRoom, getRoomStats } = require('../models/RoomModel');
const db = require('../db');

// Ensure table is created
createRoomTable();

// Get PG Details for Dropdown
router.get('/get-pgs', (req, res) => {
    const sql = 'SELECT id, pg_name, number_of_floors, rent_start_from FROM pg_list';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching PGs:', err);
            return res.status(500).json({ error: 'Failed to fetch PGs' });
        }
        res.json(results);
    });
});

// Add New Room
router.post('/add-room', (req, res) => {
    try {
        const {
            pg_id,
            room_number,
            floor_wing,
            room_type,
            base_rent,
            room_status,
            notes
        } = req.body;

        const roomData = {
            pg_id,
            room_number,
            floor_wing,
            room_type,
            base_rent,
            room_status,
            notes
        };

        insertRoom(roomData, (err, result) => {
            if (err) {
                console.error('Error adding room:', err);
                return res.status(500).json({ error: 'Failed to add room' });
            }
            res.status(200).json({
                message: 'Room added successfully',
                roomId: result.insertId
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Rooms with PG Details
router.get('/get-rooms', (req, res) => {
    const sql = `
        SELECT r.*, p.pg_name 
        FROM rooms r 
        JOIN pg_list p ON r.pg_id = p.id 
        ORDER BY r.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching rooms:', err);
            return res.status(500).json({ error: 'Failed to fetch rooms' });
        }
        res.json(results);
    });
});

// Delete Room
router.delete('/delete/:id', (req, res) => {
    const roomId = req.params.id;
    const sql = 'DELETE FROM rooms WHERE id = ?';

    db.query(sql, [roomId], (err, result) => {
        if (err) {
            console.error('Error deleting room:', err);
            return res.status(500).json({ error: 'Failed to delete room' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    });
});

// Get Single Room Details
router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const sql = `
        SELECT r.*, p.pg_name 
        FROM rooms r 
        JOIN pg_list p ON r.pg_id = p.id 
        WHERE r.id = ?
    `;

    db.query(sql, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room:', err);
            return res.status(500).json({ error: 'Failed to fetch room' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(results[0]);
    });
});

// Update Room
router.put('/update/:id', (req, res) => {
    const roomId = req.params.id;
    const {
        pg_id,
        room_number,
        floor_wing,
        room_type,
        base_rent,
        room_status,
        notes
    } = req.body;

    const sql = `
        UPDATE rooms 
        SET pg_id = ?, room_number = ?, floor_wing = ?, 
            room_type = ?, base_rent = ?, room_status = ?, 
            notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const values = [pg_id, room_number, floor_wing, room_type, base_rent, room_status, notes, roomId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating room:', err);
            return res.status(500).json({ error: 'Failed to update room' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room updated successfully' });
    });
});


// Get room statistics for a specific PG
router.get('/pg-stats/:pgId', (req, res) => {
    const pgId = req.params.pgId;
    const sql = `
        SELECT 
            p.pg_name,
            COUNT(*) as totalRooms,
            SUM(CASE WHEN r.room_status = 'Available' THEN 1 ELSE 0 END) as availableRooms,
            SUM(CASE WHEN r.room_status = 'Booked' THEN 1 ELSE 0 END) as bookedRooms
        FROM rooms r
        JOIN pg_list p ON r.pg_id = p.id
        WHERE r.pg_id = ?
        GROUP BY p.pg_name
    `;

    db.query(sql, [pgId], (err, results) => {
        if (err) {
            console.error('Error fetching PG room stats:', err);
            return res.status(500).json({ success: false, error: 'Failed to fetch PG room stats' });
        }

        if (results.length === 0) {
            // If no rooms found for this PG, return default values
            const pgNameSql = 'SELECT pg_name FROM pg_list WHERE id = ?';
            db.query(pgNameSql, [pgId], (err, pgResults) => {
                if (err || pgResults.length === 0) {
                    return res.json({
                        success: true,
                        pgName: 'Unknown PG',
                        totalRooms: 0,
                        availableRooms: 0,
                        bookedRooms: 0
                    });
                }
                return res.json({
                    success: true,
                    pgName: pgResults[0].pg_name,
                    totalRooms: 0,
                    availableRooms: 0,
                    bookedRooms: 0
                });
            });
        } else {
            res.json({
                success: true,
                pgName: results[0].pg_name,
                totalRooms: results[0].totalRooms,
                availableRooms: results[0].availableRooms,
                bookedRooms: results[0].bookedRooms
            });
        }
    });
});



router.put('/update-status/:id', (req, res) => {
    const roomId = req.params.id;
    const { status } = req.body;

    const sql = `
        UPDATE rooms 
        SET room_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.query(sql, [status, roomId], (err, result) => {
        if (err) {
            console.error('Error updating room status:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to update room status' 
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Room not found' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Room status updated successfully' 
        });
    });
});

router.get('/available/:pgId', (req, res) => {
    const pgId = req.params.pgId;
    const sql = `
        SELECT r.*, p.pg_name 
        FROM rooms r 
        JOIN pg_list p ON r.pg_id = p.id 
        WHERE r.pg_id = ? AND LOWER(r.room_status) = 'available'
        ORDER BY r.room_number
    `;

    db.query(sql, [pgId], (err, results) => {
        if (err) {
            console.error('Error fetching available rooms:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch available rooms' 
            });
        }
        res.json({ 
            success: true, 
            rooms: results 
        });
    });
});

module.exports = router;