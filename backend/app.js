const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./models/adminModel');
const adminRoute = require('./routes/adminRoutes');
const zoneRoute = require('./routes/zoneRoute');
const pgRoutes = require('./routes/pgRoutes');
const userRoutes = require("./routes/userRoutes");
const Contact = require('./models/contactModel');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tenantRoutes = require('./routes/TenantRoutes');
const roomRoutes = require('./routes/RoomRoutes');
const rentBillRoutes = require('./routes/RentBillRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const whatsappNumberRoutes = require('./routes/whatsappNumber');



// Configure CORS
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'razorpay-signature', 'x-razorpay-signature'],
    exposedHeaders: ['razorpay-signature', 'x-razorpay-signature']
}));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // For serving media
app.use('/uploads/pg', express.static('uploads/pg'));
app.use('"/api/uploads', express.static('uploads')); // For serving media
app.use('"/api/uploads/pg', express.static('uploads/pg'));


app.use('/api/tenants', tenantRoutes);

app.use('/api/admin', adminRoute);
app.use('/api/zone', zoneRoute);
app.use('/api/pg', pgRoutes);
app.use("/api/user", userRoutes);
app.use('/api/contact', contactRoutes);
// Add this line with your other route configurations
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/rent-bills', rentBillRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api', whatsappNumberRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

