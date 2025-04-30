import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { API_URL } from '../config';
import './Message.css';

const Message = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await fetch(`${API_URL}/tenants/all-tenants`);
      const data = await response.json();
      if (data.success) {
        setTenants(data.tenants);
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const openWhatsApp = (phoneNumber) => {
    // Format phone number to remove any special characters
    const formattedNumber = phoneNumber.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  return (
    <div className="message-container">
      <div className="tenants-list">
        <h3 className="text-center mb-4">Tenants Directory</h3>
        
        {/* Desktop View */}
        <div className="table-responsive d-none d-md-block">
          <table className="table table-hover custom-table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>PG Name</th>
                <th>Room No</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="table-row">
                  <td>{tenant.name}</td>
                  <td>{tenant.pg_name}</td>
                  <td>{tenant.room_number}</td>
                  <td>{tenant.phone}</td>
                  <td>
                    <button 
                      className="btn btn-success btn-sm whatsapp-btn"
                      onClick={() => openWhatsApp(tenant.phone)}
                    >
                      <FaWhatsapp className="whatsapp-icon" /> Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="tenant-cards d-md-none">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="tenant-card">
              <div className="tenant-info">
                <h5>{tenant.name}</h5>
                <p><strong>PG:</strong> {tenant.pg_name}</p>
                <p><strong>Room:</strong> {tenant.room_number}</p>
                <p><strong>Phone:</strong> {tenant.phone}</p>
              </div>
              <button 
                className="btn btn-success whatsapp-btn w-100"
                onClick={() => openWhatsApp(tenant.phone)}
              >
                <FaWhatsapp className="whatsapp-icon" /> Chat on WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;