import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import './Styles/form.css';

function ResetPassword() {
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    // Validate token when component mounts
    const validateToken = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/validate-token/${token}`);
        const data = await res.json();
        setIsValidToken(res.ok);
      } catch (err) {
        setIsValidToken(false);
      }
      setLoading(false);
    };

    if (token) {
      validateToken();
    } else {
      setLoading(false);
      setIsValidToken(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.newPassword !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });

      const data = await res.json();
      alert(data.message);
      
      if (res.ok) {
        navigate('/admin/login');
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Error processing request');
    }
  };

  if (loading) {
    return <div className="form-container">Loading...</div>;
  }

  if (!isValidToken) {
    return (
      <div className="form-container">
        <div className="form-box">
          <h2>Invalid or Expired Link</h2>
          <p>This password reset link is invalid or has expired.</p>
          <button onClick={() => navigate('/admin/login')}>Back to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;