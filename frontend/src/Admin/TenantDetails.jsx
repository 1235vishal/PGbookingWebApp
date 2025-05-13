// import { Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
// import { Buffer } from 'buffer';
// import React, { useEffect, useNavigate, useState } from 'react';
// import { Button } from 'react-bootstrap'; // Add this import
// import { useParams } from 'react-router-dom';
// import './BookingUser.css';
// window.Buffer = Buffer;

// // Define PDF styles
// // const styles = StyleSheet.create({
// //     page: {
// //         flexDirection: 'column',
// //         backgroundColor: '#ffffff',
// //         padding: 30
// //     },
// //     header: {
// //         marginBottom: 20,
// //         borderBottom: 1,
// //         borderBottomColor: '#112233',
// //         paddingBottom: 10
// //     },
// //     title: {
// //         fontSize: 24,
// //         textAlign: 'center',
// //         color: '#112233'
// //     },
// //     subtitle: {
// //         fontSize: 14,
// //         textAlign: 'center',
// //         color: '#666',
// //         marginTop: 5
// //     },
// //     section: {
// //         margin: 10,
// //         padding: 10
// //     },
// //     sectionTitle: {
// //         fontSize: 16,
// //         color: '#112233',
// //         marginBottom: 10,
// //         borderBottom: 1,
// //         borderBottomColor: '#cccccc',
// //         paddingBottom: 5
// //     },
// //     row: {
// //         flexDirection: 'row',
// //         marginBottom: 8
// //     },
// //     label: {
// //         width: 150,
// //         fontSize: 12,
// //         color: '#666666'
// //     },
// //     value: {
// //         flex: 1,
// //         fontSize: 12,
// //         color: '#000000'
// //     },
// //     imageContainer: {
// //         marginTop: 15,
// //         alignItems: 'center'
// //     },
// //     image: {
// //         width: 200,
// //         height: 200,
// //         objectFit: 'cover',
// //         marginBottom: 10
// //     },
// //     footer: {
// //         position: 'absolute',
// //         bottom: 30,
// //         left: 30,
// //         right: 30,
// //         textAlign: 'center',
// //         color: '#666',
// //         fontSize: 10,
// //         borderTop: 1,
// //         borderTopColor: '#cccccc',
// //         paddingTop: 10
// //     }
// // });

// // // Create PDF Document Component
// // const TenantPDF = ({ tenant }) => (
// //     <Document>
// //         <Page size="A4" style={styles.page}>
// //             <View style={styles.header}>
// //                 <Text style={styles.title}>Tenant Details Report</Text>
// //                 <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
// //             </View>

// //             <View style={styles.section}>
// //                 <Text style={styles.sectionTitle}>Personal Information</Text>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Name:</Text>
// //                     <Text style={styles.value}>{tenant.name}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Phone Number:</Text>
// //                     <Text style={styles.value}>{tenant.phone}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Tenant ID:</Text>
// //                     <Text style={styles.value}>{tenant.id}</Text>
// //                 </View>
// //             </View>

// //             <View style={styles.section}>
// //                 <Text style={styles.sectionTitle}>Accommodation Details</Text>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>PG Name:</Text>
// //                     <Text style={styles.value}>{tenant.pg_name}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Room Number:</Text>
// //                     <Text style={styles.value}>{tenant.room_number}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Floor/Wing:</Text>
// //                     <Text style={styles.value}>{tenant.floor_wing}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Monthly Rent:</Text>
// //                     <Text style={styles.value}>₹{tenant.rent}</Text>
// //                 </View>
// //                 <View style={styles.row}>
// //                     <Text style={styles.label}>Check-in Date:</Text>
// //                     <Text style={styles.value}>
// //                         {new Date(tenant.check_in_date).toLocaleDateString()}
// //                     </Text>
// //                 </View>
// //             </View>

// //             {tenant.profile_image && (
// //                 <View style={styles.section}>
// //                     <Text style={styles.sectionTitle}>Tenant Photo</Text>
// //                     <View style={styles.imageContainer}>
// //                         <Image
// //                             style={styles.image}
// //                             src={tenant.profile_image}
// //                         />
// //                     </View>
// //                 </View>
// //             )}

// //             <View style={styles.documentSection}>
// //                 <Text style={styles.sectionTitle}>Identity Documents</Text>
// //                 <View style={styles.documentGrid}>
// //                     <View style={styles.documentCard}>
// //                         <Text style={styles.documentTitle}>ID Proof (Front)</Text>
// //                         <Image
// //                             style={styles.documentImage}
// //                             src={`http://localhost:5000/${tenant.id_proof_front}`}
// //                         />
// //                     </View>
// //                     <View style={styles.documentCard}>
// //                         <Text style={styles.documentTitle}>ID Proof (Back)</Text>
// //                         <Image
// //                             style={styles.documentImage}
// //                             src={`http://localhost:5000/${tenant.id_proof_back}`}
// //                         />
// //                     </View>
// //                     <View style={styles.documentCard}>
// //                         <Text style={styles.documentTitle}>User Photo</Text>
// //                         <Image
// //                             style={styles.documentImage}
// //                             src={`http://localhost:5000/${tenant.user_image}`}
// //                         />
// //                     </View>
// //                 </View>
// //             </View>

// //             <View style={styles.footer}>
// //                 <Text>This is an official tenant report generated by PG Booking System</Text>
// //                 <Text>Document ID: {tenant.id}-{new Date().getTime()}</Text>
// //             </View>
// //         </Page>
// //     </Document>
// // );

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'column',
//         backgroundColor: '#ffffff',
//         padding: 40,
//         fontFamily: 'Helvetica'
//     },
//     header: {
//         marginBottom: 30,
//         paddingBottom: 20,
//         borderBottom: '1px solid #e0e0e0',
//         textAlign: 'center'
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         marginBottom: 5
//     },
//     subtitle: {
//         fontSize: 12,
//         color: '#7f8c8d',
//         textTransform: 'uppercase',
//         letterSpacing: 1
//     },
//     logo: {
//         width: 80,
//         height: 80,
//         marginBottom: 10,
//         alignSelf: 'center'
//     },
//     section: {
//         marginBottom: 20
//     },
//     sectionTitle: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         marginBottom: 10,
//         paddingBottom: 5,
//         borderBottom: '1px solid #e0e0e0'
//     },
//     row: {
//         flexDirection: 'row',
//         marginBottom: 8,
//         alignItems: 'flex-start'
//     },
//     label: {
//         width: 120,
//         fontSize: 10,
//         color: '#7f8c8d',
//         fontWeight: 'bold',
//         textTransform: 'uppercase'
//     },
//     value: {
//         flex: 1,
//         fontSize: 10,
//         color: '#34495e'
//     },
//     documentSection: {
//         marginTop: 20
//     },
//     documentGrid: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//         marginTop: 10
//     },
//     documentCard: {
//         width: '30%',
//         marginBottom: 15,
//         border: '1px solid #e0e0e0',
//         padding: 10,
//         borderRadius: 4
//     },
//     documentTitle: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         marginBottom: 5,
//         textAlign: 'center'
//     },
//     documentImage: {
//         width: '100%',
//         height: 80,
//         objectFit: 'cover',
//         border: '1px solid #eee'
//     },
//     profileImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         border: '3px solid #fff',
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//         alignSelf: 'center',
//         marginBottom: 15
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 0,
//         right: 0,
//         textAlign: 'center',
//         paddingTop: 10,
//         borderTop: '1px solid #e0e0e0',
//         fontSize: 8,
//         color: '#95a5a6'
//     },
//     watermark: {
//         position: 'absolute',
//         opacity: 0.1,
//         fontSize: 60,
//         color: '#2c3e50',
//         transform: 'rotate(-45deg)',
//         textAlign: 'center',
//         width: '100%',
//         top: '40%'
//     },
//     highlightBox: {
//         backgroundColor: '#f8f9fa',
//         padding: 15,
//         borderRadius: 5,
//         marginBottom: 15,
//         borderLeft: '4px solid #3498db'
//     },
//     signatureArea: {
//         marginTop: 30,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingTop: 10,
//         borderTop: '1px dashed #bdc3c7'
//     },
//     signatureLine: {
//         width: '45%',
//         textAlign: 'center',
//         fontSize: 9,
//         color: '#7f8c8d'
//     }
// });

// const TenantPDF = ({ tenant }) => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             {/* Watermark */}
//             <Text style={styles.watermark}>CONFIDENTIAL</Text>
            
//             {/* Header */}
//             <View style={styles.header}>
//                 <Image
//                     style={styles.logo}
//                     src="https://via.placeholder.com/80?text=PG+Logo"
//                 />
//                 <Text style={styles.title}>TENANT DETAILS REPORT</Text>
//                 <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString('en-US', { 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                 })}</Text>
//             </View>

//             {/* Highlight Box */}
//             <View style={styles.highlightBox}>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Tenant ID:</Text>
//                     <Text style={[styles.value, { fontWeight: 'bold' }]}>{tenant.id}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Status:</Text>
//                     <Text style={[styles.value, { color: '#27ae60', fontWeight: 'bold' }]}>Active</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Report Valid Until:</Text>
//                     <Text style={styles.value}>
//                         {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
//                     </Text>
//                 </View>
//             </View>

//             {/* Personal Information */}
//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
//                 {tenant.profile_image && (
//                     <Image
//                         style={styles.profileImage}
//                         src={tenant.profile_image}
//                     />
//                 )}
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Full Name:</Text>
//                     <Text style={[styles.value, { fontWeight: 'bold' }]}>{tenant.name}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Contact Number:</Text>
//                     <Text style={styles.value}>{tenant.phone}</Text>
//                 </View>
//                 {/* <View style={styles.row}>
//                     <Text style={styles.label}>Email Address:</Text>
//                     <Text style={styles.value}>{tenant.email || 'Not provided'}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Emergency Contact:</Text>
//                     <Text style={styles.value}>{tenant.emergency_contact || 'Not provided'}</Text>
//                 </View> */}
//             </View>

//             {/* Accommodation Details */}
//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>ACCOMMODATION DETAILS</Text>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>PG Name:</Text>
//                     <Text style={styles.value}>{tenant.pg_name}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Room Number:</Text>
//                     <Text style={styles.value}>{tenant.room_number}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Floor/Wing:</Text>
//                     <Text style={styles.value}>{tenant.floor_wing}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Monthly Rent:</Text>
//                     <Text style={[styles.value, { color: '#e74c3c', fontWeight: 'bold' }]}>₹{tenant.rent}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Check-in Date:</Text>
//                     <Text style={styles.value}>
//                         {new Date(tenant.check_in_date).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         })}
//                     </Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Duration Stayed:</Text>
//                     <Text style={styles.value}>
//                         {calculateDuration(tenant.check_in_date)}
//                     </Text>
//                 </View>
//             </View>

//             {/* Documents Section */}
//             <View style={styles.documentSection}>
//                 <Text style={styles.sectionTitle}>IDENTITY DOCUMENTS</Text>
//                 <View style={styles.documentGrid}>
//                     <View style={styles.documentCard}>
//                         <Text style={styles.documentTitle}>ID Proof (Front)</Text>
//                         <Image
//                             style={styles.documentImage}
//                             src={`http://localhost:5000/${tenant.id_proof_front}`}
//                         />
//                     </View>
//                     <View style={styles.documentCard}>
//                         <Text style={styles.documentTitle}>ID Proof (Back)</Text>
//                         <Image
//                             style={styles.documentImage}
//                             src={`http://localhost:5000/${tenant.id_proof_back}`}
//                         />
//                     </View>
//                     <View style={styles.documentCard}>
//                         <Text style={styles.documentTitle}>User Photo</Text>
//                         <Image
//                             style={styles.documentImage}
//                             src={`http://localhost:5000/${tenant.user_image}`}
//                         />
//                     </View>
//                 </View>
//             </View>

//             {/* Terms and Conditions */}
//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>TERMS & CONDITIONS</Text>
//                 <Text style={[styles.value, { fontSize: 8, lineHeight: 1.5 }]}>
//                     1. This document is confidential and intended only for the use of PG management. 
//                     2. Any unauthorized distribution is prohibited. 
//                     3. Information is accurate as of the date of generation.
//                 </Text>
//             </View>

//             {/* Signature Area */}
//             <View style={styles.signatureArea}>
//                 <View style={styles.signatureLine}>
//                     <Text>_________________________</Text>
//                     <Text>Tenant Signature</Text>
//                 </View>
//                 <View style={styles.signatureLine}>
//                     <Text>_________________________</Text>
//                     <Text>PG Manager Signature</Text>
//                 </View>
//             </View>

//             {/* Footer */}
//             <View style={styles.footer}>
//                 <Text>PG Management System • {tenant.pg_name} • +91 XXXXX XXXXX</Text>
//                 <Text>Document ID: {tenant.id}-{new Date().getTime().toString().slice(-6)}</Text>
//             </View>
//         </Page>
//     </Document>
// );

// // Helper function to calculate duration stayed
// function calculateDuration(checkInDate) {
//     const checkIn = new Date(checkInDate);
//     const today = new Date();
//     const diffTime = Math.abs(today - checkIn);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//     const years = Math.floor(diffDays / 365);
//     const months = Math.floor((diffDays % 365) / 30);
//     const days = Math.floor((diffDays % 365) % 30);
    
//     let duration = [];
//     if (years > 0) duration.push(`${years} year${years > 1 ? 's' : ''}`);
//     if (months > 0) duration.push(`${months} month${months > 1 ? 's' : ''}`);
//     if (days > 0 || duration.length === 0) duration.push(`${days} day${days !== 1 ? 's' : ''}`);
    
//     return duration.join(' ');
// }

// const TenantDetails = () => {
//     const { id } = useParams();
//       const navigate = useNavigate(); // Initialize navigate
//     const [tenant, setTenant] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTenant, setEditedTenant] = useState(null);

//     useEffect(() => {
//         const fetchTenantDetails = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/tenants/all-tenants`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
                
//                 if (data.success) {
//                     const tenantData = data.tenants.find(t => t.id === parseInt(id));
//                     if (tenantData) {
//                         setTenant(tenantData);
//                     } else {
//                         setError('Tenant not found');
//                     }
//                 } else {
//                     setError(data.message || 'Failed to fetch tenant details');
//                 }
//             } catch (error) {
//                 console.error('Error fetching tenant details:', error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTenantDetails();
//     }, [id]);

//     const handleEdit = () => {
//         setIsEditing(true);
//         setEditedTenant({ ...tenant });
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//         setEditedTenant(null);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedTenant(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSave = async () => {
//         try {
//             // Format the date to MySQL compatible format (YYYY-MM-DD)
//             const formattedTenant = {
//                 ...editedTenant,
//                 check_in_date: new Date(editedTenant.check_in_date).toISOString().split('T')[0]
//             };

//             const response = await fetch(`${API_URL}/tenants/update/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formattedTenant),
//             });

//             const data = await response.json();
            
//             if (data.success) {
//                 setTenant(editedTenant);
//                 setIsEditing(false);
//                 setEditedTenant(null);
//             } else {
//                 setError(data.message || 'Failed to update tenant details');
//             }
//         } catch (error) {
//             console.error('Error updating tenant:', error);
//             setError(error.message);
//         }
//     };

//     if (loading) return <div className="loading">Loading...</div>;
//     if (error) return <div className="error">Error: {error}</div>;
//     if (!tenant) return <div className="error">Tenant not found</div>;

//     return (
//         <div className="tenant-details-container">
//             <div className="tenant-details-card">
//                 <div className="header-actions">
//                     <h2 className="page-title">Tenant Details</h2>
//                     <div className="button-group">
//                         {isEditing ? (
//                             <div className="edit-actions">
//                                 <Button variant="success" className="me-2" onClick={handleSave}>
//                                     <i className="fas fa-save"></i> Save
//                                 </Button>
//                                 <Button variant="secondary" onClick={handleCancel}>
//                                     <i className="fas fa-times"></i> Cancel
//                                 </Button>
//                             </div>
//                         ) : (
//                             <>
//                                 <Button variant="primary" className="me-2" onClick={handleEdit}>
//                                     <i className="fas fa-edit"></i> Edit
//                                 </Button>
//                                 <PDFDownloadLink
//                                     document={<TenantPDF tenant={tenant} />}
//                                     fileName={`tenant-${tenant?.id}-details.pdf`}
//                                 >
//                                     {({ blob, url, loading, error }) => (
//                                         <Button variant="info" className="me-2" disabled={loading}>
//                                             <i className="fas fa-file-pdf"></i> {loading ? 'Loading...' : 'Download PDF'}
//                                         </Button>
//                                     )}
//                                 </PDFDownloadLink>
//                                 <Button 
//                                     variant="success" 
//                                     onClick={() => navigate(`/admin/rent-bill/${tenant?.id}`)}
//                                 >
//                                     <i className="fas fa-file-invoice"></i> Generate Bill
//                                 </Button>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="tenant-info-section">
//                     <div className="info-panel">
//                         <div className="tenant-basic-info">
//                             <h3 className="section-title">
//                                 <i className="fas fa-user"></i> Personal Information
//                             </h3>
//                             <div className="form-grid">
//                                 <div className="form-group">
//                                     <label>Full Name:</label>
//                                     {isEditing ? (
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={editedTenant.name}
//                                             onChange={handleInputChange}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         <div className="form-value">{tenant.name}</div>
//                                     )}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Phone Number:</label>
//                                     {isEditing ? (
//                                         <input
//                                             type="text"
//                                             name="phone"
//                                             value={editedTenant.phone}
//                                             onChange={handleInputChange}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         <div className="form-value">{tenant.phone}</div>
//                                     )}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Check-in Date:</label>
//                                     {isEditing ? (
//                                         <input
//                                             type="date"
//                                             name="check_in_date"
//                                             value={editedTenant.check_in_date.split('T')[0]}
//                                             onChange={handleInputChange}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         <div className="form-value">
//                                             {new Date(tenant.check_in_date).toLocaleDateString()}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="tenant-pg-info">
//                             <h3 className="section-title">
//                                 <i className="fas fa-building"></i> PG Information
//                             </h3>
//                             <div className="form-grid">
//                                 <div className="form-group">
//                                     <label>PG Name:</label>
//                                     <div className="form-value">{tenant.pg_name}</div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Room Details:</label>
//                                     <div className="form-value">{`${tenant.room_number} (${tenant.floor_wing})`}</div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Monthly Rent:</label>
//                                     {isEditing ? (
//                                         <input
//                                             type="number"
//                                             name="rent"
//                                             value={editedTenant.rent}
//                                             onChange={handleInputChange}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         <div className="form-value highlight">₹{tenant.rent}</div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="tenant-documents">
//                         <h3 className="section-title">
//                             <i className="fas fa-file-alt"></i> Documents
//                         </h3>
//                         <div className="documents-grid">
//                             <div className="document-card">
//                                 <h4>ID Proof (Front)</h4>
//                                 <div className="document-image-container">
//                                     <img 
//                                         src={`http://localhost:5000/${tenant.id_proof_front}`} 
//                                         alt="ID Front" 
//                                         onClick={() => window.open(`http://localhost:5000/${tenant.id_proof_front}`, '_blank')}
//                                     />
//                                     <div className="image-overlay">
//                                         <span>Click to view</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="document-card">
//                                 <h4>ID Proof (Back)</h4>
//                                 <div className="document-image-container">
//                                     <img 
//                                         src={`http://localhost:5000/${tenant.id_proof_back}`} 
//                                         alt="ID Back" 
//                                         onClick={() => window.open(`http://localhost:5000/${tenant.id_proof_back}`, '_blank')}
//                                     />
//                                     <div className="image-overlay">
//                                         <span>Click to view</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="document-card">
//                                 <h4>User Photo</h4>
//                                 <div className="document-image-container">
//                                     <img 
//                                         src={`http://localhost:5000/${tenant.user_image}`} 
//                                         alt="User Photo" 
//                                         onClick={() => window.open(`http://localhost:5000/${tenant.user_image}`, '_blank')}
//                                     />
//                                     <div className="image-overlay">
//                                         <span>Click to view</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TenantDetails;
import { Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import './BookingUser.css';

// Initialize Buffer for PDF generation
window.Buffer = Buffer;

// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica'
    },
    header: {
        marginBottom: 30,
        paddingBottom: 20,
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 12,
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center'
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1px solid #e0e0e0'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start'
    },
    label: {
        width: 120,
        fontSize: 10,
        color: '#7f8c8d',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    value: {
        flex: 1,
        fontSize: 10,
        color: '#34495e'
    },
    documentSection: {
        marginTop: 20
    },
    documentGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10
    },
    documentCard: {
        width: '30%',
        marginBottom: 15,
        border: '1px solid #e0e0e0',
        padding: 10,
        borderRadius: 4
    },
    documentTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
        textAlign: 'center'
    },
    documentImage: {
        width: '100%',
        height: 80,
        objectFit: 'cover',
        border: '1px solid #eee'
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        border: '3px solid #fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        alignSelf: 'center',
        marginBottom: 15
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        paddingTop: 10,
        borderTop: '1px solid #e0e0e0',
        fontSize: 8,
        color: '#95a5a6'
    },
    watermark: {
        position: 'absolute',
        opacity: 0.1,
        fontSize: 60,
        color: '#2c3e50',
        transform: 'rotate(-45deg)',
        textAlign: 'center',
        width: '100%',
        top: '40%'
    },
    highlightBox: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        borderLeft: '4px solid #3498db'
    },
    signatureArea: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTop: '1px dashed #bdc3c7'
    },
    signatureLine: {
        width: '45%',
        textAlign: 'center',
        fontSize: 9,
        color: '#7f8c8d'
    }
});

// PDF Document Component
const TenantPDF = ({ tenant }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>CONFIDENTIAL</Text>
            
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    src="https://via.placeholder.com/80?text=PG+Logo"
                />
                <Text style={styles.title}>TENANT DETAILS REPORT</Text>
                <Text style={styles.subtitle}>
                    Generated on {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </Text>
            </View>

            <View style={styles.highlightBox}>
                <View style={styles.row}>
                    <Text style={styles.label}>Tenant ID:</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>{tenant.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={[styles.value, { color: '#27ae60', fontWeight: 'bold' }]}>Active</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Report Valid Until:</Text>
                    <Text style={styles.value}>
                        {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
                {tenant.profile_image && (
                    <Image
                        style={styles.profileImage}
                        src={tenant.profile_image}
                    />
                )}
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name:</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>{tenant.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Contact Number:</Text>
                    <Text style={styles.value}>{tenant.phone}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ACCOMMODATION DETAILS</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>PG Name:</Text>
                    <Text style={styles.value}>{tenant.pg_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Room Number:</Text>
                    <Text style={styles.value}>{tenant.room_number}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Floor/Wing:</Text>
                    <Text style={styles.value}>{tenant.floor_wing}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Monthly Rent:</Text>
                    <Text style={[styles.value, { color: '#e74c3c', fontWeight: 'bold' }]}>₹{tenant.rent}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Check-in Date:</Text>
                    <Text style={styles.value}>
                        {new Date(tenant.check_in_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Duration Stayed:</Text>
                    <Text style={styles.value}>
                        {calculateDuration(tenant.check_in_date)}
                    </Text>
                </View>
            </View>

            <View style={styles.documentSection}>
                <Text style={styles.sectionTitle}>IDENTITY DOCUMENTS</Text>
                <View style={styles.documentGrid}>
                    <View style={styles.documentCard}>
                        <Text style={styles.documentTitle}>ID Proof (Front)</Text>
                        <Image
                            style={styles.documentImage}
                            src={`${API_URL}/${tenant.id_proof_front}`}
                        />
                    </View>
                    <View style={styles.documentCard}>
                        <Text style={styles.documentTitle}>ID Proof (Back)</Text>
                        <Image
                            style={styles.documentImage}
                            src={`${API_URL}/${tenant.id_proof_back}`}
                        />
                    </View>
                    <View style={styles.documentCard}>
                        <Text style={styles.documentTitle}>User Photo</Text>
                        <Image
                            style={styles.documentImage}
                            src={`${API_URL}/${tenant.user_image}`}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>TERMS & CONDITIONS</Text>
                <Text style={[styles.value, { fontSize: 8, lineHeight: 1.5 }]}>
                    1. This document is confidential and intended only for the use of PG management. 
                    2. Any unauthorized distribution is prohibited. 
                    3. Information is accurate as of the date of generation.
                </Text>
            </View>

            <View style={styles.signatureArea}>
                <View style={styles.signatureLine}>
                    <Text>_________________________</Text>
                    <Text>Tenant Signature</Text>
                </View>
                <View style={styles.signatureLine}>
                    <Text>_________________________</Text>
                    <Text>PG Manager Signature</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>PG Management System • {tenant.pg_name} • +91 XXXXX XXXXX</Text>
                <Text>Document ID: {tenant.id}-{new Date().getTime().toString().slice(-6)}</Text>
            </View>
        </Page>
    </Document>
);

// Helper function to calculate duration stayed
function calculateDuration(checkInDate) {
    const checkIn = new Date(checkInDate);
    const today = new Date();
    const diffTime = Math.abs(today - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = Math.floor((diffDays % 365) % 30);
    
    let duration = [];
    if (years > 0) duration.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) duration.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0 || duration.length === 0) duration.push(`${days} day${days !== 1 ? 's' : ''}`);
    
    return duration.join(' ');
}

const TenantDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTenant, setEditedTenant] = useState(null);

    useEffect(() => {
        const fetchTenantDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/tenants/all-tenants`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.success) {
                    const tenantData = data.tenants.find(t => t.id === parseInt(id));
                    if (tenantData) {
                        setTenant(tenantData);
                    } else {
                        setError('Tenant not found');
                    }
                } else {
                    setError(data.message || 'Failed to fetch tenant details');
                }
            } catch (error) {
                console.error('Error fetching tenant details:', error);
                setError(`Failed to connect to server. Please check:
                    1. Backend server is running
                    2. Correct API endpoint
                    3. Network connection`);
            } finally {
                setLoading(false);
            }
        };

        fetchTenantDetails();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTenant({ ...tenant });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTenant(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTenant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const formattedTenant = {
                ...editedTenant,
                check_in_date: new Date(editedTenant.check_in_date).toISOString().split('T')[0]
            };

            const response = await fetch(`${API_URL}/tenants/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedTenant),
            });

            const data = await response.json();
            
            if (data.success) {
                setTenant(editedTenant);
                setIsEditing(false);
                setEditedTenant(null);
            } else {
                setError(data.message || 'Failed to update tenant details');
            }
        } catch (error) {
            console.error('Error updating tenant:', error);
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!tenant) return <div className="error">Tenant not found</div>;

    return (
        <div className="tenant-details-container">
            <div className="tenant-details-card">
                <div className="header-actions">
                    <h2 className="page-title">Tenant Details</h2>
                    <div className="button-group">
                        {isEditing ? (
                            <div className="edit-actions">
                                <Button variant="success" className="me-2" onClick={handleSave}>
                                    <i className="fas fa-save"></i> Save
                                </Button>
                                <Button variant="secondary" onClick={handleCancel}>
                                    <i className="fas fa-times"></i> Cancel
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="primary" className="me-2" onClick={handleEdit}>
                                    <i className="fas fa-edit"></i> Edit
                                </Button>
                                <PDFDownloadLink
                                    document={<TenantPDF tenant={tenant} />}
                                    fileName={`tenant-${tenant?.id}-details.pdf`}
                                >
                                    {({ blob, url, loading, error }) => (
                                        <Button variant="info" className="me-2" disabled={loading}>
                                            <i className="fas fa-file-pdf"></i> {loading ? 'Loading...' : 'Download PDF'}
                                        </Button>
                                    )}
                                </PDFDownloadLink>
                                <Button 
                                    variant="success" 
                                    onClick={() => navigate(`/admin/rent-bill/${tenant?.id}`)}
                                >
                                    <i className="fas fa-file-invoice"></i> Generate Bill
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="tenant-info-section">
                    <div className="info-panel">
                        <div className="tenant-basic-info">
                            <h3 className="section-title">
                                <i className="fas fa-user"></i> Personal Information
                            </h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedTenant.name}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        <div className="form-value">{tenant.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Phone Number:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editedTenant.phone}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        <div className="form-value">{tenant.phone}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Check-in Date:</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="check_in_date"
                                            value={editedTenant.check_in_date.split('T')[0]}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        <div className="form-value">
                                            {new Date(tenant.check_in_date).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="tenant-pg-info">
                            <h3 className="section-title">
                                <i className="fas fa-building"></i> PG Information
                            </h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>PG Name:</label>
                                    <div className="form-value">{tenant.pg_name}</div>
                                </div>
                                <div className="form-group">
                                    <label>Room Details:</label>
                                    <div className="form-value">{`${tenant.room_number} (${tenant.floor_wing})`}</div>
                                </div>
                                <div className="form-group">
                                    <label>Monthly Rent:</label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="rent"
                                            value={editedTenant.rent}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        <div className="form-value highlight">₹{tenant.rent}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tenant-documents">
                        <h3 className="section-title">
                            <i className="fas fa-file-alt"></i> Documents
                        </h3>
                        <div className="documents-grid">
                            <div className="document-card">
                                <h4>ID Proof (Front)</h4>
                                <div className="document-image-container">
                                    <img 
                                        src={`${API_URL}/${tenant.id_proof_front}`} 
                                        alt="ID Front" 
                                        onClick={() => window.open(`${API_URL}/${tenant.id_proof_front}`, '_blank')}
                                    />
                                    <div className="image-overlay">
                                        <span>Click to view</span>
                                    </div>
                                </div>
                            </div>
                            <div className="document-card">
                                <h4>ID Proof (Back)</h4>
                                <div className="document-image-container">
                                    <img 
                                        src={`${API_URL}/${tenant.id_proof_back}`} 
                                        alt="ID Back" 
                                        onClick={() => window.open(`${API_URL}/${tenant.id_proof_back}`, '_blank')}
                                    />
                                    <div className="image-overlay">
                                        <span>Click to view</span>
                                    </div>
                                </div>
                            </div>
                            <div className="document-card">
                                <h4>User Photo</h4>
                                <div className="document-image-container">
                                    <img 
                                        src={`${API_URL}/${tenant.user_image}`} 
                                        alt="User Photo" 
                                        onClick={() => window.open(`${API_URL}/${tenant.user_image}`, '_blank')}
                                    />
                                    <div className="image-overlay">
                                        <span>Click to view</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantDetails;