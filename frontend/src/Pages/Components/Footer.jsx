import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="logo-container">
            <img src="./assets/0-Photoroom.png" alt="Shivshakti PG Logo" />
          </div>

          <div className="footer-description">
            Shivshakti PG - Your trusted platform for hassle-free PG accommodation booking. 
            Find your perfect home away from home with our curated selection of PGs, 
            virtual tours, and seamless booking experience.
          </div>

       <div className="footer-nav">
  <Link to="/">Home</Link>
  <Link to="/about">About Us</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/pg-listings">Find PG</Link>
  <Link to="/user/login">Login</Link>
  <Link to="/user/register">Register</Link>
</div>


          <div className="social-icons">
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Shivshakti PG. All rights reserved.</p>
          <p>Made with <span className="heart-icon">❤️</span> in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;