import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./ManageProjects.css";
import { fetchProjects, addNewProject } from "../services/dataService";

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            setProjects(await fetchProjects());
        };

        fetchData();
    }, [])

    // OPEN MODAL (ADD)
    const openAddModal = () => {
        setFormData({
            title: "",
            description: "",
            technologies: "",
            githubUrl: "",
            liveUrl: ""
        });
        setEditingIndex(null);
        setShowModal(true);
    };

    // OPEN MODAL (EDIT)
    const openEditModal = (index) => {
        setFormData(projects[index]);
        setEditingIndex(index);
        setShowModal(true);
    };

    // SAVE PROJECT
    const handleSave = () => {
        if (editingIndex !== null) {
            const updated = [...projects];
            updated[editingIndex] = formData;
            setProjects(updated);
        } else {
            setProjects([...projects, formData]);
            addNewProject(formData);
        }

        setShowModal(false);
    };

    // DELETE
    const handleDelete = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    return (
        <div className="projects-container">
            <div className="header">
                <h2>Manage Projects</h2>
                <button className="add-btn" onClick={openAddModal}>
                    <FaPlus /> Add Project
                </button>
            </div>

            <div className="projects-grid">
                {projects.map((p, i) => (
                    <div key={i} className="project-card">
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>

                        <p className="tech">{p.technologies}</p>

                        <div className="links">
                            <a href={p.githubUrl} target="_blank">GitHub</a>
                            <a href={p.liveUrl} target="_blank">Live</a>
                        </div>

                        <div className="actions">
                            <button className="edit" onClick={() => openEditModal(i)}>
                                <FaEdit /> Edit
                            </button>

                            <button className="delete" onClick={() => handleDelete(i)}>
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
                        <h3>{editingIndex !== null ? "Edit Project" : "Add Project"}</h3>

                        <input
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />

                        <input
                            placeholder="Tech Stack"
                            value={formData.technologies}
                            onChange={(e) =>
                                setFormData({ ...formData, technologies: e.target.value })
                            }
                        />

                        <input
                            placeholder="GitHub URL"
                            value={formData.githubUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, githubUrl: e.target.value })
                            }
                        />

                        <input
                            placeholder="Live URL"
                            value={formData.liveUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, liveUrl: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={handleSave}>
                                {editingIndex !== null ? "Update" : "Add"}
                            </button>

                            <button className="cancel" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;