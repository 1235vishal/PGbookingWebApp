import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import './Styles/ContactLeads.css';

const ContactLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContactLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contact`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact leads');
      }
      
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactLeads();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      setLeads(leads.filter(lead => lead.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-alert">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="contact-leads-container">
      <div className="header">
        <h1>Contact Form Submissions</h1>
        <button className="refresh-btn" onClick={fetchContactLeads}>
          Refresh
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                <td className="message-cell">{lead.description}</td>
                <td>{new Date(lead.created_at).toLocaleString()}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactLeads;