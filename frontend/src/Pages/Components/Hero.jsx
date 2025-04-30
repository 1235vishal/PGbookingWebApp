import React from 'react';
import { FaArrowRight, FaBroom, FaSearch, FaShieldAlt, FaUtensils, FaWifi } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>

      <div className="hero-container">
        <div className="hero-content">
          <p className="subtitle">Premium Paying Guest Accommodation</p>
          <h1 className="hero-title">
            Comfortable PG Stays at <span className="highlight">SHIVSHAKTI</span> PG
            BOOKING
          </h1>
          <p className="hero-description">
            Find the perfect PG that feels like home. We offer affordable,
            comfortable, and convenient options designed for students and
            working professionals.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">421</span>
              <span className="stat-label">PG Rooms Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">451</span>
              <span className="stat-label">Happy Residents</span>
            </div>
          </div>
   <div className="cta-buttons">
  <Link to="/pg-listings" className="primary-btn">
    Book Now
    <FaArrowRight />
  </Link>
  <Link to="/pg-listings" className="secondary-btn">
    Explore PGs
    <FaSearch />
  </Link>
</div>
         
        </div>

               
        <div className="hero-images">
          <div className="main-image-container">
            <img
              src="https://plus.unsplash.com/premium_photo-1676657955502-405b78e1e900?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="PG Building Exterior"
              className="main-image"
            />
            {/* <div className="image-overlay">
              <h4>Premium Facilities</h4>
              <p>Modern amenities for comfortable living</p>
            </div> */}
          </div>
          <div className="common-area-container">
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbW9uJTIwYXJlYSUyMGluJTIwcGclMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Common Area"
              className="secondary-image"
            />
            <div className="image-overlay">
              <h4>Common Areas</h4>
              <p>Socialize and relax</p>
            </div>
          </div>
          <div className="room-interior-container">
            <img
              src="https://media.istockphoto.com/id/474474056/photo/interior-of-a-children-bedroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=DsJbZndsLUbnlOU_wGm9570Ntj0D1kt_0pYyOJsiC3g="
              alt="PG Room Interior"
              className="secondary-image"
            />
            <div className="image-overlay">
              <h4>Comfortable Rooms</h4>
              <p>Your personal space</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-bar">
        <div className="feature-item">
          <div className="feature-icon">
            <FaWifi />
          </div>
          <h3 className="feature-title">Free WiFi</h3>
          <p className="feature-text">High-speed internet</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <FaUtensils />
          </div>
          <h3 className="feature-title">Meals</h3>
          <p className="feature-text">Healthy food options</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <FaShieldAlt />
          </div>
          <h3 className="feature-title">Security</h3>
          <p className="feature-text">24/7 surveillance</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <FaBroom />
          </div>
          <h3 className="feature-title">Housekeeping</h3>
          <p className="feature-text">Regular cleaning</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
