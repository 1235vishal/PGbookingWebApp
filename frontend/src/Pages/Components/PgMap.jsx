import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import './Styles/PgMap.css';
// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { SERVER_URL } from '../../config';



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapController = ({ pgData }) => {
    const map = useMap();
    
    useEffect(() => {
        if (pgData && pgData.length > 0) {
            const bounds = L.latLngBounds(pgData.map(pg => [parseFloat(pg.latitude), parseFloat(pg.longitude)]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [pgData, map]);

    return null;
};

const PgMap = ({ pgData }) => {
    const navigate = useNavigate();
    const [activeMarker, setActiveMarker] = useState(null);

    if (!Array.isArray(pgData) || pgData.length === 0) {
        return <div className="text-center mt-5 text-danger">Location data not available!</div>;
    }

    const validPgData = pgData.filter(pg => pg.latitude && pg.longitude);

    if (validPgData.length === 0) {
        return <div className="text-center mt-5 text-danger">No valid location data available!</div>;
    }

    const handleBookNow = (pgId) => {
        navigate(`/pg/${pgId}/details`);
    };

    return (
        <div className="map-container mt-4">
            <h3 className="text-center text-danger mb-4">Shivshakti PG Locations</h3>
            <div className="map-wrapper12">
                <MapContainer 
                    center={[validPgData[0].latitude, validPgData[0].longitude]} 
                    zoom={13} 
                    style={{ 
                        height: "70vh", 
                        width: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController pgData={validPgData} />

                    {pgData.map((pg, index) => (
                        pg.latitude && pg.longitude ? (
                            <Marker
                                key={index}
                                position={[parseFloat(pg.latitude), parseFloat(pg.longitude)]}
                                eventHandlers={{
                                    click: () => setActiveMarker(pg.id)
                                }}
                            >
                                <Popup>
                                    <div className="pg-popup-card">
                                        <img
                                            src={`${SERVER_URL}/uploads/pg/${pg.main_image}`}
                                            alt={pg.pg_name}
                                            className="popup-image"
                                        />
                                        <div className="popup-content">
                                            <h5 className="popup-title">{pg.pg_name}</h5>
                                            <div className="popup-details">
                                                <p><strong>Type:</strong> {pg.pg_type}</p>
                                                <p><strong>Rent:</strong> ₹{pg.rent_start_from}</p>
                                                <p><strong>Zone:</strong> {pg.zone}</p>
                                            </div>
                                            <button 
                                                className="popup-btn" 
                                                onClick={() => handleBookNow(pg.id)}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};


export default PgMap;
