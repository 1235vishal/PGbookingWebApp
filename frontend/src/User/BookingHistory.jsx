import React, { useEffect, useState } from "react";
import { API_URL } from '../config';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => { 
        if (user) {
            fetch(`${API_URL}/bookings/history/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setBookings(data.bookings);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching bookings:', err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="booking-history-container">
            <h1>My Booking History</h1>
            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <p>You haven't made any bookings yet.</p>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-image">
                                <img 
                                    src={`${API_URL}/uploads/pg/${booking.pg_image}`} 
                                    alt={booking.pg_name} 
                                />
                            </div>
                            <div className="booking-details">
                                <h3>{booking.pg_name}</h3>
                                <p><strong>Check-in Date:</strong> {new Date(booking.check_in_date).toLocaleDateString()}</p>
                                <p><strong>Rent:</strong> ₹{booking.rent}</p>
                                <p><strong>Status:</strong> 
                                    <span className={`status-${booking.booking_status}`}>
                                        {booking.booking_status}
                                    </span>
                                </p>
                                <p><strong>Booked On:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
