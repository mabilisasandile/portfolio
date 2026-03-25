import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div style={{ marginTop: "20px" }}>
        <Link to="/admin/projects">Manage Projects</Link>
        <br />
        <Link to="/admin/messages">View Messages</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;