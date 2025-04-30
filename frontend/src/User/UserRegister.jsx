import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from '../config';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert("Passwords do not match");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(`${API_URL}/user/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle backend response here
      setAlert(res.data || "Registration failed.");
      if (res.status === 201) {
        setTimeout(() => {
          window.location.href = "/user/login";
        }, 2000);
      }
    } catch (err) {
      setAlert("Error occurred during registration.");
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              {alert && <Alert variant="info">{alert}</Alert>}
              <h3 className="mb-4 text-center">Register</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label>Full Name</label>
                  <input type="text" className="form-control" name="name" onChange={handleChange} required />
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Phone</label>
                    <input type="text" className="form-control" name="phone" onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Gender</label>
                  <select className="form-select" name="gender" onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Profile Image</label>
                  <input type="file" className="form-control" name="profileImage" accept="image/*" onChange={handleChange} required />
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn w-100" style={{ 
                    backgroundColor: '#dc3545', 
                    color: 'white',
                    borderColor: '#dc3545',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#dc3545';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#dc3545';
                    e.target.style.color = 'white';
                  }}>
                    Register
                  </button>
                  <p className="mt-3">
                    Already have an account? <Link to="/user/login">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
