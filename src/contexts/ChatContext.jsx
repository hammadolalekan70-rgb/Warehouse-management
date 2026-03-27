// src/contexts/ChatContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [customerConversation, setCustomerConversation] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // Load customer's own conversation
  const loadCustomerConversation = async () => {
    if (!user?.email) return;
    
    setIsLoading(true);
    const userConversation = conversations.find(
      conv => conv.customerId === user.id || conv.customerEmail === user.email
    );

    if (userConversation) {
      setCustomerConversation(userConversation);
      // Mark unread admin messages as read
      const hasUnreadAdminMessages = userConversation.messages.some(
        msg => msg.sender === "admin" && !msg.read
      );
      
      if (hasUnreadAdminMessages) {
        markMessagesAsRead(userConversation.id);
      }
    } else {
      setCustomerConversation(null);
    }
    setIsLoading(false);
  };

  // Send message from customer
  const sendCustomerMessage = (customerEmail, customerName, message) => {
    if (!message.trim() || !customerEmail) return;
    
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
            customerId: user?.id,
            customerEmail,
            customerName: customerName || customerEmail,
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
    
    // Update customer conversation
    setTimeout(() => {
      loadCustomerConversation();
    }, 100);
  };

  // Send reply from admin
  const sendAdminReply = (conversationId, message) => {
    if (!message.trim() || !conversationId) return;
    
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
                read: false
              }
            ],
            lastUpdated: timestamp
          }
        : conv
    ));
  };

  // Mark conversation as read (for admin)
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

  // Mark customer's messages as read (for customer)
  const markMessagesAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.sender === "admin" && !msg.read ? { ...msg, read: true } : msg
            )
          }
        : conv
    ));
    
    // Update customer conversation state
    if (customerConversation?.id === conversationId) {
      setCustomerConversation(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: prev.messages.map(msg => 
            msg.sender === "admin" && !msg.read ? { ...msg, read: true } : msg
          )
        };
      });
    }
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
    customerConversation,
    unreadCount,
    isLoading,
    sendCustomerMessage,
    sendAdminReply,
    markConversationAsRead,
    markMessagesAsRead,
    getCustomerConversation,
    getAllConversations,
    loadCustomerConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};