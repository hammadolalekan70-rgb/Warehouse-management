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

  // Get all conversations
  const allConversations = getAllConversations();

  // Debug: Log when conversations update
  useEffect(() => {
    console.log("📨 Admin Chat - All Conversations:", allConversations);
    console.log("📊 Unread Count:", unreadCount);
  }, [allConversations, unreadCount]);

  // Filter conversations based on search
  const filteredConversations = allConversations.filter(conv => 
    conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-refresh conversations
  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh the conversations list
      const updated = getAllConversations();
      if (selectedConversation) {
        const updatedSelected = updated.find(c => c.id === selectedConversation.id);
        if (updatedSelected) {
          setSelectedConversation(updatedSelected);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedConversation]);

  // Mark as read when opening conversation
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation.id);
    }
  }, [selectedConversation, markConversationAsRead]);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConversation) return;

    sendAdminReply(selectedConversation.id, replyText);
    setReplyText("");
    
    // Scroll to bottom after sending
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const getUnreadCount = (conversation) => {
    return conversation.messages.filter(m => !m.read && m.sender === "customer").length;
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
    <div className="admin-chat">
      <div className="chat-header">
        <h1>💬 Customer Support Chat</h1>
        {unreadCount > 0 && (
          <div className="unread-badge-large">
            🔔 {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="chat-container">
        {/* Sidebar - Conversations List */}
        <div className="chat-sidebar">
          <div className="chat-filters">
            <input
              type="text"
              placeholder="🔍 Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="no-conversations">
                <p>💬 No conversations yet</p>
                <small>When customers message, they'll appear here</small>
              </div>
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
                          {lastMessage.sender === "admin" ? "📤 You: " : "📥 Customer: "}
                        </span>
                        <span className="preview-text">
                          {lastMessage.text.length > 40 
                            ? lastMessage.text.substring(0, 40) + "..." 
                            : lastMessage.text}
                        </span>
                      </div>
                    )}
                    <small className="conv-time">
                      🕐 {formatTime(conv.lastUpdated)}
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
                <div className="chat-stats">
                  <span>📝 {selectedConversation.messages.length} messages</span>
                </div>
              </div>

              <div className="messages-container">
                {selectedConversation.messages.length === 0 ? (
                  <div className="no-messages">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  <>
                    {selectedConversation.messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className={`message ${msg.sender === "admin" ? "sent" : "received"}`}
                      >
                        <div className="message-bubble">
                          <div className="message-sender">
                            {msg.sender === "admin" ? "👤 You" : "👤 Customer"}
                          </div>
                          <div className="message-text">
                            <p>{msg.text}</p>
                          </div>
                          <div className="message-meta">
                            <span className="message-time">
                              {formatTime(msg.timestamp)}
                            </span>
                            {msg.sender === "customer" && msg.read && (
                              <span className="read-receipt">✓ Read</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <form onSubmit={handleSendReply} className="reply-form">
                <input
                  type="text"
                  placeholder="✍️ Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="reply-input"
                />
                <button type="submit" className="send-reply-btn" disabled={!replyText.trim()}>
                  📤 Send Reply
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <span className="empty-icon">💬</span>
                <h3>Select a conversation</h3>
                <p>Choose a customer from the list to start replying</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminChat;