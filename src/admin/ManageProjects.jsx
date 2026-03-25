import { useState } from "react";

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: ""
    });

    const addProject = () => {
        setProjects([...projects, newProject]);
        setNewProject({ title: "", description: "", technologies: "", githubUrl: "", liveUrl: "" });
    };

    return (
        <div className="container">
            <h2>Manage Projects</h2>

            <input
                placeholder="Title"
                value={newProject.title}
                onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                }
            />

            <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                }
            />

            <input
                placeholder="Add tech stack"
                value={newProject.technologies}
                onChange={(e) =>
                    setNewProject({ ...newProject, technologies: e.target.value })
                }
            />

            <input
                placeholder="Github Url"
                value={newProject.githubUrl}
                onChange={(e) =>
                    setNewProject({ ...newProject, githubUrl: e.target.value })
                }
            />

            <input
                placeholder="Live Url"
                value={newProject.liveUrl}
                onChange={(e) =>
                    setNewProject({ ...newProject, liveUrl: e.target.value })
                }
            />

            <button onClick={addProject}>Add Project</button>

            <div>
                {projects.map((p, i) => (
                    <div key={i}>
                        <br />
                        <h4>{p.title}</h4>
                        <p>Description: {p.description}</p>
                        <p>Tech Stack: {p.technologies}</p>
                        <p>Github URL: {p.githubUrl}</p>
                        <p>Live URL: {p.liveUrl}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;