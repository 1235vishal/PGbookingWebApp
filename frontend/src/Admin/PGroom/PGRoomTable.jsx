import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

const PGRoomTable = () => {
    const [rooms, setRooms] = useState([]);  // Initialize as empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${API_URL}/rooms/get-rooms`);
            // Ensure we're setting an array
            setRooms(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setRooms([]); // Set empty array on error
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/rooms/delete/${id}`);
                    Swal.fire('Deleted!', 'Room has been deleted.', 'success');
                    fetchRooms();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete room.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>PG Rooms</h2>
                <Link to="/admin/add-room" className="btn btn-primary">
                    Add New Room
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>PG Name</th>
                            <th>Room Number</th>
                            <th>Floor/Wing</th>
                            <th>Type</th>
                            <th>Rent (₹)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(rooms) && rooms.length > 0 ? (
                            rooms.map(room => (
                                <tr key={room.id}>
                                    <td>{room.pg_name}</td>
                                    <td>{room.room_number}</td>
                                    <td>{room.floor_wing}</td>
                                    <td>{room.room_type}</td>
                                    <td>₹{room.base_rent}</td>
                                    <td>
                                        <span className={`badge ${
                                            room.room_status === 'available' ? 'bg-success' :
                                            room.room_status === 'booked' ? 'bg-danger' :
                                            'bg-warning'
                                        }`}>
                                            {room.room_status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link 
                                            to={`/admin/pg-rooms/edit/${room.id}`} 
                                            className="btn btn-sm btn-primary me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No rooms found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PGRoomTable;