# 🏠 PG Booking Website

A full-stack PG (Paying Guest) booking platform with **Admin and User dashboards**, live map integration, automated rent billing, and WhatsApp chat functionality.

---

## 🔑 Key Features

### 👤 User Side:
- 🔐 **Authentication**: Secure user registration & login.
- 🗺️ **Live PG Map**: Users can view PGs on an interactive map using **latitude/longitude**.
- 📍 **Zone Filtering**: Easily filter PGs based on zones.
- 📝 **PG Booking**: Authenticated users can book rooms.
- 👁️ **Booking Status**: View booking status updates in the dashboard.
- 💸 **Rent Payment**: Pay rent via Razorpay from the user dashboard.
- 📜 **Payment History**: Track all rent payments.
- 💬 **WhatsApp Chat**: Directly message PG admin via WhatsApp.

---

### 🛠️ Admin Side:
- ➕ **Add New PG**: Create PG entries with zone, address, lat/lng for map display.
- 🛏️ **Add Rooms**: Assign multiple rooms to each PG with availability status.
- 📩 **Booking Requests**: View and approve user bookings.
- 🧾 **Tenant Management**: Convert bookings into tenants and manage tenant data.
- 🧾 **Generate Rent Bills**: Auto-generate bills for tenants and push to their dashboards.
- 💰 **Rent Collection**: Collect payments using integrated **Razorpay**.
- 📊 **Payment History**: Track rent transactions for each tenant.
- 💬 **Tenant Chat**: Communicate with tenants directly using WhatsApp Web automation.

---

## 🧰 Tech Stack

- **Frontend**: ReactJS, EJS (for Admin Dashboard)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Map Integration**: Leaflet.js
- **Payment Gateway**: Razorpay
- **Chat Integration**: WhatsApp via Puppeteer Automation
- **Authentication**: Session-based login
- **Deployment**: (e.g., cPanel, Render, or Vercel for frontend)

---

## 📁 Project Structure (Simplified)

