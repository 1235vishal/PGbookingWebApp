import React from 'react';
import './About.css';
import FAQ from './Components/FAQ';
import Footer from './Components/Footer';
const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Welcome to ShivShakti PG</h1>
          <p>Your Home Away From Home</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mission-statement">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Find My PG is a technology-based platform for Booking PG, Serviced
            Apartments, Shared Flat and Rooms by Location with Specific requirement
            by filtering by Location, IT Parks, Land Mark, Price, Room type,
            Amenities, Gender and Food. Presently we have Launched in Platform in
            Chennai, Coimbatore and Bangalore. We will soon expand to all the Major
            Cities of the Country
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>Who We Are</h3>
          <p>
            We are a set of well-selected and chosen Paying Guest services. This
            is a platform where those, who are willing to open their homes to
            guests, meet the people looking for wonderful homes to stay in and
            not have to look for hotels or favors in any city for their long
            stays.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-tasks"></i>
          </div>
          <h3>What We Do</h3>
          <p>
            We put together a list of places where our guests can stay as a PG.
            This is done based on listings on our site by homeowners. We ensure
            that not only are they a safe home for the guest but the guest too
            is safe for them.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-bullseye"></i>
          </div>
          <h3>Our Aim</h3>
          <p>
            Our aim and motto are simple and singular. To provide the guests
            with a PG that feels like home best fitting their needs and the
            homeowners a guest who fits right in.
          </p>
        </div>
      </div>

      {/* Stats Section */}
     

      {/* Additional About Sections */}
      <div className="about-sections">
        <div className="about-section">
          <div className="about-section-image">
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" alt="Modern Living Space" />
          </div>
          <div className="about-section-text">
            <h3>Comfortable Living Spaces</h3>
            <p>Experience the perfect blend of comfort and convenience in our carefully designed PG accommodations. Each room is crafted to provide you with a cozy and welcoming environment.</p>
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-section-image">
            <img src="https://images.unsplash.com/photo-1630699144867-37acec97df5a" alt="Community Space" />
          </div>
          <div className="about-section-text">
            <h3>Vibrant Community</h3>
            <p>Join a thriving community of like-minded individuals. Our PGs are more than just living spaces - they're places where lasting friendships are formed and memories are made.</p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-section-image">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Premium Amenities" />
          </div>
          <div className="about-section-text">
            <h3>Premium Amenities</h3>
            <p>Enjoy access to modern amenities that make your stay comfortable and convenient. From high-speed internet to fully equipped common areas, we've got everything you need.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-wrapper">
        <FAQ />
          </div>
          <Footer />
    </div>
  );
};

export default About;