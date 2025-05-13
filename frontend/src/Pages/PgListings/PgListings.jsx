import React, { useEffect, useState } from 'react';
import { FaFan, FaMapMarkerAlt, FaUtensils, FaWifi } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../../config';
import Footer from '../Components/Footer';
import PgMap from '../Components/PgMaplisting';
import Searchbar from '../Components/Searchbar';
import './PgListings.css';

const PgListings = () => {
    const [pgs, setPgs] = useState([]);
    const [filteredPgs, setFilteredPgs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pgsResponse = await fetch(`${API_URL}/pg/get-all-pgs`);
                const pgsData = await pgsResponse.json();
                setPgs(pgsData);
                setFilteredPgs(pgsData);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [location.pathname]);

    const handleSearchResult = (results) => {
        setFilteredPgs(results);
    };

    return (
        <div className="pglisting-main-container">
            {/* Hero Section */}
            <div className="pglisting-hero">
                <div className="pglisting-hero-overlay"></div>
                <div className="pglisting-hero-content">
                    <h1>Find Your Perfect PG Home</h1>
                    <p>Discover comfortable and affordable PG accommodations in your preferred location</p>
                    <div className="pglisting-hero-stats">
                        <div className="hero-stat-item">
                            <span className="stat-number1">500+</span>
                            <span className="stat-text">PG Listings</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="stat-number1">50+</span>
                            <span className="stat-text">Locations</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="stat-number1">1000+</span>
                            <span className="stat-text">Happy Residents</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pglisting-content">
                {/* Search Section */}
                <div className="pglisting-search-filter">
                    <div className="search-filter-header">
                        <h2>Search Your Perfect PG</h2>
                        <p>Find the best PG accommodation for you</p>
                    </div>
                    <Searchbar pgData={pgs} onSearchResult={handleSearchResult} />
                </div>

                {/* Results Section */}
                <div className="pglisting-results-header">
                    <h3>Available PG Accommodations</h3>
                    <p>{filteredPgs.length} properties found</p>
                </div>

                <div className="pglisting-views-container">
                    <div className="pglisting-map-section">
                        <PgMap pgData={filteredPgs} />
                    </div>

                    <div className="pglisting-grid-section">
                        <div className="pglisting-grid">
                            {filteredPgs.length > 0 ? (
                                filteredPgs.map((pg) => (
                                    <div className="pglisting-card" key={pg.id}>
                                        <div className="pglisting-image-container">
                                            <img
                                                src={pg.main_image
                                                    ? `${API_URL}/uploads/pg/${pg.main_image}`
                                                    : "https://via.placeholder.com/400x320"
                                                }
                                                alt={pg.pg_name}
                                                className="pglisting-image"
                                            />
                                            <div className="pglisting-type-badge">{pg.pg_type}</div>
                                            <div className="pglisting-image-overlay">
                                                <Link to={`/pg/${pg.id}/details`} className="view-details-btn">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="pglisting-info">
                                            <div className="pglisting-header">
                                                <h3 className="pglisting-name">{pg.pg_name}</h3>
                                                <div className="pglisting-price">
                                                    ₹{pg.rent_start_from}<span>/month</span>
                                                </div>
                                            </div>

                                            <div className="pglisting-location">
                                                <FaMapMarkerAlt /> 
                                                <span>{pg.address || "Address not available"}</span>
                                            </div>
                                            
                                            <div className="pglisting-zone">
                                                <span className="zone-badge">{pg.zone} Zone</span>
                                            </div>

                                            <div className="pglisting-amenities">
                                                {pg.facilities?.includes('WiFi') && (
                                                    <div className="pglisting-amenity">
                                                        <FaWifi /> <span>WiFi</span>
                                                    </div>
                                                )}
                                                {pg.facilities?.includes('Food') && (
                                                    <div className="pglisting-amenity">
                                                        <FaUtensils /> <span>Food</span>
                                                    </div>
                                                )}
                                                {pg.facilities?.includes('AC') && (
                                                    <div className="pglisting-amenity">
                                                        <FaFan /> <span>AC</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="pglisting-no-results">
                                    <h3>No PGs Found</h3>
                                    <p>Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PgListings;