import React, { useEffect, useState } from 'react';
import { API_URL, SERVER_URL } from '../config';

const Tenant = () => {
  const [tenants, setTenants] = useState([]); // Changed from tenantData to tenants array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        if (!user?.id) {
          throw new Error('User not found');
        }

        const response = await fetch(`${API_URL}/tenants/user/${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tenant data');
        }

        setTenants(data.tenants || []); // Store the array of tenants
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [user?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (tenants.length === 0) return <div>No tenant information found.</div>;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My PG Rooms</h2>
      {tenants.map((tenant) => (
        <div key={tenant.id} className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Room {tenant.room_number}</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h4>Personal Details</h4>
                <hr />
                <p><strong>Name:</strong> {tenant.name}</p>
                <p><strong>Phone:</strong> {tenant.phone}</p>
                <p><strong>Check-in Date:</strong> {new Date(tenant.check_in_date).toLocaleDateString()}</p>
              </div>
              <div className="col-md-6">
                <h4>PG Details</h4>
                <hr />
                <p><strong>PG Name:</strong> {tenant.pg_name}</p>
                <p><strong>Room Number:</strong> {tenant.room_number}</p>
                <p><strong>Floor/Wing:</strong> {tenant.floor_wing}</p>
                <p><strong>Monthly Rent:</strong> ₹{tenant.rent}</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <h4>Documents</h4>
                <hr />
                <div className="d-flex gap-3">
                  <a 
                    href={`${SERVER_URL}/${tenant.id_proof_front}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    View ID Proof (Front)
                  </a>
                  <a 
                    href={`${SERVER_URL}/${tenant.id_proof_back}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    View ID Proof (Back)
                  </a>
                  <a 
                    href={`${SERVER_URL}/${tenant.user_image}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    View Profile Photo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tenant