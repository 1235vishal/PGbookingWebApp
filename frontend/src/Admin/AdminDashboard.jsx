

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function AdminDashboard() {
    const navigate = useNavigate();
    const [totalZones, setTotalZones] = useState(0);
    const [totalPGs, setTotalPGs] = useState(0);
    const [totalLeads, setTotalLeads] = useState(0);
    
    const [pgs, setPgs] = useState([]);
    const [selectedPg, setSelectedPg] = useState('');
    const [pgRoomStats, setPgRoomStats] = useState({
        pgName: '',
        totalRooms: 0,
        availableRooms: 0,
        bookedRooms: 0
    });
    const [bookingStats, setBookingStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0
    });

    // Fetch total zones from the backend
    const fetchTotalZones = async () => {
        try {
            const res = await fetch(`${API_URL}/zone/count`);
            const data = await res.json();
            setTotalZones(data.total);
        } catch (err) {
            console.error('Error fetching total zones:', err);
        }
    };

    // Fetch total PGs from the backend
    const fetchTotalPGs = async () => {
        try {
            const res = await fetch(`${API_URL}/pg/count`);
            const data = await res.json();
            setTotalPGs(data.total);
        } catch (err) {
            console.error('Error fetching total PGs:', err);
        }
    };

    // Fetch total contact leads from the backend
    const fetchTotalLeads = async () => {
        try {
            const res = await fetch(`${API_URL}/contact/count`);
            const data = await res.json();
            setTotalLeads(data.total);
        } catch (err) {
            console.error('Error fetching total leads:', err);
        }
    };

  

    // Fetch PG list for dropdown
    const fetchPgs = async () => {
        try {
            const res = await fetch(`${API_URL}/rooms/get-pgs`);
            const data = await res.json();
            setPgs(data);
            if (data.length > 0) {
                setSelectedPg(data[0].id); // Set first PG as default
            }
        } catch (err) {
            console.error('Error fetching PGs:', err);
        }
    };

    // Fetch room stats for selected PG
    const fetchPgRoomStats = async (pgId) => {
        try {
            
            const res = await fetch(`${API_URL}/rooms/pg-stats/${pgId}`);
            const data = await res.json();

            if (data.success) {
                setPgRoomStats({
                    pgName: data.pgName,
                    totalRooms: data.totalRooms,
                    availableRooms: data.availableRooms,
                    bookedRooms: data.bookedRooms
                });
            }
        } catch (err) {
            console.error('Error fetching PG room stats:', err);
        }
    };

    // Fetch booking statistics
    const fetchBookingStats = async () => {
        try {
            const res = await fetch(`${API_URL}/bookings/all`);
            const data = await res.json();
            if (data.success) {
                const bookings = data.bookings;
                setBookingStats({
                    totalBookings: bookings.length,
                    pendingBookings: bookings.filter(b => b.booking_status === 'pending').length,
                    confirmedBookings: bookings.filter(b => b.booking_status === 'confirmed').length,
                    cancelledBookings: bookings.filter(b => b.booking_status === 'cancelled').length
                });
            }
        } catch (err) {
            console.error('Error fetching booking stats:', err);
        }
    };

    useEffect(() => {
        fetchTotalZones();
        fetchTotalPGs();
        fetchTotalLeads();
        fetchPgs();
        fetchBookingStats();

        const refreshInterval = setInterval(() => {
            fetchTotalZones();
            fetchTotalPGs();
            fetchTotalLeads();
            fetchBookingStats();
        }, 30000);

        return () => clearInterval(refreshInterval);
    }, []);

    useEffect(() => {
        if (selectedPg) {
            fetchPgRoomStats(selectedPg);
        }
    }, [selectedPg]);

    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isEditingWhatsapp, setIsEditingWhatsapp] = useState(false);

    // Fetch WhatsApp number
    const fetchWhatsappNumber = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/whatsapp-number`);
            const data = await res.json();
            if (data.success) {
                setWhatsappNumber(data.number || '');
            }
        } catch (err) {
            console.error('Error fetching WhatsApp number:', err);
        }
    };

    // Update WhatsApp number
    const handleWhatsappUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/admin/whatsapp-number`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ number: whatsappNumber })
            });
            const data = await res.json();
            if (data.success) {
                setIsEditingWhatsapp(false);
                alert('WhatsApp number updated successfully');
            } else {
                alert('Failed to update WhatsApp number');
            }
        } catch (err) {
            console.error('Error updating WhatsApp number:', err);
            alert('Error updating WhatsApp number');
        }
    };

    useEffect(() => {
        fetchWhatsappNumber();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard Overview</h1>
                </div>
            </div>

            {/* Basic Stats Row */}
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Zones
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalZones}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-geo-alt fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total PGs
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalPGs}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-building fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Contact Leads
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalLeads}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-envelope fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Total Bookings
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingStats.totalBookings}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-journal-bookmark fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Room Booking Statistics Row */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3 mb-0 text-gray-800">PG Booking Stats</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Bookings
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingStats.totalBookings}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-journal-bookmark fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending Bookings
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingStats.pendingBookings}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-hourglass-split fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Confirmed Bookings
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingStats.confirmedBookings}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-check-circle fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Cancelled Bookings
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingStats.cancelledBookings}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="bi bi-x-circle fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* PG Specific Room Statistics */}
            <div className="row mb-4">
                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">PG Room Statistics</h6>
                            <div className="dropdown no-arrow">
                                <select 
                                    className="form-control form-control-sm"
                                    value={selectedPg}
                                    onChange={(e) => setSelectedPg(e.target.value)}
                                >
                                    {pgs.map(pg => (
                                        <option key={pg.id} value={pg.id}>
                                            {pg.pg_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-4 col-md-6 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        {pgRoomStats.pgName} - Total Rooms
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {pgRoomStats.totalRooms}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="bi bi-door-open fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        {pgRoomStats.pgName} - Available Rooms
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {pgRoomStats.availableRooms}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="bi bi-check-circle fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        {pgRoomStats.pgName} - Booked Rooms
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {pgRoomStats.bookedRooms}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="bi bi-journal-bookmark fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions and WhatsApp Contact Row */}
            <div className="row">
                {/* Quick Actions Section */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button 
                                    className="btn btn-primary btn-block mb-2"
                                    onClick={() => navigate('/admin/zones')}
                                >
                                    Manage Zones
                                </button>
                                <button 
                                    className="btn btn-success btn-block mb-2"
                                    onClick={() => navigate('/admin/pg/table')}
                                >
                                    Manage PGs
                                </button>
                                <button 
                                    className="btn btn-info btn-block mb-2"
                                    onClick={() => navigate('/admin/pg-rooms')}
                                >
                                    Manage Rooms
                                </button>
                                <button 
                                    className="btn btn-warning btn-block"
                                    onClick={() => navigate('/admin/booking-users')}
                                >
                                    View Bookings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WhatsApp Contact Section */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">WhatsApp Contact Number</h6>
                        </div>
                        <div className="card-body">
                            {isEditingWhatsapp ? (
                                <form onSubmit={handleWhatsappUpdate}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={whatsappNumber}
                                            onChange={(e) => setWhatsappNumber(e.target.value)}
                                            placeholder="Enter WhatsApp number"
                                        />
                                        <button type="submit" className="btn btn-success">
                                            Save
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={() => setIsEditingWhatsapp(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-0">Current Number: {whatsappNumber || 'Not set'}</p>
                                    </div>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => setIsEditingWhatsapp(true)}
                                    >
                                        Edit Number
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;