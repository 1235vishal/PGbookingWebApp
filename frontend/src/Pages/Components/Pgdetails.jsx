
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import './Styles/Pgdetail.css';

const Pgdetails = () => {
    const [pgData, setPgData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/pg/${id}/booking`);
    };

    useEffect(() => {
        const fetchPgDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/pg/get-pg-full/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch PG details');
                }
                const data = await response.json();
                setPgData(data);
            } catch (err) {
                console.error('Error fetching PG details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPgDetails();
    }, [id]);

    // Completely simplified function to parse facilities from any format to clean array
    const parseFacilities = (facilities) => {
        if (!facilities) return [];
        
        try {
            // Convert to string regardless of input type
            const facilitiesStr = String(facilities);
            
            // Remove all special characters and split by any reasonable delimiter
            return facilitiesStr
                .replace(/[\[\]"\\]/g, '') // Remove brackets, quotes, and backslashes
                .split(/,|\n/)             // Split by comma or newline
                .map(item => item.trim())  // Trim whitespace
                .filter(item => item)      // Remove empty items
                .filter(item => item !== 'undefined'); // Remove undefined items
        } catch (error) {
            console.error('Error parsing facilities:', error);
            return [];
        }
    };

    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!pgData) {
        return <div className="no-data">No PG data available</div>;
    }

    const facilitiesArray = parseFacilities(pgData.facilities);

    return (
        <div className="pg-details-container">
            {/* Modal */}
            {showModal && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <img 
                            src={selectedImage} 
                            alt="Full size view"
                            className="modal-image"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            <div className="pg-details-header">
                <div className="header-content">
                    <h1>{pgData.pg_name}</h1>
                    <div className="pg-type-badge">{pgData.pg_type}</div>
                    <p className="pg-location">
                        {pgData.address}
                    </p>
                </div>
            </div>

            <div className="pg-content-grid">
                <div className="main-content">
                    <div className="image-gallery-section">
                        <div className="main-image" onClick={() => handleImageClick(pgData.main_image ? `${API_URL}/uploads/pg/${pgData.main_image}` : "https://via.placeholder.com/800x600")}>
                            <img 
                                src={pgData.main_image ? `${API_URL}/uploads/pg/${pgData.main_image}` : "https://via.placeholder.com/800x600"}
                                alt={pgData.pg_name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/800x600";
                                }}
                            />
                        </div>
                        
                        {pgData.additional_images && parseFacilities(pgData.additional_images).length > 0 && (
                            <div className="thumbnail-grid">
                                {parseFacilities(pgData.additional_images).slice(0, 4).map((img, index) => (
                                    <div 
                                        className="thumbnail" 
                                        key={index}
                                        onClick={() => handleImageClick(`${API_URL}/uploads/pg/${img}`)}
                                    >
                                        <img 
                                            src={`${API_URL}/uploads/pg/${img}`}
                                            alt={`View ${index + 1}`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/200x150";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pg-info-section">
                        <div className="info-card description">
                            <h2>About this PG</h2>
                            <p>{pgData.description || 'No description available.'}</p>
                        </div>

                        <div className="info-card facilities">
                            <h2>Facilities & Amenities</h2>
                            <div className="facilities-grid">
                                {(() => {
                                    // Direct handling of facilities display
                                    let cleanFacilities = [];
                                    
                                    // Handle the specific format with double quotes and newlines
                                    if (pgData.facilities && typeof pgData.facilities === 'string') {
                                        // Remove all special characters
                                        const cleanStr = pgData.facilities
                                            .replace(/[\[\]"\\]/g, '')  // Remove [, ], ", and \
                                            .replace(/\n/g, ',');       // Replace newlines with commas
                                            
                                        // Split into array and clean up
                                        cleanFacilities = cleanStr
                                            .split(',')
                                            .map(item => item.trim())
                                            .filter(item => item);
                                    } 
                                    else if (Array.isArray(pgData.facilities)) {
                                        // If it's already an array, just clean each item
                                        cleanFacilities = pgData.facilities.map(item => 
                                            typeof item === 'string' ? item.trim().replace(/[\[\]"\\]/g, '') : item
                                        );
                                    }
                                    
                                    // Display the cleaned facilities
                                    return cleanFacilities.length > 0 ? (
                                        cleanFacilities.map((facility, index) => (
                                            <div key={index} className="facility-item">
                                                <i className={`fas ${getFacilityIcon(facility)}`}></i>
                                                <span className="facility-name">{facility}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No facilities information available.</p>
                                    );
                                })()}
                            </div>
                        </div>

                        {pgData.video_url && (
                            <div className="info-card video-tour">
                                <h2>Virtual Tour</h2>
                                <div className="video-container">
                                    <video 
                                        controls
                                        src={`${API_URL}/uploads/pg/${pgData.video_url}`}
                                        poster={pgData.main_image ? `${API_URL}/uploads/pg/${pgData.main_image}` : null}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sidebar">
                    <div className="booking-card">
                        <div className="price-section">
                            <span className="price-amount">₹{pgData.rent_start_from || 'N/A'}</span>
                            <span className="price-period">/month</span>
                        </div>
                        <button className="book-now-button" onClick={handleBookNow}>
                            Book Now
                        </button>
                        <div className="quick-info">
                            <div className="info-item">
                                <span className="info-label">Floors</span>
                                <span className="info-value">{pgData.number_of_floors || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Zone</span>
                                <span className="info-value">{pgData.zone || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-card">
                        <h2>Contact Information</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-label">Owner</span>
                                <span className="contact-value">{pgData.owner_name || 'N/A'}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Phone</span>
                                <a href={`tel:${pgData.phone_number}`} className="contact-value">
                                    {pgData.phone_number || 'N/A'}
                                </a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Email</span>
                                <a href={`mailto:${pgData.email_address}`} className="contact-value">
                                    {pgData.email_address || 'N/A'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pgdetails;

const getFacilityIcon = (facility) => {
    const facilityMap = {
        'wifi': 'fa-wifi',
        'parking': 'fa-parking',
        'ac': 'fa-snowflake',
        'laundry': 'fa-washing-machine',
        'security': 'fa-shield-alt',
        'gym': 'fa-dumbbell',
        'food': 'fa-utensils',
        'cleaning': 'fa-broom',
        'tv': 'fa-tv',
        'refrigerator': 'fa-refrigerator',
        'furniture': 'fa-couch',
        'water': 'fa-faucet',
        // Add more mappings as needed
    };

    // Convert facility to lowercase and remove spaces for matching
    const normalizedFacility = facility.toLowerCase().replace(/\s+/g, '');
    return facilityMap[normalizedFacility] || 'fa-check-circle'; // Default icon if no match found
};