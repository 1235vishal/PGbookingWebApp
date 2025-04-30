import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/Pgdetail.css';

const Pgdetails = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPgDetails = async () => {
      try {
        const response = await axios.get(`/api/pg/get-pg-full/${id}`);
        setPg(response.data);
      } catch (error) {
        console.error('Error fetching PG details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPgDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading PG details...</p>
      </div>
    );
  }

  if (!pg) {
    return <p>No PG details found.</p>;
  }

  return (
    <>
      {/* Page Header */}
      <header className="page-header">
        <div className="container text-center">
          <h1 className="page-title">{pg.pg_name}</h1>
          <p className="lead">
            <i className="fas fa-map-marker-alt me-2"></i>{pg.address}
          </p>
        </div>
      </header>

      <div className="container">
        {/* Main Card Section */}
        <div className="row">
          <div className="col-lg-8">
            <div className="main-card card mb-4">
              <img
                src={`/uploads/${pg.main_image}`}
                className="custom-card-img"
                alt={pg.pg_name}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card quick-details-card">
              <div className="card-header-custom">
                <h2><i className="fas fa-info-circle me-2"></i>Quick Details</h2>
              </div>
              <div className="card-body p-4">
                {/* Property Type */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Property Type</h3>
                    <p>{pg.pg_type}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Starting Price</h3>
                    <p className="price-highlight mb-0">
                      ₹{pg.rent_start_from}<span className="fs-6 fw-normal text-muted">/month</span>
                    </p>
                  </div>
                </div>

                {/* Owner */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Owner</h3>
                    <p>{pg.owner_name}</p>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Availability */}
                <div className="detail-item">
                  <div
                    className="detail-icon"
                    style={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
                  >
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Availability</h3>
                    <p>Available Now</p>
                  </div>
                </div>

                <a
                  href={`/booking/${pg.id}`}
                  className="btn book-now-btn d-block w-100 mt-4"
                >
                  <i className="fas fa-bed me-2"></i>Book Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card main-card">
              <div className="card-body">
                <h2 className="section-title">About This PG</h2>
                <p className="card-text">{pg.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <h2 className="section-title">Amenities</h2>
        <div className="row g-4 mb-5">
          {pg.facilities && JSON.parse(pg.facilities).map((facility, index) => (
            <div key={index} className="col-md-3 col-6">
              <div className="amenity-item">
                <i className={`fas ${getFacilityIcon(facility)} amenity-icon fa-2x mb-2`}></i>
                <h3 className="fs-5">{facility}</h3>
                <p className="m-0">Available</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        {pg.additional_images && JSON.parse(pg.additional_images).length > 0 && (
          <>
            <h2 className="section-title">Gallery</h2>
            <div className="row g-4 mb-5">
              {JSON.parse(pg.additional_images).map((image, index) => (
                <div key={index} className="col-md-6">
                  <img
                    src={`/uploads/${image}`}
                    className="gallery-image shadow"
                    alt={`Gallery Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Section */}
        {pg.video_url && (
          <>
            <h2 className="section-title">PG Tour Video</h2>
            <div className="row mb-5">
              <div className="col-12">
                <div className="video-container">
                  <video controls autoPlay>
                    <source src={`/uploads/${pg.video_url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Contact Section */}
        <h2 className="section-title">Contact Information</h2>
        <div className="contact-section mb-5">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h3 className="fs-6 fw-bold mb-0">Owner</h3>
                  <p className="mb-0">{pg.owner_name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h3 className="fs-6 fw-bold mb-0">Phone</h3>
                  <a href={`tel:${pg.phone_number}`} className="text-decoration-none">
                    {pg.phone_number}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="fs-6 fw-bold mb-0">Email</h3>
                  <a href={`mailto:${pg.email_address}`} className="text-decoration-none">
                    {pg.email_address}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get facility icons
const getFacilityIcon = (facility) => {
  const iconMap = {
    'Furnished': 'fa-couch',
    'Parking': 'fa-car',
    'AC': 'fa-snowflake',
    'WiFi': 'fa-wifi',
    // Add more mappings as needed
  };
  return iconMap[facility] || 'fa-check';
};

export default Pgdetails;