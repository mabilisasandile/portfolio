import api from "../services/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Messages.css";
import { fetchMessages, fetchMessageCount } from "../services/dataService";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setMessages(await fetchMessages());
        setMessageCount(await fetchMessageCount());
        console.log("setMessages: ", messages);
        console.log("setMessageCount: ", messageCount);

      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Contact/${id}`);
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      setMessageCount(updatedMessages.length);
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="messages-container">
      <button className="back-btn" onClick={handleBack}>
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div className="messages-header">
        <h2>Inbox</h2>
        <span>{messageCount} Messages</span>
      </div>

      {loading && messageCount === 0 ? (
        <div className="empty-state">
          <h3>Loading messages...</h3>
        </div>
      ) : (
        <div className="messages-grid">
          {messages.map((msg) => (
            <div key={msg.id} className="message-card">

              <div className="message-top">
                <h3>{msg.name}</h3>
                <span className="email">{msg.email}</span>
              </div>

              <p className="message-body">{msg.message}</p>

              <div className="message-footer">
                <span className="date">
                  {new Date(msg.dateSent).toLocaleString()}
                </span>

                <div className="actions">
                  <a
                    href={`mailto:${msg.email}`}
                    className="reply-btn"
                  >
                    Reply
                  </a>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;