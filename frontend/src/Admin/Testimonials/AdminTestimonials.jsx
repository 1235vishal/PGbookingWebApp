// import React, { useEffect, useState } from 'react';
// import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
// import API_URL from '../../config';

// const AdminTestimonials = () => {
//     const [testimonials, setTestimonials] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [currentTestimonial, setCurrentTestimonial] = useState({
//         name: '',
//         rating: 5,
//         review: '',
//         image: null
//     });

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const fetchTestimonials = async () => {
//         try {
//             const response = await fetch(`${API_URL}/testimonials`);
//             const data = await response.json();
//             if (data.success) {
//                 setTestimonials(data.testimonials);
//             }
//         } catch (error) {
//             setError('Error fetching testimonials');
//         }
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setError('');
//     //     setSuccess('');

//     //     try {
//     //         const formData = new FormData();
//     //         formData.append('name', currentTestimonial.name);
//     //         formData.append('rating', currentTestimonial.rating);
//     //         formData.append('review', currentTestimonial.review);
//     //         if (currentTestimonial.image) {
//     //             formData.append('image', currentTestimonial.image);
//     //         }

//     //         const response = await fetch('${API_URL}/testimonials', {
//     //             method: 'POST',
//     //             body: formData
//     //         });

//     //         const data = await response.json();

//     //         if (data.success) {
//     //             setSuccess('Testimonial added successfully!');
//     //             setShowModal(false);
//     //             fetchTestimonials();
//     //             setCurrentTestimonial({ name: '', rating: 5, review: '', image: null });
//     //         } else {
//     //             setError(data.message || 'Failed to add testimonial');
//     //         }
//     //     } catch (error) {
//     //         setError('Error adding testimonial. Please try again.');
//     //     }
//     // };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//         const formData = new FormData();
//         formData.append('name', currentTestimonial.name);
//         formData.append('rating', currentTestimonial.rating);
//         formData.append('review', currentTestimonial.review);
//         if (currentTestimonial.image) {
//             formData.append('image', currentTestimonial.image);
//         }

//         const response = await fetch(`${API_URL}/testimonials`, {
//             method: 'POST',
//             body: formData
//             // Don't set Content-Type header - let the browser set it with the correct boundary
//         });

//            if (!response.ok) {
//                 const errorData = await response.text(); // Get the response as text first
//                 console.error('Server error:', errorData);
//                 throw new Error('Server returned an error');
//             }

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || 'Failed to add testimonial');
//         }

//         setSuccess('Testimonial added successfully!');
//         setShowModal(false);
//         fetchTestimonials();
//         setCurrentTestimonial({ name: '', rating: 5, review: '', image: null });
        
//     } catch (error) {
//         console.error('Error:', error);
//         setError(error.message || 'Error adding testimonial. Please try again.');
//     }
// };
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             setCurrentTestimonial({
//                 ...currentTestimonial,
//                 image: files[0]
//             });
//         } else {
//             setCurrentTestimonial({
//                 ...currentTestimonial,
//                 [name]: value
//             });
//         }
//     };

//     return (
//         <div className="container mt-4">
//             {error && <Alert variant="danger">{error}</Alert>}
//             {success && <Alert variant="success">{success}</Alert>}
            
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Manage Testimonials</h2>
//                 <Button variant="primary" onClick={() => setShowModal(true)}>
//                     Add New Testimonial
//                 </Button>
//             </div>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Rating</th>
//                         <th>Review</th>
//                         <th>Image</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 {/* <tbody>
//                     {testimonials.map((testimonial) => (
//                         <tr key={testimonial._id}>
//                             <td>{testimonial.name}</td>
//                             <td>{testimonial.rating}</td>
//                             <td>{testimonial.review}</td>
//                             <td>
//                                 {testimonial.image && (
//                                     <img 
//                                         src={`${API_URL}${testimonial.image}`}
//                                         alt={testimonial.name}
//                                         style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                                     />
//                                 )}
//                             </td>
//                             <td>
//                                 <Button variant="danger" size="sm">Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody> */}
//                 <tbody>
//     {testimonials.map((testimonial) => (
//         <tr key={testimonial.id}>  {/* Changed from _id to id */}
//             <td>{testimonial.name}</td>
//             <td>{testimonial.rating}</td>
//             <td>{testimonial.review}</td>
//             <td>
//                 {testimonial.image && (
//                     <img 
//                         src={`${API_URL}${testimonial.image}`}
//                         alt={testimonial.name}
//                         style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                     />
//                 )}
//             </td>
//             <td>
//                 <Button variant="danger" size="sm">Delete</Button>
//             </td>
//         </tr>
//     ))}
// </tbody>
//             </Table>

//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add New Testimonial</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="name"
//                                 value={currentTestimonial.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Rating</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="rating"
//                                 min="1"
//                                 max="5"
//                                 value={currentTestimonial.rating}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Review</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 name="review"
//                                 rows={3}
//                                 value={currentTestimonial.review}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Image</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 name="image"
//                                 accept="image/*"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit">
//                             Add Testimonial
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default AdminTestimonials;
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { API_URL } from '../../config';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentTestimonial, setCurrentTestimonial] = useState({
        name: '',
        rating: 5,
        review: '',
        image: null
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${API_URL}/testimonials`);
            const data = await response.json();
            if (data.success) {
                setTestimonials(data.testimonials);
            }
        } catch (error) {
            setError('Error fetching testimonials');
        }
    };

    const handleDeleteTestimonial = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`${API_URL}/testimonials/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (data.success) {
                    setSuccess('Testimonial deleted successfully!');
                    fetchTestimonials();
                } else {
                    setError(data.message || 'Failed to delete testimonial');
                }
            } catch (error) {
                setError('Error deleting testimonial. Please try again.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('name', currentTestimonial.name);
            formData.append('rating', currentTestimonial.rating);
            formData.append('review', currentTestimonial.review);
            if (currentTestimonial.image) {
                formData.append('image', currentTestimonial.image);
            }

            const response = await fetch(`${API_URL}/testimonials`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Server error:', errorData);
                throw new Error('Server returned an error');
            }

            const data = await response.json();

            setSuccess('Testimonial added successfully!');
            setShowModal(false);
            fetchTestimonials();
            setCurrentTestimonial({ name: '', rating: 5, review: '', image: null });
            
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error adding testimonial. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setCurrentTestimonial({
                ...currentTestimonial,
                image: files[0]
            });
        } else {
            setCurrentTestimonial({
                ...currentTestimonial,
                [name]: value
            });
        }
    };

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Testimonials</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add New Testimonial
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.rating}</td>
                            <td>{testimonial.review}</td>
                            <td>
                                {testimonial.image && (
                                    <img 
                                        src={`${API_URL}${testimonial.image}`}
                                        alt={testimonial.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                )}
                            </td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentTestimonial.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                min="1"
                                max="5"
                                value={currentTestimonial.rating}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="review"
                                rows={3}
                                value={currentTestimonial.review}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Testimonial
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminTestimonials;