import { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
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
                        <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;