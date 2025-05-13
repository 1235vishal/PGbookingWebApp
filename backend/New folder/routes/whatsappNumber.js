const express = require('express');
const router = express.Router();
const WhatsappNumber = require('../models/whatsappNumber');

// Get current WhatsApp number
router.get('/admin/whatsapp-number', (req, res) => {
    WhatsappNumber.getCurrentNumber((error, number) => {
        if (error) {
            console.error('Error fetching WhatsApp number:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch WhatsApp number'
            });
        }
        res.json({
            success: true,
            number: number
        });
    });
});

// Update WhatsApp number
router.post('/admin/whatsapp-number', (req, res) => {
    const { number } = req.body;

    if (!number) {
        return res.status(400).json({
            success: false,
            message: 'WhatsApp number is required'
        });
    }

    WhatsappNumber.updateNumber(number, (error) => {
        if (error) {
            console.error('Error updating WhatsApp number:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update WhatsApp number'
            });
        }
        res.json({
            success: true,
            message: 'WhatsApp number updated successfully'
        });
    });
});

// Delete WhatsApp number
router.delete('/admin/whatsapp-number', (req, res) => {
    WhatsappNumber.deleteNumber((error) => {
        if (error) {
            console.error('Error deleting WhatsApp number:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete WhatsApp number'
            });
        }
        res.json({
            success: true,
            message: 'WhatsApp number deleted successfully'
        });
    });
});

module.exports = router;