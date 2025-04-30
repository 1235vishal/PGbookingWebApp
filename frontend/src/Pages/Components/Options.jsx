import React from 'react';
import './Styles/Options.css';

const Options = () => {
  return (
    <div className="options-section">
      <div className="header">
        <h1>Meet the easier side of <span className="highlight-text">living</span></h1>
      </div>

      <div className="features-grid">
        {/* Modern Appliances */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="washer-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <h2>Modern Appliances</h2>
          <p>
            Our homes are equipped with refrigerator, washing machine & other
            modern appliances so your daily chores don't seem daunting and you
            can do them at your preferred time.
          </p>
        </div>

        {/* House Keeping */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="cleaning-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 22v-3h3"></path>
              <path d="M3 17l5-5"></path>
              <path d="M13 7l3-3 5 5-3 3"></path>
              <path d="M10 14l8-8"></path>
              <path d="M5 2v5"></path>
              <path d="M2 5h5"></path>
            </svg>
          </div>
          <h2>House Keeping</h2>
          <p>
            We know a bachelor life can get pretty hectic and sometimes messy
            too? Our staff ensures daily house cleaning, so you can be welcomed
            by a clean space after a tiring day.
          </p>
        </div>

        {/* Safety First */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="shield-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h2>Safety First</h2>
          <p>
            Our homes are located in gated societies across the city, so you
            will always find one closer to your office. Unlike PG/hostels, gated
            societies are much safer so you can live stress-free.
          </p>
        </div>

        {/* Service Requests */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="service-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              ></path>
              <circle cx="10" cy="13" r="2"></circle>
              <path d="M14 13h4"></path>
              <path d="M14 17h4"></path>
              <path d="M10 17v-4"></path>
            </svg>
          </div>
          <h2>Service Requests</h2>
          <p>
            We fix everything at home (except broken hearts :), so you can laze
            around in your PJs. Just raise a service request from the app and
            leave it to our maintenance team to fix them.
          </p>
        </div>

        {/* Convenience */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="convenience-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20v-6l-2 2"></path>
              <path d="M12 14l2 2"></path>
              <path d="M4 4l16 16"></path>
              <circle cx="12" cy="5" r="3"></circle>
            </svg>
          </div>
          <h2>Convenience</h2>
          <p>
            From online payments to doorstep agreement, we love to spoil you by
            adding convenience at every stage. We may technically be your
            landlords but not a pesty one for sure.
          </p>
        </div>

        {/* Affordable Accommodation */}
        <div className="feature-card">
          <div className="icon-wrapper">
            <svg
              className="price-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
              ></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
          <h2>Affordable Accommodation</h2>
          <p>
            Moving into a new city or a new home can be daunting and financially
            exhausting. We therefore make it easy on the pocket with Zero
            brokerage & just 2 months deposit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Options;