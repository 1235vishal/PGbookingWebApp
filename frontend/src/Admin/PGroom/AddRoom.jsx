import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

const AddRoom = () => {
    const navigate = useNavigate();
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPG, setSelectedPG] = useState(null);
    const [formData, setFormData] = useState({
        pg_id: '',
        room_number: '',
        floor_wing: '',
        room_type: '',
        base_rent: '',
        room_status: 'available',
        notes: ''
    });

    useEffect(() => {
        fetchPGs();
    }, []);

    const fetchPGs = async () => {
        try {
            const response = await axios.get(`${API_URL}/rooms/get-pgs`);
            console.log('PGs Response:', response.data); // Debug log
            setPgs(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching PGs:', error);
            setError('Failed to load PG data');
            setPgs([]);
            setLoading(false);
        }
    };

    const handlePGSelect = (e) => {
        const pgId = e.target.value;
        const selectedPG = pgs.find(pg => pg.id === parseInt(pgId));
        setSelectedPG(selectedPG);
        setFormData(prev => ({
            ...prev,
            pg_id: pgId,
            base_rent: selectedPG?.rent_start_from || '',
            floor_wing: `Floor ${selectedPG?.number_of_floors || ''}`
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/rooms/add-room`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Room added successfully'
            }).then(() => {
                navigate('/admin/pg-rooms');
            });
        } catch (error) {
            console.error('Error adding room:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add room'
            });
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="container my-4 p-4 rounded shadow-sm border bg-white" style={{ maxWidth: '600px' }}>
            <h4 className="mb-4 text-center text-primary">Add New Room</h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="pgSelect" className="form-label">Select PG</label>
                    <select 
                        className="form-select" 
                        id="pgSelect" 
                        required
                        value={formData.pg_id}
                        onChange={handlePGSelect}
                    >
                        <option value="">-- Select PG Building --</option>
                        {Array.isArray(pgs) && pgs.map(pg => (
                            <option key={pg.id} value={pg.id}>{pg.pg_name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="roomNumber" className="form-label">Room Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="roomNumber"
                        placeholder="e.g. 201"
                        required
                        value={formData.room_number}
                        onChange={(e) => setFormData({...formData, room_number: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="floor" className="form-label">Floor / Wing</label>
                    <input
                        type="text"
                        className="form-control"
                        id="floor"
                        value={formData.floor_wing}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">Room Type</label>
                    <select 
                        className="form-select" 
                        id="roomType" 
                        required
                        value={formData.room_type}
                        onChange={(e) => setFormData({...formData, room_type: e.target.value})}
                    >
                        <option value="">-- Select Type --</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple Sharing</option>
                        <option value="dorm">Dormitory</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="baseRent" className="form-label">Base Rent (₹)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="baseRent"
                        value={formData.base_rent}
                        onChange={(e) => setFormData({...formData, base_rent: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="roomStatus" className="form-label">Room Status</label>
                    <select 
                        className="form-select" 
                        id="roomStatus"
                        value={formData.room_status}
                        onChange={(e) => setFormData({...formData, room_status: e.target.value})}
                    >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                    <textarea
                        className="form-control"
                        id="notes"
                        rows="3"
                        placeholder="Special view, size, etc."
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Save & Close</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                        handleSubmit(new Event('submit'));
                        setFormData({
                            pg_id: '',
                            room_number: '',
                            floor_wing: '',
                            room_type: '',
                            base_rent: '',
                            room_status: 'available',
                            notes: ''
                        });
                    }}>Save & Add Another</button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;