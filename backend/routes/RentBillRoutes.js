const express = require('express');
const router = express.Router();
const db = require('../db');
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Add this for payment verification
const createRentBillTable = require('../models/RentBillModel');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Ensure rent_bills table is created
createRentBillTable();

// Create new rent bill
router.post('/create', async (req, res) => {
    try {
        const {
            tenant_id,
            tenant_name,
            tenant_phone,
            pg_name,
            room_number,
            due_date,
            amount,
            message
        } = req.body;

        const query = `
            INSERT INTO rent_bills (
                tenant_id, tenant_name, tenant_phone, pg_name,
                room_number, due_date, amount, message
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            tenant_id,
            tenant_name,
            tenant_phone,
            pg_name,
            room_number,
            due_date,
            amount,
            message
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error creating rent bill:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error creating rent bill'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Rent bill created successfully',
                billId: result.insertId
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

// Get rent bills by tenant ID
router.get('/tenant/:tenantId', (req, res) => {
    const tenantId = req.params.tenantId;
    const query = `
        SELECT * FROM rent_bills
        WHERE tenant_id = ?
        ORDER BY created_at DESC
    `;

    db.query(query, [tenantId], (err, results) => {
        if (err) {
            console.error('Error fetching rent bills:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching rent bills'
            });
        }

        res.json({
            success: true,
            bills: results
        });
    });
});

// In your tenants route
router.delete('/delete/:id', (req, res) => {
    const tenantId = req.params.id;

    // First delete related rent bills
    const deleteBillsQuery = 'DELETE FROM rent_bills WHERE tenant_id = ?';

    db.query(deleteBillsQuery, [tenantId], (err, result) => {
        if (err) {
            console.error('Error deleting rent bills:', err);
            return res.status(500).json({
                success: false,
                message: 'Error deleting tenant (could not delete related rent bills)'
            });
        }

        // Then delete the tenant
        const deleteTenantQuery = 'DELETE FROM tenants WHERE id = ?';
        db.query(deleteTenantQuery, [tenantId], (err, result) => {
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
                message: 'Tenant and related rent bills deleted successfully'
            });
        });
    });
});


// Create Razorpay order
router.post('/create-payment/:billId', async (req, res) => {
    try {
        const billId = req.params.billId;
        console.log('Creating payment for bill:', billId);
        
        // Get bill details with promise wrapper
        const getBill = () => {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM rent_bills WHERE id = ?';
                db.query(query, [billId], (err, results) => {
                    if (err) {
                        console.error('Database error when fetching bill:', err);
                        reject(err);
                    } else {
                        console.log('Bill details:', results);
                        resolve(results);
                    }
                });
            });
        };

        const results = await getBill();
        
        if (!results || results.length === 0) {
            console.log('Bill not found for ID:', billId);
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }

        const bill = results[0];
        console.log('Creating Razorpay order for amount:', bill.amount);
        
        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: Math.round(bill.amount * 100), // Convert to paise and ensure it's an integer
            currency: 'INR',
            receipt: `bill_${bill.id}`,
            notes: {
                bill_id: bill.id,
                tenant_id: bill.tenant_id
            }
        });

        console.log('Razorpay order created:', order);

        // Update bill with order ID using promise wrapper
        const updateBill = () => {
            return new Promise((resolve, reject) => {
                const updateQuery = 'UPDATE rent_bills SET razorpay_order_id = ? WHERE id = ?';
                db.query(updateQuery, [order.id, billId], (err, result) => {
                    if (err) {
                        console.error('Database error when updating bill:', err);
                        reject(err);
                    } else {
                        console.log('Bill updated with order ID');
                        resolve(result);
                    }
                });
            });
        };

        await updateBill();

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Detailed payment creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating payment',
            details: error.stack
        });
    }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Create the string to hash
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        
        // Create the signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Update bill status
            const updateQuery = `
                UPDATE rent_bills 
                SET status = 'paid', 
                    razorpay_payment_id = ?,
                    payment_date = CURRENT_TIMESTAMP
                WHERE razorpay_order_id = ?
            `;
            
            db.query(updateQuery, [razorpay_payment_id, razorpay_order_id], (err) => {
                if (err) {
                    console.error('Error updating payment status:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error updating payment status'
                    });
                }

                res.json({
                    success: true,
                    message: 'Payment verified successfully'
                });
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment'
        });
    }
});

// Get all rent bills
router.get('/all', (req, res) => {
    const query = `
        SELECT * FROM rent_bills
        ORDER BY created_at DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching all rent bills:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching rent bills'
            });
        }

        res.json({
            success: true,
            bills: results
        });
    });
});

module.exports = router;