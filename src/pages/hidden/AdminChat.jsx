// src/pages/hidden/AdminChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../contexts/ChatContext";


function AdminChat() {
  const { 
    conversations, 
    sendAdminReply, 
    markConversationAsRead,
    getAllConversations,
    unreadCount 
  } = useChat();
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const allConversations = getAllConversations();

  const filteredConversations = allConversations.filter(conv => 
    conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-refresh conversations
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedConversation) {
        const updated = conversations.find(c => c.id === selectedConversation.id);
        if (updated) {
          setSelectedConversation(updated);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedConversation, conversations]);

  // Mark as read when opening conversation
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConversation) return;

    sendAdminReply(selectedConversation.id, replyText);
    setReplyText("");
  };

  const getUnreadCount = (conversation) => {
    return conversation.messages.filter(m => !m.read && m.sender === "customer").length;
  };

  return (
    <div className="admin-chat">
      <div className="chat-header">
        <h1>Customer Support Chat</h1>
        {unreadCount > 0 && (
          <div className="unread-badge-large">
            {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <div className="chat-filters">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <p className="no-conversations">No conversations yet</p>
            ) : (
              filteredConversations.map(conv => {
                const unread = getUnreadCount(conv);
                const lastMessage = conv.messages[conv.messages.length - 1];
                
                return (
                  <div
                    key={conv.id}
                    className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''} ${unread > 0 ? 'unread' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="conv-header">
                      <h4>{conv.customerName}</h4>
                      {unread > 0 && <span className="unread-count">{unread}</span>}
                    </div>
                    <p className="conv-email">{conv.customerEmail}</p>
                    {lastMessage && (
                      <div className="conv-preview">
                        <span className={`preview-sender ${lastMessage.sender}`}>
                          {lastMessage.sender === "admin" ? "You: " : "Customer: "}
                        </span>
                        <span className="preview-text">
                          {lastMessage.text.substring(0, 30)}...
                        </span>
                      </div>
                    )}
                    <small className="conv-time">
                      {new Date(conv.lastUpdated).toLocaleString()}
                    </small>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {selectedConversation ? (
            <>
              <div className="chat-window-header">
                <div>
                  <h3>{selectedConversation.customerName}</h3>
                  <p>{selectedConversation.customerEmail}</p>
                </div>
              </div>

              <div className="messages-container">
                {selectedConversation.messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`message ${msg.sender === "admin" ? "sent" : "received"}`}
                  >
                    <div className="message-content">
                      <p>{msg.text}</p>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleString()}
                        {msg.read && msg.sender === "customer" && (
                          <span className="read-receipt"> ✓ Read</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendReply} className="reply-form">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="reply-input"
                />
                <button type="submit" className="send-reply-btn">
                  Send Reply
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start replying to customers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminChat;