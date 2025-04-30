import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="flex-grow-1 p-4" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;