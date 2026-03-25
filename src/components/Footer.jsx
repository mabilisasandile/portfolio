import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">

                {/* Left */}
                <div className="footer-brand">
                    <h3>Sandile Mabilisa</h3>
                    <p>Full Stack Developer & IT Support Technician</p>
                </div>

                {/* Center */}
                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* Right */}
                <div className="footer-socials">
                    <a href="https://github.com/mabilisasandile" target="_blank">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/sandilemabilisa-3ab591230" target="_blank">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:mabilisasandile@gmail.com">
                        <FaEnvelope />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Sandile Mabilisa. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;