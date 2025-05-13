

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

const UserProfile = () => {
  const userId = 1; // Replace with dynamic ID if needed

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    profileImage: null,
    newPassword: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data
  useEffect(() => {
    axios.get(`${API_URL}/user/profile/${userId}`)
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setFormData({
          name: u.name || '',
          phone: u.phone || '',
          gender: u.gender || '',
          profileImage: null,
          newPassword: '',
        });
        setPreviewImage(`${API_URL}/${u.profileImage}`);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file)); // For live preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateForm = new FormData();
    updateForm.append('name', formData.name);
    updateForm.append('phone', formData.phone);
    updateForm.append('gender', formData.gender);
    if (formData.profileImage) updateForm.append('profileImage', formData.profileImage);
    if (formData.newPassword) updateForm.append('newPassword', formData.newPassword);

    try {
      const response = await axios.put(`${API_URL}/user/profile/${userId}`, updateForm);
      if (response.data.success) {
        // Update localStorage with new user data
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...storedUser,
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          profileImage: response.data.user?.profileImage || storedUser.profileImage
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('Profile updated!');
        setEditing(false);
        // Trigger a refresh of user data instead of page reload
        setUser(updatedUser);
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };

  if (!user) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            {!editing ? (
              <div className="card-body">
                <div className="text-center mb-4">
                  {user.profileImage ? (
                    <img
                      src={`${API_URL}/${user.profileImage}`}
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-secondary rounded-circle mx-auto mb-3" 
                         style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-person-fill text-white" style={{ fontSize: '4rem' }}></i>
                    </div>
                  )}
                  <h2 className="card-title">{user.name}</h2>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted mb-2">Contact Information</h6>
                  <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Gender:</strong> {user.gender}</p>
                </div>

                <div className="text-center">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <div className="text-center mb-3">
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="rounded-circle mb-2"
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="form-control" 
                      name="profileImage" 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select 
                      className="form-select"
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">New Password (optional)</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button" 
                        onClick={togglePassword}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
