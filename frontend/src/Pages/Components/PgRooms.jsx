// src/pages/Components/pgRooms.jsx
import React, { useEffect, useState } from "react";
import {
    FaFan,
    FaHome,
    FaMap,
    FaMapMarkerAlt,
    FaUtensils,
    FaWifi,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL, SERVER_URL } from '../../config';
import "./Styles/Pgroom.css";

const PgRooms = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/pg/get-all-pgs`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PG data fetched:", data);
        setPgs(data);
      })
      .catch((err) => console.error("Failed to fetch PGs", err));
  }, []);

  return (
    <section className="pg-rooms">
      <div className="pg-container">
        <div className="pg-heading-container">
          <h1 className="pg-heading">
            Our <span>PG Accommodations</span>
          </h1>
          <p className="pg-subheading">
            Discover comfortable and affordable PG accommodations tailored to meet your needs
          </p>
        </div>

        <div className="pg-house-grid">
          {pgs.length > 0 ? (
            pgs.map((pg) => (
              <div className="pg-card" key={pg.id}>
                <div className="pg-image-container">
                  <img
                    src={
                      pg.main_image
                        ? `${SERVER_URL}/uploads/pg/${pg.main_image}`
                        : "https://via.placeholder.com/400x320"
                    }
                    alt={pg.pg_name}
                    className="pg-image"
                  />
                  <div className="pg-type-badge">{pg.pg_type}</div>
                </div>

                <div className="pg-info">
                  <h3 className="pg-name">{pg.pg_name}</h3>
                  <div className="pg-location">
    <FaMapMarkerAlt /> {pg.address || "Address not available"}

                        </div>
                  <div className="pg-zone">
                    <FaMap /> {pg.zone} Zone
                  </div>

                  <div className="pg-amenities">
                    <div className="pg-amenity">
                      <FaWifi /> WiFi
                    </div>
                    <div className="pg-amenity">
                      <FaUtensils /> Food
                    </div>
                    <div className="pg-amenity">
                      <FaFan /> AC
                    </div>
                  </div>
                </div>

                <div className="pg-price-btn">
                  <div className="pg-price">
                    ₹{pg.rent_start_from} <span>/month</span>
                  </div>
                  <Link to={`/pg/${pg.id}/details`} className="pg-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <FaHome
                style={{ fontSize: "48px", color: "#ddd", marginBottom: "15px" }}
              />
              <p style={{ fontSize: "18px", color: "#777" }}>
                No PG accommodations available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PgRooms;
