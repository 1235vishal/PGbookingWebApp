// import React, { useEffect, useState } from 'react';
// import { API_URL } from '../config';

// const Tenant = () => {
//   const [tenants, setTenants] = useState([]); // Changed from tenantData to tenants array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchTenantData = async () => {
//       try {
//         if (!user?.id) {
//           throw new Error('User not found');
//         }

//         const response = await fetch(`${API_URL}/tenants/user/${user.id}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch tenant data');
//         }

//         setTenants(data.tenants || []); // Store the array of tenants
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTenantData();
//   }, [user?.id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (tenants.length === 0) return <div>No tenant information found.</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="text-center mb-4">My PG Rooms</h2>
//       {tenants.map((tenant) => (
//         <div key={tenant.id} className="card shadow mb-4">
//           <div className="card-header bg-primary text-white">
//             <h3 className="mb-0">Room {tenant.room_number}</h3>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-6">
//                 <h4>Personal Details</h4>
//                 <hr />
//                 <p><strong>Name:</strong> {tenant.name}</p>
//                 <p><strong>Phone:</strong> {tenant.phone}</p>
//                 <p><strong>Check-in Date:</strong> {new Date(tenant.check_in_date).toLocaleDateString()}</p>
//               </div>
//               <div className="col-md-6">
//                 <h4>PG Details</h4>
//                 <hr />
//                 <p><strong>PG Name:</strong> {tenant.pg_name}</p>
//                 <p><strong>Room Number:</strong> {tenant.room_number}</p>
//                 <p><strong>Floor/Wing:</strong> {tenant.floor_wing}</p>
//                 <p><strong>Monthly Rent:</strong> ₹{tenant.rent}</p>
//               </div>
//             </div>

//             <div className="row mt-4">
//               <div className="col-12">
//                 <h4>Documents</h4>
//                 <hr />
//                 <div className="d-flex gap-3">
//                   <a 
//                     href={`${API_URL}/${tenant.id_proof_front}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="btn btn-outline-primary"
//                   >
//                     View ID Proof (Front)
//                   </a>
//                   <a 
//                     href={`${API_URL}/${tenant.id_proof_back}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="btn btn-outline-primary"
//                   >
//                     View ID Proof (Back)
//                   </a>
//                   <a 
//                     href={`${API_URL}/${tenant.user_image}`} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="btn btn-outline-primary"
//                   >
//                     View Profile Photo
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tenant
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { API_URL } from '../config';
import '../User/Tenant.css'; // Create this CSS file for custom styles

const Tenant = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user?.id) {
          throw new Error('User not found. Please login again.');
        }

        const response = await fetch(`${API_URL}/tenants/user/${user.id}`);
        
        // Add artificial delay to showcase loading (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tenant data');
        }

        setTenants(data.tenants || []);
      } catch (err) {
        console.error('Error fetching tenant data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [user?.id]);

  // Loading state with animated spinner
  if (loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-primary">Loading your PG information...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error Loading Data</Alert.Heading>
          <p>{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  // No tenants found
  if (tenants.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="text-center">
          <Alert.Heading>No Tenant Information Found</Alert.Heading>
          <p>You don't have any registered PG rooms. Please contact your PG admin.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4 tenant-container">
      <h2 className="text-center mb-4 text-primary">My PG Rooms</h2>
      
      {tenants.map((tenant) => (
        <Card key={tenant.id} className="shadow mb-4 tenant-card">
          <Card.Header className="bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Room {tenant.room_number}</h3>
              <span className="badge bg-light text-primary">
                {tenant.status || 'Active'}
              </span>
            </div>
          </Card.Header>
          
          <Card.Body>
            <Row>
              <Col md={6}>
                <h4 className="section-title">Personal Details</h4>
                <hr className="section-divider" />
                <div className="tenant-detail">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{tenant.name}</span>
                </div>
                <div className="tenant-detail">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{tenant.phone}</span>
                </div>
                <div className="tenant-detail">
                  <span className="detail-label">Check-in Date:</span>
                  <span className="detail-value">
                    {new Date(tenant.check_in_date).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </Col>
              
              <Col md={6}>
                <h4 className="section-title">PG Details</h4>
                <hr className="section-divider" />
                <div className="tenant-detail">
                  <span className="detail-label">PG Name:</span>
                  <span className="detail-value">{tenant.pg_name}</span>
                </div>
                <div className="tenant-detail">
                  <span className="detail-label">Room Number:</span>
                  <span className="detail-value">{tenant.room_number}</span>
                </div>
                <div className="tenant-detail">
                  <span className="detail-label">Floor/Wing:</span>
                  <span className="detail-value">{tenant.floor_wing || 'N/A'}</span>
                </div>
                <div className="tenant-detail">
                  <span className="detail-label">Monthly Rent:</span>
                  <span className="detail-value text-success fw-bold">
                    ₹{tenant.rent}
                  </span>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
                <h4 className="section-title">Documents</h4>
                <hr className="section-divider" />
                <div className="d-flex flex-wrap gap-3 document-buttons">
                  <Button 
                    variant="outline-primary" 
                    href={`${API_URL}/${tenant.id_proof_front}`} 
                    target="_blank"
                    className="document-button"
                  >
                    <i className="bi bi-file-earmark-image me-2"></i>
                    ID Proof (Front)
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    href={`${API_URL}/${tenant.id_proof_back}`} 
                    target="_blank"
                    className="document-button"
                  >
                    <i className="bi bi-file-earmark-image me-2"></i>
                    ID Proof (Back)
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    href={`${API_URL}/${tenant.user_image}`} 
                    target="_blank"
                    className="document-button"
                  >
                    <i className="bi bi-person-square me-2"></i>
                    Profile Photo
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
          
          <Card.Footer className="text-muted">
            Last updated: {new Date(tenant.updated_at || tenant.created_at).toLocaleString()}
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default Tenant;