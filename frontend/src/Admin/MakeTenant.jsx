import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, SERVER_URL } from '../config';
import './MakeTenant.css';

const MakeTenant = () => {
    const { bookingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [formData, setFormData] = useState({
        bookingId: '',
        userName: '',
        userPhone: '',
        pgName: '',
        pgAddress: '',
        pgRent: '',
        checkInDate: '',
        selectedRoom: ''
    });

    useEffect(() => {
        fetchBookingData();
    }, [bookingId]);

    useEffect(() => {
        if (bookingData?.pg_id) {
            fetchAvailableRooms();
        }
    }, [bookingData]);

    const fetchBookingData = async () => {
        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}`);
            const data = await response.json();
            if (data.success) {
                setBookingData(data.booking);
                // Fix the date formatting
                const date = new Date(data.booking.check_in_date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                
                setFormData({
                    bookingId: data.booking.id,
                    userName: data.booking.name,
                    userPhone: data.booking.phone,
                    pgName: data.booking.pg_name,
                    pgRent: data.booking.rent,
                    checkInDate: formattedDate,
                    selectedRoom: ''
                });
            }
        } catch (error) {
            setError('Failed to fetch booking data');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableRooms = async () => {
        try {
            const response = await fetch(`${API_URL}/rooms/available/${bookingData.pg_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                setAvailableRooms(data.rooms);
            }
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            setAvailableRooms([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.selectedRoom) {
            alert('Please select a room');
            return;
        }

        try {
            // First create the tenant
            const response = await fetch(`${API_URL}/tenants/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (data.success) {
                // Then update the room status
                const roomUpdateResponse = await updateRoomStatus(formData.selectedRoom, 'booked');
                if (!roomUpdateResponse.ok) {
                    throw new Error('Failed to update room status');
                }
                
                alert('Tenant created successfully and room has been booked');
                
                // Reset form data
                setFormData({
                    bookingId: '',
                    userName: '',
                    userPhone: '',
                    pgName: '',
                    pgAddress: '',
                    pgRent: '',
                    checkInDate: '',
                    selectedRoom: ''
                });
                
                // Update available rooms list
                if (bookingData?.pg_id) {
                    fetchAvailableRooms();
                }
                
                // Redirect to tenant list
                window.location.href = '/admin/tenants';
            } else {
                alert(data.message || 'Failed to create tenant');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create tenant or update room status');
        }
    };

    const updateRoomStatus = async (roomId, status) => {
        return await fetch(`${API_URL}/rooms/update-status/${roomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tenant-form-container">
            <div className="card">
                <h3>Create Tenant</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Booking ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.bookingId}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">User Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.userName}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">User Phone:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.userPhone}
                            onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">PG Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.pgName}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">PG Rent:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={formData.pgRent}
                            onChange={(e) => setFormData({...formData, pgRent: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Check-in Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={formData.checkInDate}
                            onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Select Room:</label>
                        <select 
                            className="form-select"
                            value={formData.selectedRoom}
                            onChange={(e) => {
                                setFormData({...formData, selectedRoom: e.target.value});
                                // Update room status in available rooms list
                                const selectedRoom = availableRooms.find(room => room.id === parseInt(e.target.value));
                                if (selectedRoom) {
                                    const updatedRooms = availableRooms.map(room => 
                                        room.id === selectedRoom.id 
                                            ? {...room, room_status: 'selected'} 
                                            : room
                                    );
                                    setAvailableRooms(updatedRooms);
                                }
                            }}
                            required
                        >
                            <option value="">Select a room</option>
                            {availableRooms.map(room => (
                                <option 
                                    key={room.id} 
                                    value={room.id}
                                    disabled={room.room_status === 'booked'}
                                >
                                    {room.room_number} - {room.floor_wing} ({room.room_status})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <h4>Uploaded Documents</h4>
                        <div className="document-links">
                            <a href={`${SERVER_URL}/${bookingData.id_proof_front}`} target="_blank" rel="noopener noreferrer">ID Proof Front</a>
                            <a href={`${SERVER_URL}/${bookingData.id_proof_back}`} target="_blank" rel="noopener noreferrer">ID Proof Back</a>
                            <a href={`${SERVER_URL}/${bookingData.user_image}`} target="_blank" rel="noopener noreferrer">User Image</a>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Tenant</button>
                </form>
            </div>
        </div>
    );
};

export default MakeTenant;