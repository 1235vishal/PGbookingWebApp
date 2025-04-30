// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Addpg = () => {

//         const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         pg_name: '',
//         pg_type: '',
//         address: '',
//         rent_start_from: '',
//         number_of_floors: '',
//         latitude: '',
//         longitude: '',
//         zone: '',
//         facilities: [],
//         description: '',
//         owner_name: '',
//         phone_number: '',
//         email_address: ''
//     });

//     const [zones, setZones] = useState([]);
//     const [mainImage, setMainImage] = useState(null);
//     const [additionalImages, setAdditionalImages] = useState([]);
//     const [video, setVideo] = useState(null);

//     useEffect(() => {
//         axios.get('${API_URL}/zone')
//             .then(res => setZones(res.data))
//             .catch(err => console.log('Failed to fetch zones:', err));
//     }, []);

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFacilityChange = e => {
//         const { value, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             facilities: checked
//                 ? [...prev.facilities, value]
//                 : prev.facilities.filter(f => f !== value)
//         }));
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             if (key === 'facilities') {
//                 data.append(key, JSON.stringify(value));
//             } else {
//                 data.append(key, value);
//             }
//         });

//         if (mainImage) data.append('main_image', mainImage);
//         if (video) data.append('video_url', video);
//         additionalImages.forEach(img => data.append('additional_images', img));

//         try {
//             const res = await axios.post('${API_URL}/pg/add-pg', data);
//             alert(res.data.message);
//             // Reset form
//             setFormData({
//                 pg_name: '',
//                 pg_type: '',
//                 address: '',
//                 rent_start_from: '',
//                 number_of_floors: '',
//                 latitude: '',
//                 longitude: '',
//                 zone: '',
//                 facilities: [],
//                 description: '',
//                 owner_name: '',
//                 phone_number: '',
//                 email_address: ''
//             });
//             setMainImage(null);
//             setAdditionalImages([]);
//             setVideo(null);
//             document.getElementById('addpgform').reset(); // reset input file
//         } catch (err) {
//             console.error(err);
//             alert('Failed to add PG');
//         }
//     };

//     // const handleSubmit = async e => {
//     //     e.preventDefault();
//     //     const data = new FormData();
//     //     Object.entries(formData).forEach(([key, value]) => {
//     //         if (key === 'facilities') {
//     //             data.append(key, JSON.stringify(value));
//     //         } else {
//     //             data.append(key, value);
//     //         }
//     //     });

//     //     if (mainImage) data.append('main_image', mainImage);
//     //     if (video) data.append('video_url', video);
//     //     additionalImages.forEach(img => data.append('additional_images', img));

//     //     try {
//     //         const res = await axios.post('${API_URL}/pg/add-pg', data);
//     //         alert(res.data.message);

//     //         // Navigate to PgMap with lat/lng
//     //         navigate('/pg-map', {
//     //             state: {
//     //                 lat: parseFloat(formData.latitude),
//     //                 lng: parseFloat(formData.longitude),
//     //                 pgName: formData.pg_name
//     //             }
//     //         });

//     //         // Reset form
//     //         setFormData({
//     //             pg_name: '',
//     //             pg_type: '',
//     //             address: '',
//     //             rent_start_from: '',
//     //             number_of_floors: '',
//     //             latitude: '',
//     //             longitude: '',
//     //             zone: '',
//     //             facilities: [],
//     //             description: '',
//     //             owner_name: '',
//     //             phone_number: '',
//     //             email_address: ''
//     //         });
//     //         setMainImage(null);
//     //         setAdditionalImages([]);
//     //         setVideo(null);
//     //         document.getElementById('addpgform').reset();
//     //     } catch (err) {
//     //         console.error(err);
//     //         alert('Failed to add PG');
//     //     }
//     // };
//     return (
//         <div className="container mt-4 mb-5">
//             <h2 className="text-center text-primary mb-4">Add New PG</h2>
//             <form id="addpgform" onSubmit={handleSubmit} encType="multipart/form-data">
//                 {/* PG Details */}
//                 <div className="row bg-light p-3 rounded shadow mb-3">
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="text" name="pg_name" value={formData.pg_name} placeholder="PG Name" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <select className="form-select" name="pg_type" value={formData.pg_type} onChange={handleChange} required>
//                             <option value="">Select Type</option>
//                             <option value="Boys">Boys</option>
//                             <option value="Girls">Girls</option>
//                             <option value="Co-ed">Co-ed</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required />
//                     </div>
//                 </div>

//                 {/* Location & Rent */}
//                 <div className="row bg-warning p-3 rounded shadow mb-3">
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="number" name="rent_start_from" value={formData.rent_start_from} placeholder="Rent Start From" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="number" name="number_of_floors" value={formData.number_of_floors} placeholder="Number of Floors" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-2 mb-3">
//                         <input className="form-control" type="text" name="latitude" value={formData.latitude} placeholder="Latitude" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-2 mb-3">
//                         <input className="form-control" type="text" name="longitude" value={formData.longitude} placeholder="Longitude" onChange={handleChange} required />
//                     </div>
//                 </div>

//                 {/* Zone */}
//                 <div className="row bg-info p-3 rounded shadow mb-3">
//                     <div className="col-md-6 mb-3">
//                         <select className="form-select" name="zone" value={formData.zone} onChange={handleChange} required>
//                             <option value="">Select Zone</option>
//                             {zones.map((z) => (
//                                 <option key={z.id} value={z.name}>{z.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* Media Uploads */}
//                 <div className="row bg-secondary text-white p-3 rounded shadow mb-3">
//                     <div className="col-md-4 mb-3">
//                         <label>Main PG Image:
//                             <input className="form-control" type="file" onChange={e => setMainImage(e.target.files[0])} />
//                         </label>
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <label>Additional Images:
//                             <input className="form-control" type="file" multiple onChange={e => setAdditionalImages([...e.target.files])} />
//                         </label>
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <label>Video Upload:
//                             <input className="form-control" type="file" onChange={e => setVideo(e.target.files[0])} />
//                         </label>
//                     </div>
//                 </div>

//                 {/* Facilities */}
//                 <div className="row bg-light p-3 rounded shadow mb-3">
//                     <div className="col-md-12 mb-2">
//                         <label className="form-label">Facilities:</label><br />
//                         {['Fully Furnished', 'Parking', 'AC', 'WiFi'].map(facility => (
//                             <label key={facility} className="form-check-label me-3">
//                                 <input
//                                     type="checkbox"
//                                     className="form-check-input me-1"
//                                     value={facility}
//                                     onChange={handleFacilityChange}
//                                     checked={formData.facilities.includes(facility)}
//                                 />
//                                 {facility}
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Description */}
//                 <div className="row bg-light p-3 rounded shadow mb-3">
//                     <div className="col-md-12 mb-3">
//                         <textarea className="form-control" rows="3" name="description" value={formData.description} placeholder="Description" onChange={handleChange}></textarea>
//                     </div>
//                 </div>

//                 {/* Owner Info */}
//                 <div className="row bg-danger text-white p-3 rounded shadow mb-3">
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="text" name="owner_name" value={formData.owner_name} placeholder="Owner Name" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="text" name="phone_number" value={formData.phone_number} placeholder="Phone Number" onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                         <input className="form-control" type="email" name="email_address" value={formData.email_address} placeholder="Email Address" onChange={handleChange} required />
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="text-center">
//                     <button className="btn btn-success px-5" type="submit">Add PG</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Addpg;

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Addpg = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pg_name: '',
        pg_type: '',
        address: '',
        rent_start_from: '',
        number_of_floors: '',
        latitude: '',
        longitude: '',
        zone: '',
        facilities: [],
        description: '',
        owner_name: '',
        phone_number: '',
        email_address: ''
    });

    const [zones, setZones] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/zone`)
            .then(res => setZones(res.data))
            .catch(err => console.log('Failed to fetch zones:', err));
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFacilityChange = e => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            facilities: checked
                ? [...prev.facilities, value]
                : prev.facilities.filter(f => f !== value)
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formDataToSend = new FormData();
        
        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'facilities') {
                formDataToSend.append(key, JSON.stringify(value));
            } else {
                formDataToSend.append(key, value);
            }
        });

        // Append files with correct field names
        if (mainImage) {
            formDataToSend.append('main_image', mainImage);
        }
        
        if (additionalImages.length > 0) {
            additionalImages.forEach(img => {
                formDataToSend.append('additional_images', img);
            });
        }
        
        if (video) {
            formDataToSend.append('video_url', video);
        }

        try {
            const res = await axios.post(`${API_URL}/pg/add-pg`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            alert(res.data.message);
            
            // Navigate to PgMap with lat/lng
            navigate('/pg-map', {
                state: {
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude),
                    pgName: formData.pg_name
                }
            });

            // Reset form
            setFormData({
                pg_name: '',
                pg_type: '',
                address: '',
                rent_start_from: '',
                number_of_floors: '',
                latitude: '',
                longitude: '',
                zone: '',
                facilities: [],
                description: '',
                owner_name: '',
                phone_number: '',
                email_address: ''
            });
            setMainImage(null);
            setAdditionalImages([]);
            setVideo(null);
            document.getElementById('addpgform').reset();
        } catch (err) {
            console.error('Submission error:', err);
            alert(`Failed to add PG: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <h2 className="text-center text-primary mb-4">Add New PG</h2>
            <form id="addpgform" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* PG Details */}
                <div className="row bg-light p-3 rounded shadow mb-3">
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="text" name="pg_name" value={formData.pg_name} placeholder="PG Name" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <select className="form-select" name="pg_type" value={formData.pg_type} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                            <option value="Co-ed">Co-ed</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required />
                    </div>
                </div>

                {/* Location & Rent */}
                <div className="row bg-warning p-3 rounded shadow mb-3">
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="number" name="rent_start_from" value={formData.rent_start_from} placeholder="Rent Start From" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="number" name="number_of_floors" value={formData.number_of_floors} placeholder="Number of Floors" onChange={handleChange} required />
                    </div>
                    <div className="col-md-2 mb-3">
                        <input className="form-control" type="text" name="latitude" value={formData.latitude} placeholder="Latitude" onChange={handleChange} required />
                    </div>
                    <div className="col-md-2 mb-3">
                        <input className="form-control" type="text" name="longitude" value={formData.longitude} placeholder="Longitude" onChange={handleChange} required />
                    </div>
                </div>

                {/* Zone */}
                <div className="row bg-info p-3 rounded shadow mb-3">
                    <div className="col-md-6 mb-3">
                        <select className="form-select" name="zone" value={formData.zone} onChange={handleChange} required>
                            <option value="">Select Zone</option>
                            {zones.map((z) => (
                                <option key={z.id} value={z.name}>{z.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Media Uploads */}
                <div className="row bg-secondary text-white p-3 rounded shadow mb-3">
                    <div className="col-md-4 mb-3">
                        <label>Main PG Image:
                            <input className="form-control" type="file" name="main_image" onChange={e => setMainImage(e.target.files[0])} required />
                        </label>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Additional Images:
                            <input className="form-control" type="file" name="additional_images" multiple onChange={e => setAdditionalImages([...e.target.files])} />
                        </label>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Video Upload:
                            <input className="form-control" type="file" name="video_url" onChange={e => setVideo(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                {/* Facilities */}
                <div className="row bg-light p-3 rounded shadow mb-3">
                    <div className="col-md-12 mb-2">
                        <label className="form-label">Facilities:</label><br />
                        {['Fully Furnished', 'Parking', 'AC', 'WiFi'].map(facility => (
                            <label key={facility} className="form-check-label me-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-1"
                                    name="facilities"
                                    value={facility}
                                    onChange={handleFacilityChange}
                                    checked={formData.facilities.includes(facility)}
                                />
                                {facility}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="row bg-light p-3 rounded shadow mb-3">
                    <div className="col-md-12 mb-3">
                        <textarea className="form-control" rows="3" name="description" value={formData.description} placeholder="Description" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Owner Info */}
                <div className="row bg-danger text-white p-3 rounded shadow mb-3">
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="text" name="owner_name" value={formData.owner_name} placeholder="Owner Name" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="text" name="phone_number" value={formData.phone_number} placeholder="Phone Number" onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input className="form-control" type="email" name="email_address" value={formData.email_address} placeholder="Email Address" onChange={handleChange} required />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button className="btn btn-success px-5" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add PG'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addpg;