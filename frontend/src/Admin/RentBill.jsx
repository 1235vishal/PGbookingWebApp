import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

const RentBill = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [phone, setPhone] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [rent, setRent] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const response = await fetch(`${API_URL}/tenants/all-tenants`);
                const data = await response.json();
                
                if (data.success) {
                    const foundTenant = data.tenants.find(t => t.id === parseInt(id));
                    if (foundTenant) {
                        setTenant(foundTenant);
                        setPhone(foundTenant.phone || '');
                        setRent(foundTenant.rent || ''); // Set initial rent value
                    } else {
                        setError('Tenant not found');
                    }
                } else {
                    setError('Failed to fetch tenant details');
                }
            } catch (error) {
                setError('Error fetching tenant details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTenant();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/rent-bills/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenant_id: tenant.id,
                    tenant_name: tenant.name,
                    tenant_phone: phone,
                    pg_name: tenant.pg_name,
                    room_number: tenant.room_number,
                    due_date: dueDate,
                    amount: rent,
                    message: message
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to generate rent bill');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!tenant) return <Alert variant="warning">Tenant not found</Alert>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Generate Rent Bill</Card.Header>
                <Card.Body>
                    {showSuccess && (
                        <Alert variant="success">
                            Rent bill generated successfully!
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tenant Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={tenant?.name || ''}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>PG Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={tenant?.pg_name || ''}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={tenant?.room_number || ''}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Room Rent</Form.Label>
                            <Form.Control
                                type="number"
                                value={rent}
                                onChange={(e) => setRent(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter any additional message for the rent bill..."
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Generate Bill
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RentBill;