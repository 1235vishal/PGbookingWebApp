import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Table } from 'react-bootstrap';
import { API_URL } from '../config';
import './Rents.css';

const Rents = () => {
    const [rentBills, setRentBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user')); // Changed to match Tenant.jsx

    useEffect(() => {
        const fetchRentBills = async () => {
            try {
                if (!user?.id) {
                    throw new Error('User not found');
                }

                // First get the tenant details for the user
                const tenantResponse = await fetch(`${API_URL}/tenants/user/${user.id}`);
                const tenantData = await tenantResponse.json();

                if (!tenantData.success) {
                    throw new Error(tenantData.message);
                }

                // Get rent bills for each tenant
                const allBills = [];
                for (const tenant of tenantData.tenants) {
                    const billsResponse = await fetch(`${API_URL}/rent-bills/tenant/${tenant.id}`);
                    const billsData = await billsResponse.json();
                    
                    if (billsData.success) {
                        allBills.push(...billsData.bills);
                    }
                }

                setRentBills(allBills);
            } catch (error) {
                console.error('Error fetching data:', error); // Added console.error
                setError(error.message || 'Failed to fetch rent bills');
            } finally {
                setLoading(false);
            }
        };

        fetchRentBills();
    }, [user?.id]); // Changed dependency to user?.id

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    const handlePayment = async (bill) => {
        try {
            console.log('Initiating payment for bill:', bill);
            
            const orderRes = await fetch(`${API_URL}/rent-bills/create-payment/${bill.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });
    
            if (!orderRes.ok) {
                throw new Error('Failed to create payment order');
            }
    
            const orderData = await orderRes.json();
            
            if (!orderData.success) {
                throw new Error(orderData.message || 'Failed to create payment order');
            }
    
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Changed from process.env to import.meta.env
                amount: bill.amount * 100,
                currency: "INR",
                name: `${bill.pg_name}`,
                description: `Rent payment for ${bill.pg_name}`,
                order_id: orderData.order.id,
                 prefill: {
            name: bill.tenant_name,
            contact: bill.tenant_phone,
            email: user.email  // Add this line to enable email notifications
        },
                handler: async function (response) {
                    try {
                        const verifyRes = await fetch(`${API_URL}/rent-bills/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });
    
                        if (!verifyRes.ok) {
                            throw new Error('Payment verification failed');
                        }
    
                        const verifyData = await verifyRes.json();
                        
                        if (verifyData.success) {
                            alert('Payment successful!');
                            window.location.reload();
                        } else {
                            throw new Error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('Error verifying payment: ' + error.message);
                    }
                },
                // prefill: {
                //     name: bill.tenant_name,
                //     contact: bill.tenant_phone
                // },
                theme: {
                    color: "#3399cc"
                },
                modal: {
                    ondismiss: function() {
                        alert('Payment cancelled');
                    }
                }
            };
    
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert('Payment failed: ' + response.error.description);
            });
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error initiating payment: ' + error.message);
        }
    };

    const RentCard = ({ bill }) => (
        <Card className="mb-3 rent-card">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                <h6 className="mb-0">Bill #{bill.id}</h6>
                <span className={`status-badge ${bill.status}`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </span>
            </Card.Header>
            <Card.Body className="p-3">
                <div className="rent-info-grid">
                    <div className="info-item">
                        <div className="info-label">PG Name</div>
                        <div className="info-value text-break">{bill.pg_name}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Room Number</div>
                        <div className="info-value">{bill.room_number}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Amount</div>
                        <div className="info-value fw-bold text-primary">₹{bill.amount}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Due Date</div>
                        <div className="info-value">{new Date(bill.due_date).toLocaleDateString()}</div>
                    </div>
                    {bill.message && (
                        <div className="info-item">
                            <div className="info-label">Message</div>
                            <div className="info-value text-break">{bill.message}</div>
                        </div>
                    )}
                </div>
                {bill.status === 'pending' && (
                    <div className="text-center mt-3">
                        <Button 
                            variant="success" 
                            size="lg"
                            className="w-100"
                            onClick={() => handlePayment(bill)}
                        >
                            Pay Now
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );

    return (
        <Container className="mt-4 mb-4">
            <Card>
                <Card.Header as="h5" className="bg-primary text-white">
                    <i className="fas fa-file-invoice-dollar me-2"></i>
                    My Rent Bills
                </Card.Header>
                <Card.Body className="p-2 p-md-3">
                    {rentBills.length === 0 ? (
                        <Alert variant="info">No rent bills found.</Alert>
                    ) : (
                        <>
                            {/* Table view for larger screens */}
                            <div className="d-none d-md-block">
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Bill ID</th>
                                            <th>PG Name</th>
                                            <th>Room Number</th>
                                            <th>Amount</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Message</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rentBills.map(bill => (
                                            <tr key={bill.id}>
                                                <td>{bill.id}</td>
                                                <td>{bill.pg_name}</td>
                                                <td>{bill.room_number}</td>
                                                <td>₹{bill.amount}</td>
                                                <td>{new Date(bill.due_date).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={`status-badge ${bill.status}`}>
                                                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td>{bill.message || '-'}</td>
                                                <td>
                                                    {bill.status === 'pending' && (
                                                        <Button 
                                                            variant="success" 
                                                            size="sm"
                                                            onClick={() => handlePayment(bill)}
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>

                            {/* Card view for mobile screens */}
                            <div className="d-md-none">
                                <div className="rent-cards-container">
                                    {rentBills.map(bill => (
                                        <RentCard key={bill.id} bill={bill} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Rents;
