import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaEnvelope, FaUserShield } from "react-icons/fa";
import "./AdminDashboard.css";
import { fetchMessageCount, fetchProjectCount } from "../services/dataService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messageCount, setMessageCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setMessageCount(await fetchMessageCount());
      setProjectsCount(await fetchProjectCount());
    };

    fetchData();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const stats = {
    projects: projectsCount,
    messages: messageCount,
    admins: 2
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="card-grid">

        <Link to="/admin/projects" className="card">
          <FaProjectDiagram className="icon" />
          <h3>Projects</h3>
          <p>{stats.projects}</p>
        </Link>

        <Link to="/admin/messages" className="card">
          <FaEnvelope className="icon" />
          <h3>Messages</h3>
          <p>{stats.messages}</p>
        </Link>

        <Link to="/admin/register" className="card">
          <FaUserShield className="icon" />
          <h3>Admins</h3>
          <p>{stats.admins}</p>
        </Link>

      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;