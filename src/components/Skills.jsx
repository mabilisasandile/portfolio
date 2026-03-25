import "./Skills.css";
import { FaCode, FaTools, FaCloud, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>

        <div className="skills-grid">

          {/* Development */}
          <motion.div
            className="skill-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3><FaCode /> Development</h3>
            <ul>
              <li>React</li>
              <li>JavaScript</li>
              <li>ASP.NET Core</li>
              <li>C#</li>
              <li>Node.js</li>
              <li>REST APIs</li>
            </ul>
          </motion.div>

          {/* Databases */}
          <div className="skill-card">
            <h3><FaDatabase /> Databases</h3>
            <ul>
              <li>SQL Server</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
            </ul>
          </div>

          {/* IT Support */}
          <motion.div
            className="skill-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3><FaTools /> IT Support</h3>
            <ul>
              <li>Windows Administration</li>
              <li>Networking (TCP/IP, LAN/WAN)</li>
              <li>Troubleshooting</li>
              <li>Ticketing Systems</li>
            </ul>
          </motion.div>

          {/* Tools */}
          <div className="skill-card">
            <h3><FaCloud /> Tools & Cloud</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>Azure</li>
              <li>VS Code</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;