import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { API_URL } from '../config';
import './ChatBox.css';

const ChatBox = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adminWhatsapp, setAdminWhatsapp] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) return;
        fetchUserRooms();
        fetchAdminWhatsapp();
    }, [user]);

    const fetchAdminWhatsapp = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/whatsapp-number`);
            const data = await response.json();
            if (data.success) {
                setAdminWhatsapp(data.number);
            }
        } catch (error) {
            console.error('Failed to fetch admin WhatsApp:', error);
        }
    };

  const fetchUserRooms = async () => {
    try {
      if (!user || !user.id) {
        setError('User not found or invalid user data');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/tenants/user/${user.id}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.tenants)) {
        // Transform the data to include required fields
        const transformedRooms = data.tenants.map(tenant => ({
          id: tenant.id,
          pg_name: tenant.pg_name || 'N/A', // Use actual PG name instead of constructing it
          room_number: tenant.room_number || 'N/A', // Use actual room number
          admin_phone: tenant.admin_phone || tenant.phone || '1234567890'
        }));
        setRooms(transformedRooms);
      } else {
        setRooms([]);
        setError('No rooms found');
      }
    } catch (error) {
      setError('Failed to fetch rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (phoneNumber, room) => {
    const numberToUse = adminWhatsapp || phoneNumber;
    if (!numberToUse) {
        alert('WhatsApp contact not available');
        return;
    }
    const formattedNumber = numberToUse.replace(/[^\d]/g, '');
    
    // Create introduction message
    const introMessage = `Hi, I am ${user.name || 'a tenant'} from room ${room.room_number} at ${room.pg_name}. `;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(introMessage);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!user) {
    return <div className="alert alert-warning">Please login to access chat.</div>;
  }

  if (loading) {
    return <div className="alert alert-info">Loading rooms...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="chatbox-container">
      <div className="rooms-list">
        <h3 className="text-center mb-4">My Rooms</h3>
        <div className="alert alert-info text-center">
            <small>When you click on "Chat on WhatsApp", a pre-filled message with your details will be sent to help the admin identify you.</small>
        </div>
        
        {/* Desktop View */}
        <div className="table-responsive d-none d-md-block">
            <table className="table table-hover text-center">
                <thead className="bg-light">
                    <tr>
                        <th>PG Name</th>
                        <th>Room Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms && rooms.length > 0 ? (
                        rooms.map((room) => (
                            <tr key={room._id || room.id}>
                                <td>{room.pg_name}</td>
                                <td>{room.room_number}</td>
                                <td>
                                    <button 
                                        className="btn btn-success btn-sm"
                                        onClick={() => openWhatsApp(room.admin_phone, room)}
                                        disabled={!room.admin_phone}
                                    >
                                        <FaWhatsapp className="whatsapp-icon" /> Chat on WhatsApp
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No rooms available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    
        {/* Mobile View - Card Layout */}
        <div className="d-md-none">
            <div className="room-cards">
                {rooms && rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room._id || room.id} className="room-card">
                            <div className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{room.pg_name}</h5>
                                    <p className="card-text">Room Number: {room.room_number}</p>
                                    <button 
                                        className="btn btn-success w-100"
                                        onClick={() => openWhatsApp(room.admin_phone, room)}
                                        disabled={!room.admin_phone}
                                    >
                                        <FaWhatsapp className="whatsapp-icon" /> Chat on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info text-center">
                        No rooms available
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;