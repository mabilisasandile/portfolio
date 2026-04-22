import { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        
        switch(value) {
            case "settings":
                navigate("/admin/dashboard");
                setMenuOpen(false);
                break;
            case "services":
                window.open("https://kasi-code.netlify.app/#services", "_blank");
                setMenuOpen(false);
                break;
            case "github":
                window.open("https://github.com/mabilisasandile/portfolio", "_blank");
                break;
            case "linkedin":
                window.open("https://www.linkedin.com/in/sandile-mabilisa-3ab591230", "_blank");
                break;
            default:
                break;
        }
        
        // Reset select to default value
        e.target.value = "more";
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <h2>Sandile</h2>

                <div className="nav-right">
                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* Hamburger */}
                    <div
                        className="hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                    <li>
                        <NavLink to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                            About
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/skills" onClick={() => setMenuOpen(false)}>
                            Skills
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
                            Projects
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                            Contact
                        </NavLink>
                    </li>

                    <li>
                        <select name="More" id="moreOptions" onChange={handleSelectChange}>
                            <option value="more">More</option>
                            <option value="settings">Settings</option>
                            <option value="services">Services</option>
                            <option value="github">GitHub</option>
                            <option value="linkedin">LinkedIn</option>
                        </select>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;