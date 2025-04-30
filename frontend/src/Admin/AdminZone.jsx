import { useEffect, useState } from 'react';
import { API_URL } from '../config';

function AdminZone() {
  const [zone, setZone] = useState('');
  const [zones, setZones] = useState([]);

  const fetchZones = async () => {
    const res = await fetch(`${API_URL}/zone/all`);
    const data = await res.json();
    setZones(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!zone) return;
    const res = await fetch(`${API_URL}/zone/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: zone })
    });
    const data = await res.json();
    alert(data.message);
    setZone('');
    fetchZones();
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}/zone/delete/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    alert(data.message);
    fetchZones();
  };

  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <div className="container p-5">
      <h1 className="text-center mb-4">Manage PG Zones</h1>

      <form onSubmit={handleAdd} className="mb-4">
        <div className="form-group">
          <label htmlFor="zone-name" className="form-label">Zone Name</label>
          <input
            id="zone-name"
            type="text"
            placeholder="Enter Zone Name"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Add Zone
        </button>
      </form>

      <h2 className="mb-3">Zone List</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Zone Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id}>
                <td>{z.name}</td>
                <td>
                  <button
                    onClick={() => handleDelete(z.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {zones.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center">
                  No zones added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-link"
        onClick={() => window.location.href = '/admin/dashboard'}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}

export default AdminZone;
