
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../css/chatmodal.css";
import Modal from "../Modal/Modal";
import Login from "../HomePage/Login";
import Register from "../HomePage/Register";




/*Deploy */

//const socket = io("https://h-pf18b-campeonesdelmundo-b.onrender.com");



/*Local */

const socket = io("http://localhost:3001");



const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: "received" }]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", input);
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: "sent" }]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal">
      <div className="chat-modal-content">
        <button className="icon__button" onClick={() => setIsModalOpen(true)}>
          Iniciar Sesion/Registrate
        </button>
        <p className="atencion__c">Atencion al Cliente</p>

        {isModalOpen && (
          <Modal>
            <Login onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}

        <span className="chat-modal-close" onClick={onClose}>
          &times;
        </span>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
