import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import "./ManageProjects.css";
import { fetchProjects, addNewProject, editProject } from "../services/dataService";
import api from "../services/api";

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [projectId, setProjectId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: ""
    });

    useEffect(() => {
        try {
            const fetchData = async () => {
                setProjects(await fetchProjects());
            };

            fetchData();
        }
        catch (error) {
            console.error("Error fetching projects: ", error);
        }
        finally {
            setLoading(false);
        }
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
        setProjectId(projects[index].id);
        console.log("Edit project ID: ", projects[index].id);
    };

    // SAVE PROJECT
    const handleSave = () => {
        if (editingIndex !== null) {
            setLoading(true);
            try {
                editProject(projectId, formData);
                const updated = [...projects];
                updated[editingIndex] = formData;
                setProjects(updated);
                toast.success("Project edited successfully.");
            } catch(error) {
                console.error("Error editting project: ", error);
                toast.error("Error editting project");
            } finally {
                setLoading(false);
            } 

        } else {
            setProjects([...projects, formData]);
            addNewProject(formData);
            toast.success("Project added successfully.");
        }

        setShowModal(false);
    };

    // DELETE
    const handleDelete = async (project, index) => {
        if (!confirm(`Are you sure you want to delete project: ${project.title}?`)) return;

        setLoading(true);
        try {
            await api.delete(`/Project/${project.id}`);
            setProjects(projects.filter((_, i) => i !== index));
            toast.success("Project deleted successfully.");
        }
        catch (error) {
            console.error("Error deleting project: ", error);
            toast.error("Error deleting project");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="projects-container">
            <div className="header">
                <h2>Manage Projects</h2>
                <button className="add-btn" onClick={openAddModal}>
                    <FaPlus /> Add Project
                </button>
            </div>

            {loading ? (<h3 className="loading-text">Loading...</h3>)
                :
                (<div className="projects-grid">
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

                                <button className="delete" onClick={() => handleDelete(p, i)}>
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>)
            }

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
                            <button className="save" onClick={handleSave}>
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