

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const createUserTable = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Ensure users table is created
createUserTable();

// Set up multer for profile image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/profile_images'); // Destination folder for profile images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Saving file with a unique name
    }
});
const upload = multer({ storage: storage });

// User Registration Route (with file upload handling)
router.post('/register', upload.single('profileImage'), (req, res) => {
    const { name, email, phone, gender, password } = req.body;
    const profileImage = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Check if all required fields are provided
    if (!name || !email || !phone || !password || !profileImage) {
        return res.status(400).send('Please fill in all fields.');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password.');
        }

        // Insert user data into the users table
        const query = `
          INSERT INTO users (name, email, phone, gender, profileImage, password)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [name, email, phone, gender, profileImage, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send('Error saving user data.');
            }
            res.status(201).send('User registered successfully!');
        });
    });
});

// User Login Route
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
//     }

//     const query = 'SELECT * FROM users WHERE email = ?';
//     db.query(query, [email], (err, result) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: 'Error retrieving user data.' });
//         }

//         if (result.length === 0) {
//             return res.status(400).json({ success: false, message: 'Invalid email or password.' });
//         }

//         const user = result[0];

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error comparing passwords.' });
//             }

//             if (!isMatch) {
//                 return res.status(400).json({ success: false, message: 'Invalid email or password.' });
//             }

//             res.status(200).json({ success: true, message: 'Login successful!' });
//         });
//     });
// });
// User Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error retrieving user data.' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error comparing passwords.' });
            }

            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Invalid email or password.' });
            }

            // ✅ Send back basic user info on success
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage
            };

            res.status(200).json({
                success: true,
                message: 'Login successful!',
                user: userData
            });
        });
    });
});

// In userRoutes.js
router.get('/profile/:id', (req, res) => {
    const userId = req.params.id;
    console.log("Received userId:", userId); // Log the received userId

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error retrieving user data:", err); // Log any error
            return res.status(500).json({ success: false, message: 'Error retrieving user data.' });
        }

        if (result.length === 0) {
            console.log("User not found for ID:", userId); // Log if no user found
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = result[0];

        const formattedDate = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Date not available';

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                profileImage: user.profileImage,
                created_at: user.created_at,
                password: user.password
            }
        });
    });
});

router.put('/profile/:id', upload.single('profileImage'), (req, res) => {
    const userId = req.params.id;
    const { name, phone, gender, newPassword } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const updateFields = [];
    const updateValues = [];

    if (name) {
        updateFields.push('name = ?');
        updateValues.push(name);
    }
    if (phone) {
        updateFields.push('phone = ?');
        updateValues.push(phone);
    }
    if (gender) {
        updateFields.push('gender = ?');
        updateValues.push(gender);
    }
    if (profileImage) {
        updateFields.push('profileImage = ?');
        updateValues.push(profileImage);
    }

    const updateUser = () => {
        if (updateFields.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update.' });
        }

        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(userId);

        db.query(query, updateValues, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating user profile.' });
            }
            
            // Fetch and return updated user data
            db.query('SELECT id, name, email, phone, gender, profileImage FROM users WHERE id = ?', [userId], (err, results) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error fetching updated user data.' });
                }
                return res.status(200).json({ 
                    success: true, 
                    message: 'Profile updated successfully!',
                    user: results[0]
                });
            });
        });
    };

    // If password needs to be changed
    if (newPassword) {
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ success: false, message: 'Error hashing password.' });

            updateFields.push('password = ?');
            updateValues.push(hashedPassword);
            updateUser();
        });
    } else {
        updateUser();
    }
});



module.exports = router;
