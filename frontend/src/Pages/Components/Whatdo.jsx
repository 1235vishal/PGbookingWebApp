import React from 'react';
import './Styles/Whatdo.css';

const Whatdo = () => {
  return (
    <div className="whatdo-section">
      <h1 className="whatdo-title">How it Work's</h1>

      <p className="whatdo-description">
        Our process is simple and very different from those of others in this
        industry. The search process is streamlined by the locality or landmark
        of your choice. This allows you to find the right PG or Room.
      </p>

      <div className="whatdo-steps">
        {/* Step 1: Search */}
        <div className="whatdo-step">
          <div className="whatdo-step-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <circle cx="11" cy="11" r="3"></circle>
            </svg>
          </div>
          <h3 className="whatdo-step-title">Search</h3>
          <p className="whatdo-step-description">Find PG Easily Using Filters</p>
        </div>

        {/* Step 2: Make Payment */}
        <div className="whatdo-step">
          <div className="whatdo-step-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="10" y1="10" x2="18" y2="10"></line>
              <line x1="10" y1="14" x2="18" y2="14"></line>
              <circle cx="7" cy="10" r="1"></circle>
              <circle cx="7" cy="14" r="1"></circle>
              <line x1="21" y1="8" x2="16" y2="8"></line>
            </svg>
          </div>
          <h3 className="whatdo-step-title">Make Payment</h3>
          <p className="whatdo-step-description">Choose Your PG and Pay Online</p>
        </div>

        {/* Step 3: Booking Confirmation */}
        <div className="whatdo-step">
          <div className="whatdo-step-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
              <circle cx="12" cy="10" r="3"></circle>
              <path d="M12 10l2 2"></path>
            </svg>
          </div>
          <h3 className="whatdo-step-title">Booking Confirmation</h3>
          <p className="whatdo-step-description">Get Confirmed booking date</p>
        </div>
      </div>
    </div>
  );
};

export default Whatdo;