import { useState } from "react";
import "./AdminLogin.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP (we’ll replace with real auth later)
    if (form.username === "admin" && form.password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
      setStatus("Invalid username or password.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // This will connect to ASP.NET
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       setStatus("Logged in successfully!");
  //       setFormData({ username: "", password: "" });
  //     } else {
  //       setStatus("Something went wrong.");
  //     }
  //   } catch (error) {
  //     setStatus("Server error. Try again later.");
  //   }
  // };

  return (
    <section className="login">
      <motion.div
        className="container login-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container login-content">
          <h2>Log Me In</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              placeholder="Your Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {status && <p className="status">{status}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;