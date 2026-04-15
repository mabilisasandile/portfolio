import { useState } from "react";
import toast from "react-hot-toast";
import "./Contact.css";
import { sendMessage } from "../services/dataService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      sendMessage(formData);
      setStatus("Message sent successfully!");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Server error. Try again later.");
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <section className="contact">
      <div className="container contact-content">
        <h2>Contact Me</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>

          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;