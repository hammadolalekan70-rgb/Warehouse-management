// src/contexts/ChatContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load chats from localStorage
  useEffect(() => {
    const storedChats = localStorage.getItem("chatConversations");
    if (storedChats) {
      const parsed = JSON.parse(storedChats);
      setConversations(parsed);
      updateUnreadCount(parsed);
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    localStorage.setItem("chatConversations", JSON.stringify(conversations));
    updateUnreadCount(conversations);
  }, [conversations]);

  const updateUnreadCount = (chats) => {
    const count = chats.reduce((total, chat) => {
      return total + chat.messages.filter(m => !m.read && m.sender === "customer").length;
    }, 0);
    setUnreadCount(count);
  };

  // Customer sends a message
  const sendCustomerMessage = (customerEmail, customerName, message) => {
    const timestamp = new Date().toISOString();
    
    setConversations(prev => {
      const existingConv = prev.find(c => c.customerEmail === customerEmail);
      
      if (existingConv) {
        return prev.map(conv => 
          conv.customerEmail === customerEmail
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: Date.now(),
                    text: message,
                    sender: "customer",
                    timestamp,
                    read: false
                  }
                ],
                lastUpdated: timestamp
              }
            : conv
        );
      } else {
        return [
          ...prev,
          {
            id: Date.now(),
            customerEmail,
            customerName,
            messages: [
              {
                id: Date.now(),
                text: message,
                sender: "customer",
                timestamp,
                read: false
              }
            ],
            lastUpdated: timestamp,
            status: "active"
          }
        ];
      }
    });
  };

  // Admin sends a reply
  const sendAdminReply = (conversationId, message) => {
    const timestamp = new Date().toISOString();
    
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: Date.now(),
                text: message,
                sender: "admin",
                timestamp,
                read: true
              }
            ],
            lastUpdated: timestamp
          }
        : conv
    ));
  };

  // Mark messages as read
  const markConversationAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.sender === "customer" ? { ...msg, read: true } : msg
            )
          }
        : conv
    ));
  };

  // Get customer's conversation
  const getCustomerConversation = (customerEmail) => {
    return conversations.find(c => c.customerEmail === customerEmail);
  };

  // Get all conversations for admin
  const getAllConversations = () => {
    return [...conversations].sort((a, b) => 
      new Date(b.lastUpdated) - new Date(a.lastUpdated)
    );
  };

  const value = {
    conversations,
    unreadCount,
    sendCustomerMessage,
    sendAdminReply,
    markConversationAsRead,
    getCustomerConversation,
    getAllConversations
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};