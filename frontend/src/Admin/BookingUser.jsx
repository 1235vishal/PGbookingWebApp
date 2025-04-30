import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, SERVER_URL } from '../config';
import './BookingUser.css';

const BookingUser = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${API_URL}/bookings/all`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch bookings');
                }
                
                if (data.success) {
                    setBookings(data.bookings);
                } else {
                    setError(data.message || 'No bookings found');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                const response = await fetch(`${API_URL}/bookings/delete/${bookingId}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete booking');
                }
                
                if (data.success) {
                    alert('Booking deleted successfully');
                    // Refresh bookings list
                    setBookings(bookings.filter(booking => booking.id !== bookingId));
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
                alert(error.message || 'Error deleting booking');
            }
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/bookings/update-status/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update booking status');
            }
            
            if (data.success) {
                setBookings(bookings.map(booking => 
                    booking.id === bookingId 
                        ? { ...booking, booking_status: newStatus }
                        : booking
                ));
                alert(`Booking ${newStatus} successfully`);
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
            alert(error.message || 'Error updating booking status');
        }
    };

    const handleMakeTenant = (booking) => {
        navigate(`/admin/make-tenant/${booking.id}`);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="booking-user-container">
            <h2>Booking Management</h2>
            {bookings.length === 0 ? (
                <div className="no-bookings">No bookings found</div>
            ) : (
                <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>PG Name</th>
                                <th>Phone</th>
                                <th>Check-in Date</th>
                                <th>Rent</th>
                                <th>Status</th>
                                <th>Documents</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.name}</td>
                                    <td>{booking.pg_name}</td>
                                    <td>{booking.phone}</td>
                                    <td>{new Date(booking.check_in_date).toLocaleDateString()}</td>
                                    <td>₹{booking.rent}</td>
                                    <td>
                                        <span className={`status-badge ${booking.booking_status}`}>
                                            {booking.booking_status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="document-links">
                                            <a href={`${SERVER_URL}/${booking.id_proof_front}`} target="_blank" rel="noopener noreferrer">ID Front</a>
                                            <a href={`${SERVER_URL}/${booking.id_proof_back}`} target="_blank" rel="noopener noreferrer">ID Back</a>
                                            <a href={`${SERVER_URL}/${booking.user_image}`} target="_blank" rel="noopener noreferrer">Photo</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {booking.booking_status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="confirm-btn"
                                                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button 
                                                        className="reject-btn"
                                                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {booking.booking_status === 'confirmed' && (
                                                <button 
                                                    className="new-tenant-btn"
                                                    onClick={() => handleMakeTenant(booking)}
                                                >
                                                    Make Tenant
                                                </button>
                                            )}
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(booking.id)}
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

export default BookingUser;