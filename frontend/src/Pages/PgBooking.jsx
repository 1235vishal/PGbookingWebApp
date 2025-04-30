import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, SERVER_URL } from '../config';
import './PgBooking.css';

const PgBooking = () => {
    const [pgData, setPgData] = useState(null);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch PG details
        fetch(`${API_URL}/pg/get-pg-full/${id}`)
            .then(res => res.json())
            .then(data => setPgData(data))
            .catch(err => console.error('Error fetching PG details:', err));

        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [id]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData(e.target);
    //     // Add user ID to the form data
    //     formData.append('userId', user.id);
        
    //     try {
    //         const response = await fetch(`${API_URL}/bookings/create/${id}`, {
    //             method: 'POST',
    //             body: formData
    //         });
    
    //         const data = await response.json();
    
    //         if (response.ok) {
    //             alert('Booking successful!');
    //             navigate('/user/booking-history');
    //         } else {
    //             alert(data.message || 'Booking failed. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting booking:', error);
    //         alert('An error occurred. Please try again.');
    //     }
    // };
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        formData.append('userId', user.id);
        
        // Add validation for required fields
        const checkInDate = e.target.checkInDate.value;
        if (!checkInDate) {
            alert('Please select a check-in date');
            return;
        }

        const response = await fetch(`${API_URL}/bookings/create/${id}`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - let browser set it
        });

        // First check if response is OK
        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.message || 'Booking failed');
            } catch {
                throw new Error(errorText || 'Booking failed');
            }
        }

        const data = await response.json();
        
        if (data.success) {
            alert('Booking successful!');
            navigate('/user/booking-history');
        } else {
            alert(data.message || 'Booking failed. Please try again.');
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert(`Error: ${error.message}`);
    }
};
    if (!pgData) return <div>Loading...</div>;

    return (
        <main className="container">
            <header className="page-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8 mx-auto text-center">
                            <h1 className="pg-name">{pgData.pg_name}</h1>
                            <p className="lead mb-0">Book your comfortable stay today</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="gallery-section mb-5">
                <div className="row g-4 gallery-container">
                    {pgData.main_image && (
                        <div className="col-md-4">
                            <div className="position-relative overflow-hidden">
                                <img
                                    src={`${SERVER_URL}/uploads/pg/${pgData.main_image}`}
                                    alt="Main PG Image"
                                    className="gallery-img"
                                />
                            </div>
                        </div>
                    )}
                    {pgData.additional_images && JSON.parse(pgData.additional_images).map((img, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="position-relative overflow-hidden">
                                <img
                                    src={`${SERVER_URL}/uploads/pg/${img}`}
                                    alt={`Secondary Image ${index + 1}`}
                                    className="gallery-img"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="booking-form-section mb-5">
                {user ? (
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="booking-card">
                                <div className="form-header">
                                    <h3>Complete Your Booking</h3>
                                    <div className="form-icon">
                                        <i className="fas fa-clipboard-list"></i>
                                    </div>
                                </div>
                                <div className="form-body">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="name" className="form-label">Your Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={user.name}
                                                        className="form-control readonly-field"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="col-md-6 mb-3">
                                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fas fa-phone"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        value={user.phone}
                                                        className="form-control readonly-field"
                                                        readOnly
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="col-md-6 mb-3">
    <label htmlFor="phone" className="form-label">Phone Number</label>
    <div className="input-group">
        <span className="input-group-text">
            <i className="fas fa-phone"></i>
        </span>
        <input
            type="text"
            id="phone"
            name="phone"
            value={user?.phone || ''}
            className="form-control readonly-field"
            readOnly
        />
    </div>
</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="rent" className="form-label">Monthly Rent</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fas fa-rupee-sign"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="rent"
                                                        name="rent"
                                                        value={pgData.rent_start_from}
                                                        className="form-control readonly-field"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="checkInDate" className="form-label">Check-in Date</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fas fa-calendar-alt"></i>
                                                    </span>
                                                    <input
                                                        type="date"
                                                        id="checkInDate"
                                                        name="checkInDate"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section-divider"></div>

                                        <div className="document-upload-section mb-4">
                                            <h5 className="mb-3 text-center">Required Documents</h5>

                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="idProofFront" className="form-label">ID Proof (Front)</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fas fa-id-card"></i>
                                                        </span>
                                                        <input
                                                            type="file"
                                                            id="idProofFront"
                                                            name="idProofFront"
                                                            className="form-control"
                                                            accept="image/*,application/pdf"
                                                            required
                                                        />
                                                    </div>
                                                    <span className="file-upload-text">Upload Aadhar, PAN, or Driving License</span>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="idProofBack" className="form-label">ID Proof (Back)</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fas fa-id-card"></i>
                                                        </span>
                                                        <input
                                                            type="file"
                                                            id="idProofBack"
                                                            name="idProofBack"
                                                            className="form-control"
                                                            accept="image/*,application/pdf"
                                                            required
                                                        />
                                                    </div>
                                                    <span className="file-upload-text">Upload back side of your ID</span>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="userImage" className="form-label">Your Photograph</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fas fa-camera"></i>
                                                    </span>
                                                    <input
                                                        type="file"
                                                        id="userImage"
                                                        name="userImage"
                                                        className="form-control"
                                                        accept="image/*"
                                                        required
                                                    />
                                                </div>
                                                <span className="file-upload-text">Upload a recent passport-size photograph</span>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-book-now btn-lg">
                                                <i className="fas fa-check-circle me-2"></i> Confirm Booking
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="login-prompt">
                        <div className="login-icon">
                            <i className="fas fa-user-lock"></i>
                        </div>
                        <h3>Please Login to Book</h3>
                        <p className="text-muted">
                            You need to be logged in to book this PG accommodation.
                        </p>
                        {/* <a href="/user/login" className="btn btn-login">
                            <i className="fas fa-sign-in-alt me-2"></i> Login Now
                        </a> */}
                            <Link to="/user/login" className="btn btn-login">
  <i className="fas fa-sign-in-alt me-2"></i> Login Now
</Link>

                    </div>
                )}
            </section>
        </main>
    );
};

export default PgBooking;