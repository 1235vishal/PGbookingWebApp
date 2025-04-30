import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from '../config';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_URL}/user/login`, formData);
    if (res.data.success) {
      setAlert("Login Successful!");
        localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate("/");

    } else {
      setAlert(res.data.message || "Login failed.");
    }
  } catch (err) {
    setAlert("Login error. Try again.");
  }
};


  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              {alert && <Alert variant="info">{alert}</Alert>}
              <h3 className="mb-4 text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="btn w-100 mb-3" style={{ 
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
                    Login
                  </button>
                  <p className="mb-0">
                    Don't have an account? <Link to="/user/register">Register here</Link>
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

export default Login;
