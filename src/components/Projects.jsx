import { useState, useEffect } from "react";
import "./Projects.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchProjects } from "../services/dataService";

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        {loading ? (
          <h3 className="section-title">Loading...</h3>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                className="project-card"
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-stack">
                  {
                    project.technologies.split(",").map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))
                  }
                </div>

                <div className="project-links">
                  <a href={project.githubUrl} target="_blank">
                    <FaGithub /> GitHub
                  </a>
                  <a href={project.liveUrl} target="_blank">
                    <FaExternalLinkAlt /> Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;