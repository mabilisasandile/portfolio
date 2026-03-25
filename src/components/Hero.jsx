import { motion } from "framer-motion";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();
  const fileUrl = '/resume.pdf';

  const handleWorkView = () => {
    navigate("/projects");
  }

  const handleViewCV = () => {
    // window.open("../assets/sandilecv.pdf");
    alert("View CV under construction");
  }

  return (
    <section className="hero">
      <div className="container hero-content">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sandile Mabilisa
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Full Stack Developer & IT Support Technician
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          I build reliable web applications and solve real-world IT problems.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button className="btn btn-primary" onClick={handleWorkView}>View My Work</button>
          <a href={fileUrl} download="resume.pdf">
            <button className="btn btn-secondary">Download CV</button>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;