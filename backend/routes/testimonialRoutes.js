const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Testimonial = require('../models/testimonial');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/testimonials');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create new testimonial
// router.post('/', upload.single('image'), (req, res) => {
//     const testimonialData = {
//         name: req.body.name,
//         rating: parseFloat(req.body.rating),
//         review: req.body.review,
//         image: req.file ? `/uploads/testimonials/${req.file.filename}` : ''
//     };

//     // Testimonial.create(testimonialData, (err, result) => {
//     //     if (err) {
//     //         console.error('Error creating testimonial:', err);
//     //         return res.status(500).json({ success: false, message: 'Error creating testimonial' });
//     //     }
//     //     res.json({ success: true, message: 'Testimonial created successfully', id: result.insertId });
//     // });
//     Testimonial.create(testimonialData, (err, result) => {
//         if (err) {
//             console.error('Error creating testimonial:', err);
//             return res.status(500).json({ success: false, message: 'Error creating testimonial' });
//         }
//         res.json({
//             success: true,
//             message: 'Testimonial created successfully',
//             testimonial: {
//                 id: result.insertId,
//                 ...testimonialData
//             }
//         });
//     });
// });
// In your testimonials route file
router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.body.name || !req.body.rating || !req.body.review) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const testimonialData = {
            name: req.body.name,
            rating: parseFloat(req.body.rating),
            review: req.body.review,
            image: req.file ? `/uploads/testimonials/${req.file.filename}` : ''
        };

        Testimonial.create(testimonialData, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Testimonial created successfully',
                testimonial: {
                    id: result.insertId,
                    ...testimonialData
                }
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get all testimonials
router.get('/', (req, res) => {
    Testimonial.getAll((err, results) => {
        if (err) {
            console.error('Error fetching testimonials:', err);
            return res.status(500).json({ success: false, message: 'Error fetching testimonials' });
        }
        res.json({ success: true, testimonials: results });
    });
});

// Get single testimonial
router.get('/:id', (req, res) => {
    Testimonial.getById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error fetching testimonial' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.json({ success: true, testimonial: results[0] });
    });
});

// Update testimonial
router.put('/:id', upload.single('image'), (req, res) => {
    const testimonialData = {
        name: req.body.name,
        rating: parseFloat(req.body.rating),
        review: req.body.review,
        image: req.file ? `/uploads/testimonials/${req.file.filename}` : req.body.existingImage
    };

    Testimonial.update(req.params.id, testimonialData, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error updating testimonial' });
        }
        res.json({ success: true, message: 'Testimonial updated successfully' });
    });
});

// Delete testimonial
router.delete('/:id', (req, res) => {
    Testimonial.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error deleting testimonial' });
        }
        res.json({ success: true, message: 'Testimonial deleted successfully' });
    });
});

module.exports = router;