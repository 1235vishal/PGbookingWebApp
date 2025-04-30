import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav>
      <Link to="/admin/register">Register</Link> | <Link to="/admin/login">Login</Link>
    </nav>
  );
}

export default AdminNavbar;
