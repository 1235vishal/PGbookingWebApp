import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Table } from 'react-bootstrap';
import { API_URL } from '../config';

const TenantRentHistory = () => {
    const [rentHistory, setRentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);

    useEffect(() => {
        fetchRentHistory();
    }, []);

    const fetchRentHistory = async () => {
        try {
            const response = await fetch(`${API_URL}/rent-bills/all`);
            const data = await response.json();
            
            if (data.success) {
                setRentHistory(data.bills);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch rent history');
        } finally {
            setLoading(false);
        }
    };

    const handleShowDetails = async (tenantId) => {
        try {
            const response = await fetch(`${API_URL}/tenants/all-tenants`);
            const data = await response.json();
            
            if (data.success) {
                const tenant = data.tenants.find(t => t.id === tenantId);
                setSelectedTenant(tenant);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error fetching tenant details:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    <h4>Tenant Rent History</h4>
                </Card.Header>
                <Card.Body>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tenant Name</th>
                                <th>PG Name</th>
                                <th>Room Number</th>
                                <th>Payment Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentHistory.map((bill) => (
                                <tr key={bill.id}>
                                    <td>{bill.tenant_name}</td>
                                    <td>{bill.pg_name}</td>
                                    <td>{bill.room_number}</td>
                                    <td>
                                        {bill.payment_date 
                                            ? new Date(bill.payment_date).toLocaleDateString()
                                            : 'Not paid'
                                        }
                                    </td>
                                    <td>₹{bill.amount}</td>
                                    <td>
                                        <span className={`badge bg-${bill.status === 'paid' ? 'success' : 'warning'}`}>
                                            {bill.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="info" 
                                            size="sm"
                                            onClick={() => handleShowDetails(bill.tenant_id)}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Tenant Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tenant Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTenant && (
                        <div>
                            <h5>Personal Information</h5>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>{selectedTenant.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone:</strong></td>
                                        <td>{selectedTenant.phone}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Check-in Date:</strong></td>
                                        <td>{new Date(selectedTenant.check_in_date).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <h5 className="mt-4">PG Information</h5>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td><strong>PG Name:</strong></td>
                                        <td>{selectedTenant.pg_name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Room Number:</strong></td>
                                        <td>{selectedTenant.room_number}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Floor/Wing:</strong></td>
                                        <td>{selectedTenant.floor_wing}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Monthly Rent:</strong></td>
                                        <td>₹{selectedTenant.rent}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TenantRentHistory;