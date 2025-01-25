import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessages = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      ...message,
      timestamp: new Date().toISOString(),
      status: 'unread'
    };
    setMessages(prev => [newMessage, ...prev]);
    return newMessage;
  };

  const markAsRead = (messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      )
    );
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const value = {
    messages,
    addMessage,
    markAsRead,
    deleteMessage
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};
