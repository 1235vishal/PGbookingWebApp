import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import './Styles/PgMaplisting.css';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Map controller component to handle bounds
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

    if (!Array.isArray(pgData) || pgData.length === 0) {
        return <div className="map-error">Location data not available!</div>;
    }

    const validPgData = pgData.filter(pg => pg.latitude && pg.longitude);

    if (validPgData.length === 0) {
        return <div className="map-error">No valid location data available!</div>;
    }

    const handleBookNow = (pgId) => {
        navigate(`/pg/${pgId}/details`);
    };

    return (
        <div className="map-container-fluid">
            <h3 className="map-title">Shivshakti PG Locations</h3>
            <div className="map-wrapper">
                <MapContainer 
                    center={[validPgData[0].latitude, validPgData[0].longitude]} 
                    zoom={13} 
                    className="map-container"
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
                            >
                                <Popup>
                                    <div className="map-card">
                                        <div className="map-card-image">
                                            <img
                                                src={`${SERVER_URL}/uploads/pg/${pg.main_image}`}
                                                alt={pg.pg_name}
                                            />
                                        </div>
                                        <div className="map-card-body">
                                            <h6 className="map-card-title">{pg.pg_name}</h6>
                                            <p className="map-card-text">
                                                <strong>Type:</strong> {pg.pg_type}
                                            </p>
                                            <p className="map-card-text">
                                                <strong>Rent:</strong> ₹{pg.rent_start_from}
                                            </p>
                                            <p className="map-card-text">
                                                <strong>Zone:</strong> {pg.zone}
                                            </p>
                                            <button 
                                                className="map-book-btn"
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
