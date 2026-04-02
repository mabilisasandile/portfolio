import api from "../services/api";
import { useState, useEffect } from "react";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/Contact");
        setMessages(response.data);
        setMessageCount(response.data.length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Contact/${id}`);
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      setMessageCount(updatedMessages.length);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Inbox</h2>
        <span>{messageCount} Messages</span>
      </div>

      {messageCount === 0 ? (
        <div className="empty-state">
          <p>No messages yet 📭</p>
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