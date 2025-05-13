const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { registerAdmin, getAdminByEmail, updateResetToken, getAdminByResetToken, updatePassword } = require('../models/adminModel');

router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

    const hashedPassword = await bcrypt.hash(password, 10);
    registerAdmin(name, email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering admin', error: err });
        res.json({ message: 'Registration successful' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    getAdminByEmail(email, async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).json({ message: 'Incorrect password' });

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

// Configure nodemailer
// const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_APP_PASSWORD
//     }
// });
// Configure nodemailer with Sendmail
const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail', // Default path for sendmail on cPanel
    logger: true,
    debug: true
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    getAdminByEmail(email, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        updateResetToken(email, resetToken, expires, async (updateErr) => {
            if (updateErr) {
                console.error('Error updating reset token:', updateErr);
                return res.status(500).json({ message: 'Error generating reset token' });
            }

            try {
                // Send reset password email
                const resetLink = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;
                const mailOptions = {
                    from: 'rajputsighvishal@gmail.com',
                    to: email,
                    subject: 'Password Reset Request',
                    html: `
                        <h1>Password Reset Request</h1>
                        <p>You requested to reset your password. Click the link below to reset it:</p>
                        <a href="${resetLink}">Reset Password</a>
                        <p>This link will expire in 1 hour.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                    `
                };

                await transporter.sendMail(mailOptions);
                res.json({
                    message: 'Password reset link has been sent to your email',
                    resetToken
                });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                res.status(500).json({ message: 'Error sending reset email' });
            }
        });
    });
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    getAdminByResetToken(token, async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const admin = results[0];
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        updatePassword(admin.id, hashedPassword, (updateErr) => {
            if (updateErr) {
                return res.status(500).json({ message: 'Error updating password' });
            }
            res.json({ message: 'Password updated successfully' });
        });
    });
});

// Add a separate route for token validation
router.get('/validate-token/:token', (req, res) => {
    const { token } = req.params;

    getAdminByResetToken(token, (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({
                valid: false,
                message: 'Invalid or expired reset token'
            });
        }
        res.json({
            valid: true,
            message: 'Valid token'
        });
    });
});

module.exports = router;
