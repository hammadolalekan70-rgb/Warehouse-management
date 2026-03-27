// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

function Chat() {
  const { user } = useAuth();
  const { 
    customerConversation,
    sendCustomerMessage,
    markMessagesAsRead,
    loadCustomerConversation,
    isLoading
  } = useChat();
  
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Load customer's conversation
  useEffect(() => {
    if (user?.email) {
      loadCustomerConversation();
    }
  }, [user, loadCustomerConversation]);

  // Auto-refresh messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.email) {
        loadCustomerConversation();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, loadCustomerConversation]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [customerConversation?.messages]);

  // Mark messages as read when conversation is open
  useEffect(() => {
    if (customerConversation) {
      const hasUnreadAdminMessages = customerConversation.messages.some(
        msg => msg.sender === "admin" && !msg.read
      );
      
      if (hasUnreadAdminMessages) {
        markMessagesAsRead(customerConversation.id);
      }
    }
  }, [customerConversation, markMessagesAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShouldAutoScroll(isAtBottom);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !user?.email) return;

    sendCustomerMessage(user.email, user.name || user.email.split('@')[0], messageText);
    setMessageText("");
    setShouldAutoScroll(true);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="customer-chat">
      <div className="chat-header">
        <h1>💬 Chat with Support</h1>
        <p>We're here to help! Our support team will respond as soon as possible.</p>
      </div>

      <div className="chat-window-container">
        {isLoading ? (
          <div className="chat-loading">
            <div className="loading-spinner"></div>
            <p>Loading conversation...</p>
          </div>
        ) : (
          <>
            <div 
              className="messages-area" 
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {!customerConversation || customerConversation.messages.length === 0 ? (
                <div className="empty-chat">
                  <div className="empty-chat-icon">💬</div>
                  <h3>Start a Conversation</h3>
                  <p>Send us a message and our support team will get back to you.</p>
                  <div className="quick-topics">
                    <button 
                      className="topic-btn" 
                      onClick={() => setMessageText("I need help with my order")}
                    >
                      📦 Order Help
                    </button>
                    <button 
                      className="topic-btn" 
                      onClick={() => setMessageText("I have a question about delivery")}
                    >
                      🚚 Delivery Question
                    </button>
                    <button 
                      className="topic-btn" 
                      onClick={() => setMessageText("I need help with payment")}
                    >
                      💰 Payment Issue
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="messages-list">
                    {customerConversation.messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className={`message-bubble ${msg.sender === "customer" ? "customer-message" : "admin-message"}`}
                      >
                        <div className="message-sender">
                          {msg.sender === "customer" ? (
                            <span className="sender-name">You</span>
                          ) : (
                            <span className="sender-name support">Support Team</span>
                          )}
                          {msg.sender === "admin" && (
                            <span className="admin-badge">✓ Verified</span>
                          )}
                        </div>
                        <div className="message-content">
                          <p>{msg.text}</p>
                          <div className="message-footer">
                            <span className="message-time">{formatTime(msg.timestamp)}</span>
                            {msg.sender === "customer" && msg.read && (
                              <span className="read-status">✓ Read</span>
                            )}
                            {msg.sender === "customer" && !msg.read && (
                              <span className="delivered-status">✓ Sent</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {!shouldAutoScroll && customerConversation.messages.length > 0 && (
                    <div className="scroll-hint" onClick={scrollToBottom}>
                      ↓ New messages
                    </div>
                  )}
                </>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
              <div className="message-input-wrapper">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="message-input"
                  maxLength={500}
                />
                {messageText.length > 0 && (
                  <span className="char-count">{messageText.length}/500</span>
                )}
              </div>
              <button 
                type="submit" 
                className="send-button"
                disabled={!messageText.trim()}
              >
                Send
                <span className="send-icon">📤</span>
              </button>
            </form>
          </>
        )}
      </div>

      <div className="chat-info">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">📱</span>
            <h4>Response Time</h4>
            <p>Usually within 5-10 minutes</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🕐</span>
            <h4>Available Hours</h4>
            <p>Monday - Friday, 9AM - 6PM</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h4>Email Support</h4>
            <p>hammadolalekan@gmail.com</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h4>Phone Support</h4>
            <p>+234 817 959 8253</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;