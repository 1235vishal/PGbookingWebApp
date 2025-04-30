// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTestimonial = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         rating: '',
//         review: '',
//         image: null
//     });
//     const [alert, setAlert] = useState({ type: '', message: '' });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             setFormData({ ...formData, image: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const data = new FormData();
//             data.append('name', formData.name);
//             data.append('rating', formData.rating);
//             data.append('review', formData.review);
//             if (formData.image) {
//                 data.append('image', formData.image);
//             }

//             const response = await axios.post('${API_URL}/testimonials/create', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             if (response.data.success) {
//                 setAlert({ type: 'success', message: 'Testimonial added successfully!' });
//                 setFormData({ name: '', rating: '', review: '', image: null });
//                 // Reset file input
//                 document.getElementById('image').value = '';
//             }
//         } catch (error) {
//             setAlert({ type: 'danger', message: error.response?.data?.message || 'Error adding testimonial' });
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <div className="card">
//                 <div className="card-header">
//                     <h4>Add New Testimonial</h4>
//                 </div>
//                 <div className="card-body">
//                     {alert.message && (
//                         <div className={`alert alert-${alert.type}`} role="alert">
//                             {alert.message}
//                         </div>
//                     )}
                    
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="name" className="form-label">Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="rating" className="form-label">Rating (1-5)</label>
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 id="rating"
//                                 name="rating"
//                                 min="1"
//                                 max="5"
//                                 step="0.1"
//                                 value={formData.rating}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="review" className="form-label">Review</label>
//                             <textarea
//                                 className="form-control"
//                                 id="review"
//                                 name="review"
//                                 rows="3"
//                                 value={formData.review}
//                                 onChange={handleChange}
//                                 required
//                             ></textarea>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="image" className="form-label">User Image</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 id="image"
//                                 name="image"
//                                 accept="image/*"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="btn btn-primary">
//                             Add Testimonial
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddTestimonial;