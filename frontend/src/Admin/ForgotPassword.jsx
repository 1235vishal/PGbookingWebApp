import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './Styles/form.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Error processing request');
    }
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-box">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
          <p onClick={() => navigate('/admin/login')}>
            Remember password? <span className="link">Login</span>
          </p>
        </form>
      ) : (
        <div className="form-box">
          <h2>Email Sent!</h2>
          <p>Please check your email for the password reset link.</p>
          <button onClick={() => navigate('/admin/login')}>Back to Login</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;