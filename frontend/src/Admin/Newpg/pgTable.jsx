import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';


const PgTable = () => {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate();

  const fetchPgs = async () => {
    try {
      const res = await axios.get(`${API_URL}/pg/get-all-pgs`);
      setPgs(res.data);
    } catch (err) {
      console.error('Failed to fetch PGs:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      try {
        await axios.delete(`${API_URL}/pg/delete/${id}`);
        fetchPgs(); // Refresh after deletion
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  useEffect(() => {
    fetchPgs();
  }, []);
 const handleEdit = (pgId) => {
    navigate(`/admin/pg/edit/${pgId}`);
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">📋 PG List</h3>
        <Link to="/admin/pg/new" className="btn btn-success">➕ Add New PG</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>PG Name</th>
              <th>Type</th>
              <th>Rent Start</th>
              <th>Zone</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pgs.length > 0 ? (
              pgs.map(pg => (
                <tr key={pg.id}>
                  <td>{pg.pg_name}</td>
                  <td>{pg.pg_type}</td>
                  <td>₹{pg.rent_start_from}</td>
                  <td>{pg.zone}</td>
                  <td>{pg.owner_name}</td>
                  {/* <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(pg.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td> */}
                      <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(pg.id)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(pg.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No PG data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PgTable;
