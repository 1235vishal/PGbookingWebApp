const express = require('express');
const router = express.Router();
const db = require('../db');
const Zone = require('../models/Zone');

// Create table if not exists
Zone.createTable();

// Add zone
router.post('/add', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Zone name required' });

    const sql = 'INSERT INTO zones (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding zone' });
        res.json({ message: 'Zone added successfully' });
    });
});

// Get all zones
router.get('/all', (req, res) => {
    db.query('SELECT * FROM zones ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching zones' });
        res.json(results);
    });
});

// Delete zone
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM zones WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting zone' });
        res.json({ message: 'Zone deleted successfully' });
    });
});
// Get total number of zones
router.get('/count', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM zones', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching total zones' });
        res.json({ total: results[0].total });
    });
});

// GET all zones
router.get('/', (req, res) => {
    db.query('SELECT * FROM zones', (err, results) => {
        if (err) {
            console.error('Error fetching zones:', err);
            return res.status(500).json({ error: 'Failed to fetch zones' });
        }
        res.json(results);
    });
});

module.exports = router;
