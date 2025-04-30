import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
        { path: '/admin/messages', icon: 'bi-chat-dots', label: 'Messages' }, // Add this menu item
        { path: '/admin/testimonials', icon: 'bi-chat-quote', label: 'Testimonials' },
        { path: '/admin/zones', icon: 'bi-geo-alt', label: 'Manage Zones' },
        { path: '/admin/pg/table', icon: 'bi-building', label: 'PG Management' },
        { path: '/admin/pg-rooms', icon: 'bi-house-door', label: 'Room Management' },
        { path: '/admin/booking-users', icon: 'bi-people', label: 'Booking Users' },
        { path: '/admin/tenants', icon: 'bi-person-check', label: 'Tenant Management' },
        { path: '/admin/rent-history', icon: 'bi-currency-dollar', label: 'Rent History' },
        { path: '/admin/contact-leads', icon: 'bi-envelope', label: 'Contact Leads' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        window.location.href = '/admin/login';
    };

    return (
        <div className={`sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`} 
             style={{
                 minHeight: '100vh',
                 width: isCollapsed ? '60px' : '250px',
                 transition: 'all 0.3s'
             }}>
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                {!isCollapsed && <h5 className="mb-0">Admin Panel</h5>}
                <button 
                    className="btn btn-link text-white" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <i className={`bi ${isCollapsed ? 'bi-arrow-right-square' : 'bi-arrow-left-square'}`}></i>
                </button>
            </div>

            <ul className="nav flex-column mt-3">
                {menuItems.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <Link 
                            to={item.path} 
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            style={{
                                color: 'white',
                                backgroundColor: location.pathname === item.path ? '#0d6efd' : 'transparent'
                            }}
                        >
                            <i className={`bi ${item.icon} me-2`}></i>
                            {!isCollapsed && item.label}
                        </Link>
                    </li>
                ))}
                <li className="nav-item">
                    <Link 
                        to="/admin/forgot-password"
                        className="nav-link"
                        style={{
                            color: 'white',
                            backgroundColor: location.pathname === '/admin/forgot-password' ? '#0d6efd' : 'transparent'
                        }}
                    >
                        <i className="bi bi-key me-2"></i>
                        {!isCollapsed && 'Forgot Password'}
                    </Link>
                </li>
                <li className="nav-item mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="nav-link text-white"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        {!isCollapsed && 'Logout'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;