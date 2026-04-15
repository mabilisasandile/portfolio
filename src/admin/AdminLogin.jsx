import { useState } from "react";
import toast from "react-hot-toast";
import "./AdminLogin.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop page refresh

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      console.log("TOKEN:", res.data.token);

      navigate("/admin/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      console.log("FULL ERROR:", err);
      setStatus(err.response?.data || err.message);
      toast.error(err.response?.data || err.message);
    }
  };

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

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              name="username"
              placeholder="Your Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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