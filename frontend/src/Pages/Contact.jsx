import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { API_URL } from '../config';
import Footer from './Components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
        setFormData({ name: '', email: '', description: '' });
      } else {
        setMessage({ text: data.message || 'Error submitting form', type: 'danger' });
      }
    } catch (error) {
      setMessage({ text: 'Network error', type: 'danger' });
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', description: '' });
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="position-relative mb-4 mb-md-5">
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.85) 0%, rgba(139, 0, 0, 0.95) 100%)',
            zIndex: 1
          }}
        ></div>
      
              <img
  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  alt="Contact Us Hero"
  className="w-100 contact-hero-img"
/>
              <style>
                  {`
                  /* In your CSS file (e.g., Contact.css) */
.contact-hero-img {
  height: 300px;
  object-fit: cover;
  filter: brightness(0.8);
}

@media (min-width: 768px) {
  .contact-hero-img {
    height: 400px;
  }
}
                  `}
</style>
        <div className="position-absolute top-50 start-50 translate-middle text-center px-3" style={{ zIndex: 2, width: '100%', maxWidth: '600px' }}>
          <h1 className="display-4 display-md-3 text-white fw-bold mb-2 mb-md-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
            CONTACT US
          </h1>
          <p className="text-white lead fw-normal d-none d-sm-block" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mx-2 mx-md-3`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ text: '', type: '' })}
          ></button>
        </div>
      )}

      <div className="container py-4 py-md-5">
        <div className="row g-4">
          {/* Contact Info Section */}
          <div className="col-12 col-lg-4 order-2 order-lg-1">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3 p-md-4">
                <div className="mb-4">
                  <h3 className="text-danger fw-bold mb-3 fs-4">Email Address</h3>
                  <p className="text-muted mb-0 small">business- Apnashivshakti@gmail.com</p>
                </div>

                <hr className="my-3 my-md-4" />

                <div className="mb-4">
                  <h3 className="text-danger fw-bold mb-3 fs-4">Contact Number</h3>
                  <p className="text-muted mb-2 small">For Delhi/NCR :</p>
                  <a href="tel:+917827970547" className="text-decoration-none h5 text-danger fs-5">
                    +91 7827 970547
                  </a>
                </div>

                <hr className="my-3 my-md-4" />

                <div>
                  <h3 className="text-danger fw-bold mb-3 fs-4">Address</h3>
                  <p className="text-muted mb-0 small">
                    C-360/361 Ramphall Chowk Near PNB Bank Sector -7 Dwarka 110075
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-12 col-lg-8 order-1 order-lg-2">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-3 p-md-5">
                <h2 className="text-danger fw-bold mb-4 fs-3">Get A Quote</h2>
                <form id="contactForm" onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="name" className="text-muted">Name</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email" className="text-muted">Email ID *</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="message"
                          name="description"
                          placeholder="Enter message"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          style={{ height: '120px' }}
                        ></textarea>
                        <label htmlFor="message" className="text-muted">Message</label>
                      </div>
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary px-4 py-2"
                        onClick={handleReset}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-danger px-4 py-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
          </div>
          <Footer />
    </div>
  );
};

export default ContactPage;