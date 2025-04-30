import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, SERVER_URL } from '../config';
import './BookingUser.css';

const TenantTable = () => {
    const navigate = useNavigate();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await fetch(`${API_URL}/tenants/all-tenants`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.success) {
                    setTenants(data.tenants || []);
                } else {
                    setError(data.message || 'No tenants found');
                }
            } catch (error) {
                console.error('Error fetching tenants:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    const handleDelete = async (tenantId) => {
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            try {
                const response = await fetch(`${API_URL}/tenants/delete/${tenantId}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete tenant');
                }
                
                if (data.success) {
                    alert('Tenant deleted successfully');
                    setTenants(tenants.filter(tenant => tenant.id !== tenantId));
                }
            } catch (error) {
                console.error('Error deleting tenant:', error);
                alert(error.message || 'Error deleting tenant');
            }
        }
    };

    const handleViewDetails = (tenantId) => {
        navigate(`/admin/tenant-details/${tenantId}`);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="booking-user-container">
            <h2>Tenant Management</h2>
            {tenants.length === 0 ? (
                <div className="no-bookings">No tenants found</div>
            ) : (
                <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>PG Name</th>
                                <th>Room</th>
                                <th>Rent</th>
                                <th>Check-in Date</th>
                                <th>Documents</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map(tenant => (
                                <tr key={tenant.id}>
                                    <td>{tenant.id}</td>
                                    <td>{tenant.name}</td>
                                    <td>{tenant.phone}</td>
                                    <td>{tenant.pg_name}</td>
                                    <td>{`${tenant.room_number} (${tenant.floor_wing})`}</td>
                                    <td>₹{tenant.rent}</td>
                                    <td>{new Date(tenant.check_in_date).toLocaleDateString()}</td>
                                    <td>
                                        <div className="document-links">
                                            <a href={`${SERVER_URL}/${tenant.id_proof_front}`} target="_blank" rel="noopener noreferrer">ID Front</a>
                                            <a href={`${SERVER_URL}/${tenant.id_proof_back}`} target="_blank" rel="noopener noreferrer">ID Back</a>
                                            <a href={`${SERVER_URL}/${tenant.user_image}`} target="_blank" rel="noopener noreferrer">Photo</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="view-btn"
                                                onClick={() => handleViewDetails(tenant.id)}
                                            >
                                                Details
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(tenant.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TenantTable;
