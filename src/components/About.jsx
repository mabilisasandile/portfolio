import "./About.css";
import { FaCode, FaTools, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="about">
      <motion.div
        className="container about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I am a Full Stack Developer and IT Support Technician with a strong
            passion for building reliable web applications and solving real-world
            technical problems.
          </p>

          <p>
            With a background in IT support, I bring a unique perspective to
            development — focusing not only on building systems but also ensuring
            they are stable, scalable, and user-friendly.
          </p>

          <p>
            I have experience working with React, Node.js, ASP.NET, and databases,
            as well as troubleshooting systems, networking, and cloud platforms
            like Azure.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <h3><FaCode /> Development</h3>
            <p>Full stack web applications & APIs</p>
          </div>

          <div className="highlight-card">
            <h3><FaTools /> IT Support</h3>
            <p>Troubleshooting, networking & systems</p>
          </div>

          <div className="highlight-card">
            <h3><FaCloud /> Cloud</h3>
            <p>Azure fundamentals & deployment</p>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;