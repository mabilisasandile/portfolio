import { useEffect, useState } from "react";
import api from "../services/api";
import { fetchAdmins } from "../services/dataService";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./ManageAdmins.css";

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setAdmins(await fetchAdmins());
        }
        catch (error) {
            console.error("Error fetching admins: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    // OPEN EDIT MODAL
    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            email: admin.email,
            password: ""
        });
        setShowModal(true);
    };

    // SAVE EDIT
    const handleUpdate = async () => {
        try {
            await api.put(`/admins/${editingAdmin.id}`, formData);

            setAdmins(admins.map(a =>
                a.id === editingAdmin.id ? { ...a, email: formData.email } : a
            ));

            toast.success("Admin updated successfully");
            setShowModal(false);
        } catch (err) {
            toast.error(err.response?.data || "Update failed");
            console.error("Update failed:", err.response?.data);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;

        try {
            await api.delete(`/admins/${id}`);
            setAdmins(admins.filter(a => a.id !== id));
            toast.success("Admin deleted successfully");
        } catch (err) {
            console.error("Delete failed:", err.response?.data);
            toast.error(err.response?.data || "Failed to delete admin");
        }
    };

    const handleAdd = () => {
        navigate("/admin/register");
    }

    const handleBack = () => {
        navigate("/admin/dashboard");
    };

    return (
        <div className="admins-container">
            <button className="back-btn" onClick={handleBack}>
                <FaArrowLeft /> Back to Dashboard
            </button>
            <div className="header">
                <h2>Manage Admins</h2>

                <button className="add-btn" onClick={handleAdd}>
                    <FaPlus /> Add New Admin
                </button>
            </div>

            <div className="admins-grid">
                {admins.map((admin) => (
                    <div key={admin.id} className="admin-card">
                        <h3>{admin.email}</h3>

                        <div className="actions">
                            <button onClick={() => openEditModal(admin)}>
                                <FaEdit /> Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(admin.id)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Admin</h3>

                        <input
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="New Password (optional)"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={handleUpdate}>Update</button>

                            <button
                                className="cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAdmins;