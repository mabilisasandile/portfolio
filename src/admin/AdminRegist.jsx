import { useState } from "react";
import toast from "react-hot-toast";
import "./AdminLogin.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../services/api";

const AdminRegist = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleRegist = async (e) => {
    e.preventDefault(); // Stop page refresh

    try {
      const res = await api.post("/auth/register", {
        email,
        password
      });

      console.log("Response: ", res.data);
      toast.success(res.data);
      setStatus(res.data);

      navigate("/admin/dashboard");

    } catch (err) {
      console.error("REGISTRATION ERROR:", err.response?.data || err.message);
      console.log("FULL ERROR:", err);
      toast.error(err.response?.data || err.message);
      setStatus(err.response?.data || err.message);
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
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h2>Add New Admin</h2>

          <form onSubmit={handleRegist} className="login-form">
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
              Submit
            </button>

            {status && <p className="status">{status}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminRegist;