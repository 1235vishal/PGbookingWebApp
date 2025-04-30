
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminRegister from './Admin/AdminRegister';
import AdminZone from './Admin/AdminZone';
import BookingUser from './Admin/BookingUser';
import AdminLayout from './Admin/Components/AdminLayout';
import ContactLeads from './Admin/ContactLeads';
import ForgotPassword from './Admin/ForgotPassword';
import MakeTenant from './Admin/MakeTenant';
import Message from './Admin/Message'; // Add this import
import Addpg from './Admin/Newpg/Addpg';
import EditPg from './Admin/Newpg/EditPg';
import PgTable from './Admin/Newpg/pgTable';
import AddRoom from './Admin/PGroom/AddRoom';
import EditRoom from './Admin/PGroom/EditRoom';
import PGRoomTable from './Admin/PGroom/PGRoomTable';
import RentBill from './Admin/RentBill'; // Make sure this component exists
import ResetPassword from './Admin/ResetPassword'; // Add this import
import TenantDetails from './Admin/TenantDetails';
import TenantRentHistory from './Admin/TenantRentHistory';
import TenantTable from './Admin/TenantTable';
import AdminTestimonials from './Admin/Testimonials/AdminTestimonials';
import WhatsAppButton from './Components/WhatsAppButton';
import About from './Pages/About';
import Pgdetails from "./pages/Components/Pgdetails";
import PgMap from './Pages/Components/PgMap';
import PgRooms from "./pages/Components/PgRooms";
import Testimonials from './Pages/Components/Testimonials';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import PgBooking from './Pages/PgBooking';
import PgListings from './Pages/PgListings/PgListings';
import ScrollToTop from './Pages/ScrollToTop'; // import it
import BookingHistory from './User/BookingHistory';
import RentHistory from './User/ChatBox';
import UserLogin from './User/Login';
import Rents from './User/Rents';
import Tenant from './User/Tenant';
import UserProfile from './User/UserProfile';
import UserRegister from './User/UserRegister';

function App() {
    return (
    <Router>
          <WhatsAppButton />
          <ScrollToTop />
      <Routes>
        {/* Non-admin routes */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/pg-map" element={<><Navbar /><PgMap /></>} />
        <Route path="/pg-rooms" element={<><Navbar /><PgRooms /></>} />
        <Route path="/pg/:id/details" element={ <><Navbar /><Pgdetails /></>} />
        <Route path="/pg/:id/booking" element={<><Navbar /><PgBooking /></>} />
        <Route path="/testimonials" element={<><Navbar /><Testimonials /></>} />
        <Route path='/About' element={<><Navbar /><About /> </>} />
        <Route path='/Contact' element={<><Navbar /><Contact /></>} />
        <Route path="/pg-listings" element={<><Navbar /><PgListings /></>} />
        
        {/* User Routes with Navbar */}
        <Route path="/user/login" element={<><Navbar /><UserLogin /></>} />
        <Route path="/user/register" element={<><Navbar /><UserRegister /></>} />
        <Route path="/user/booking-history" element={<><Navbar /><BookingHistory /></>} />
        <Route path="/user/profile" element={<><Navbar /><UserProfile /></>} />
        <Route path="/user/rent-history" element={<><Navbar /><RentHistory /></>} />
        <Route path="/user/Tenant" element={<><Navbar /><Tenant /></>} />
        <Route path="/user/Rents" element={<><Navbar /><Rents /></>} />

        {/* Admin Routes (No Navbar for Admin) */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><Message /></AdminLayout>} /> {/* Add this route */}
        <Route path="/admin/rent-history" element={<AdminLayout><TenantRentHistory /></AdminLayout>} />
        <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
        <Route path="/admin/zones" element={<AdminLayout><AdminZone /></AdminLayout>} />
        <Route path="/admin/pg/table" element={<AdminLayout><PgTable /></AdminLayout>} />
        <Route path="/admin/contact-leads" element={<AdminLayout><ContactLeads /></AdminLayout>} />
        <Route path="/admin/pg/new" element={<AdminLayout><Addpg /></AdminLayout>} />
        <Route path="/admin/pg/edit/:id" element={<AdminLayout><EditPg /></AdminLayout>} />
        <Route path="/admin/booking-users" element={<AdminLayout><BookingUser /></AdminLayout>} />
        <Route path="/admin/add-room" element={<AdminLayout><AddRoom /></AdminLayout>} />
        <Route path="/admin/pg-rooms" element={<AdminLayout><PGRoomTable /></AdminLayout>} />
        <Route path="/admin/pg-rooms/edit/:id" element={<AdminLayout><EditRoom /></AdminLayout>} />
        <Route path="/admin/make-tenant/:bookingId" element={<AdminLayout><MakeTenant /></AdminLayout>} />
        <Route path="/admin/tenants" element={<AdminLayout><TenantTable /></AdminLayout>} />
        <Route path="/admin/tenant-details/:id" element={<AdminLayout><TenantDetails /></AdminLayout>} />
        <Route path="/admin/rent-bill/:id" element={<AdminLayout><RentBill /></AdminLayout>} /> {/* Added rent bill route */}
        
        {/* Login/Register routes without layout */}
        {/* <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route path="/admin/forgot-password" element={<ForgotPassword />} /> {/* This route will now work */}
        <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path="testimonials" element={<AdminTestimonials />} /> */}
      </Routes>
            </Router>

  );
}

export default App;
