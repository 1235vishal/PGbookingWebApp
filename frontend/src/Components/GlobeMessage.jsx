import React from 'react';
import './GlobeMessage.css';

const GlobeMessage = () => {
  return (
    <div className="globe-message">
      <div className="globe-message-container">
        <div className="globe-icon">
          <i className="fas fa-globe"></i>
        </div>
        <div className="message-content">
          <h3>Global Presence</h3>
          <p>Find your perfect PG accommodation across multiple cities. We're expanding our presence to serve you better.</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">PGs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Residents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeMessage;