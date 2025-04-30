import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './Styles/form.css';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    alert(data.message);
    localStorage.setItem('admin-token', data.token);
    navigate('/admin/dashboard');
  } catch (err) {
    console.error('Login request failed:', err);
    alert('Network error. Make sure backend is running.');
  }
};


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/admin/register')}>Don't have an account? <span className="link">Register</span></p>
        <p onClick={() => navigate('/admin/forgot-password')}>Forgot password? <span className="link">Reset it here</span></p>
      </form>
    </div>
  );
}

export default AdminLogin;
