

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { createPGTable, insertPG, updatePG } = require('../models/pgModel');
// const db = require('../db');

// // Ensure table is created
// createPGTable();

// // File upload handling
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/pg'); // Directory to save uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
//     }
// });

// const upload = multer({ storage });

// // ===================== POST: Add New PG ===================== //
// router.post(
//     '/add-pg',
//     upload.fields([
//         { name: 'main_image', maxCount: 1 },
//         { name: 'additional_images', maxCount: 5 },
//         { name: 'video_url', maxCount: 1 }
//     ]),
//     (req, res) => {
//         const {
//             pg_name,
//             pg_type,
//             address,
//             rent_start_from,
//             number_of_floors,
//             latitude,
//             longitude,
//             zone,
//             facilities,
//             description,
//             owner_name,
//             phone_number,
//             email_address
//         } = req.body;

//         const data = {
//             pg_name,
//             pg_type,
//             address,
//             rent_start_from,
//             number_of_floors,
//             latitude,
//             longitude,
//             zone,
//             main_image: req.files['main_image']?.[0]?.filename || null,
//             additional_images: JSON.stringify(req.files['additional_images']?.map(f => f.filename) || []),
//             video_url: req.files['video_url']?.[0]?.filename || null,
//             facilities: facilities ? JSON.stringify(facilities) : null,
//             description,
//             owner_name,
//             phone_number,
//             email_address
//         };

//         insertPG(data, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Error saving PG data" });
//             }
//             res.status(200).json({ message: "PG added successfully!" });
//         });
//     }
// );

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createPGTable, insertPG, updatePG } = require('../models/pgModel');
const db = require('../db');

// Ensure table is created
createPGTable();

// File upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create directory if it doesn't exist
        const dir = 'uploads/pg';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// ===================== POST: Add New PG ===================== //
router.post(
    '/add-pg',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 5 },
        { name: 'video_url', maxCount: 1 }
    ]),
    (req, res) => {
        try {
            console.log('Received files:', req.files); // Debug log
            console.log('Received body:', req.body); // Debug log

            const {
                pg_name,
                pg_type,
                address,
                rent_start_from,
                number_of_floors,
                latitude,
                longitude,
                zone,
                facilities,
                description,
                owner_name,
                phone_number,
                email_address
            } = req.body;

            // Parse facilities if it's a string
            let parsedFacilities = [];
            try {
                parsedFacilities = typeof facilities === 'string' ? JSON.parse(facilities) : facilities || [];
            } catch (e) {
                console.error('Error parsing facilities:', e);
                parsedFacilities = [];
            }

            const data = {
                pg_name,
                pg_type,
                address,
                rent_start_from,
                number_of_floors,
                latitude,
                longitude,
                zone,
                main_image: req.files['main_image']?.[0]?.filename || null,
                additional_images: req.files['additional_images'] ?
                    JSON.stringify(req.files['additional_images'].map(f => f.filename)) :
                    JSON.stringify([]),
                video_url: req.files['video_url']?.[0]?.filename || null,
                facilities: JSON.stringify(parsedFacilities),
                description,
                owner_name,
                phone_number,
                email_address
            };

            insertPG(data, (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        message: "Error saving PG data",
                        error: err.message
                    });
                }
                res.status(200).json({
                    message: "PG added successfully!",
                    pgId: result.insertId
                });
            });
        } catch (err) {
            console.error('Server error:', err);
            res.status(500).json({
                message: "Server error",
                error: err.message
            });
        }
    }
);


// ===================== PUT: Update PG ===================== //
router.put(
    '/update-pg/:id',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 5 },
        { name: 'video_url', maxCount: 1 }
    ]),
    (req, res) => {
        const id = req.params.id;
        const {
            pg_name,
            pg_type,
            address,
            rent_start_from,
            number_of_floors,
            latitude,
            longitude,
            zone,
            facilities,
            description,
            owner_name,
            phone_number,
            email_address
        } = req.body;

        // First get current media to handle updates properly
        db.query('SELECT main_image, additional_images, video_url FROM pg_list WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ message: "Error fetching current PG data" });

            const currentData = results[0];
            let mainImage = currentData.main_image;
            let additionalImages = currentData.additional_images ? JSON.parse(currentData.additional_images) : [];
            let videoUrl = currentData.video_url;

            // Handle new main image upload
            if (req.files['main_image']) {
                // Delete old main image if exists
                if (mainImage) {
                    try {
                        fs.unlinkSync(path.join('uploads/pg', mainImage));
                    } catch (err) {
                        console.error('Error deleting old main image:', err);
                    }
                }
                mainImage = req.files['main_image'][0].filename;
            }

            // Handle new additional images
            if (req.files['additional_images']) {
                additionalImages = [
                    ...additionalImages,
                    ...req.files['additional_images'].map(f => f.filename)
                ];
            }

            // Handle new video upload
            if (req.files['video_url']) {
                // Delete old video if exists
                if (videoUrl) {
                    try {
                        fs.unlinkSync(path.join('uploads/pg', videoUrl));
                    } catch (err) {
                        console.error('Error deleting old video:', err);
                    }
                }
                videoUrl = req.files['video_url'][0].filename;
            }

            const data = {
                pg_name,
                pg_type,
                address,
                rent_start_from,
                number_of_floors,
                latitude,
                longitude,
                zone,
                main_image: mainImage,
                additional_images: JSON.stringify(additionalImages),
                video_url: videoUrl,
                facilities: facilities ? JSON.stringify(facilities) : null,
                description,
                owner_name,
                phone_number,
                email_address
            };

            updatePG(id, data, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error updating PG data" });
                }
                res.status(200).json({ message: "PG updated successfully!" });
            });
        });
    }
);

// ===================== POST: Delete Media ===================== //
router.post('/delete-media/:id', (req, res) => {
    const id = req.params.id;
    const { type, filename } = req.body;

    // First get the current media data
    db.query('SELECT main_image, additional_images, video_url FROM pg_list WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching PG data" });
        if (results.length === 0) return res.status(404).json({ message: "PG not found" });

        const currentData = results[0];
        let updateQuery = '';
        let updateValues = [];
        let fileToDelete = '';

        if (type === 'main_image') {
            fileToDelete = currentData.main_image;
            updateQuery = 'UPDATE pg_list SET main_image = NULL WHERE id = ?';
            updateValues = [id];
        } else if (type === 'video_url') {
            fileToDelete = currentData.video_url;
            updateQuery = 'UPDATE pg_list SET video_url = NULL WHERE id = ?';
            updateValues = [id];
        } else if (type === 'additional_images') {
            const additionalImages = currentData.additional_images ? JSON.parse(currentData.additional_images) : [];
            const updatedImages = additionalImages.filter(img => img !== filename);
            fileToDelete = filename;
            updateQuery = 'UPDATE pg_list SET additional_images = ? WHERE id = ?';
            updateValues = [JSON.stringify(updatedImages), id];
        }

        // Delete the file from server
        if (fileToDelete) {
            try {
                fs.unlinkSync(path.join('uploads/pg', fileToDelete));
            } catch (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: "Error deleting file" });
            }
        }

        // Update the database
        db.query(updateQuery, updateValues, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error updating PG data" });
            }
            res.status(200).json({ message: "Media deleted successfully" });
        });
    });
});

// ===================== GET: All PGs ===================== //
router.get('/get-all-pgs', async (req, res) => {
    db.query('SELECT id, pg_name, pg_type, rent_start_from, zone, address, owner_name, latitude, longitude, main_image, facilities FROM pg_list ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Error fetching PGs:', err);
            return res.status(500).json({ error: 'Failed to fetch PGs' });
        }

        // Convert facilities string to array for each PG
        const pgsWithParsedFacilities = results.map(pg => ({
            ...pg,
            facilities: pg.facilities ? pg.facilities.split(',').map(f => f.trim()) : []
        }));

        res.json(pgsWithParsedFacilities);
    });
});

// ===================== GET: PG Full by ID ===================== //
// Update the get-pg-full/:id route to parse facilities before sending
router.get('/get-pg-full/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM pg_list WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching PG data' });
        if (results.length === 0) return res.status(404).json({ error: 'PG not found' });

        // Parse facilities if it exists and is a string
        const pgData = results[0];
        try {
            if (pgData.facilities) {
                // Handle both JSON string and comma-separated string formats
                if (pgData.facilities.startsWith('[')) {
                    pgData.facilities = JSON.parse(pgData.facilities);
                } else {
                    // Convert comma-separated string to array
                    pgData.facilities = pgData.facilities.split(',').map(item => item.trim());
                }
            } else {
                pgData.facilities = [];
            }
        } catch (error) {
            console.error('Error parsing facilities:', error);
            pgData.facilities = [];
        }

        res.json(pgData);
    });
});

// Update the update route to handle all fields
router.put(
    '/update-pg/:id',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 5 },
        { name: 'video_url', maxCount: 1 }
    ]),
    (req, res) => {
        const id = req.params.id;
        const {
            pg_name,
            pg_type,
            address,
            rent_start_from,
            number_of_floors,
            latitude,
            longitude,
            zone,
            facilities,
            description,
            owner_name,
            phone_number,
            email_address
        } = req.body;

        const updatedData = {
            pg_name,
            pg_type,
            address,
            rent_start_from,
            number_of_floors,
            latitude,
            longitude,
            zone,
            facilities: Array.isArray(facilities) ? JSON.stringify(facilities) : facilities,
            description,
            owner_name,
            phone_number,
            email_address
        };

        // Add files if they exist
        if (req.files?.main_image) {
            updatedData.main_image = req.files.main_image[0].filename;
        }
        if (req.files?.video_url) {
            updatedData.video_url = req.files.video_url[0].filename;
        }
        if (req.files?.additional_images) {
            updatedData.additional_images = JSON.stringify(
                req.files.additional_images.map(file => file.filename)
            );
        }

        // Use the updatePG function from pgModel
        const { updatePG } = require('../models/pgModel');
        updatePG(id, updatedData, (err, result) => {
            if (err) {
                console.error('Error updating PG:', err);
                return res.status(500).json({ error: 'Failed to update PG' });
            }
            res.json({ message: 'PG updated successfully' });
        });
    }
);

// ===================== DELETE: PG by ID ===================== //
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    // First get the media files to delete them from server
    db.query('SELECT main_image, additional_images, video_url FROM pg_list WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching PG media:', err);
            return res.status(500).json({ error: 'Failed to fetch PG media' });
        }

        if (results.length > 0) {
            const pgData = results[0];

            // Delete main image if exists
            if (pgData.main_image) {
                try {
                    fs.unlinkSync(path.join('uploads/pg', pgData.main_image));
                } catch (err) {
                    console.error('Error deleting main image:', err);
                }
            }

            // Delete additional images if exist
            if (pgData.additional_images) {
                try {
                    const additionalImages = JSON.parse(pgData.additional_images);
                    additionalImages.forEach(img => {
                        try {
                            fs.unlinkSync(path.join('uploads/pg', img));
                        } catch (err) {
                            console.error('Error deleting additional image:', err);
                        }
                    });
                } catch (err) {
                    console.error('Error parsing additional images:', err);
                }
            }

            // Delete video if exists
            if (pgData.video_url) {
                try {
                    fs.unlinkSync(path.join('uploads/pg', pgData.video_url));
                } catch (err) {
                    console.error('Error deleting video:', err);
                }
            }
        }

        // Now delete the PG record
        db.query('DELETE FROM pg_list WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error('Error deleting PG:', err);
                return res.status(500).json({ error: 'Failed to delete PG' });
            }
            res.json({ message: 'PG deleted successfully' });
        });
    });
});

// ===================== GET: PG Count ===================== //
router.get('/count', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total FROM pg_list';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching PG count:', err);
            return res.status(500).json({ message: 'Error fetching PG count' });
        }
        res.json({ total: result[0].total });
    });
});

module.exports = router;