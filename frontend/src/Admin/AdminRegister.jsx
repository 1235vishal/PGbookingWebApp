import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './Styles/form.css';

function AdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate('/admin/login');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Admin Register</h2>
        <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <input type="password" placeholder="Confirm Password" onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
        <button type="submit">Register</button>
        <p onClick={() => navigate('/admin/login')}>Already have an account? <span className="link">Login</span></p>
      </form>
    </div>
  );
}

export default AdminRegister;
