import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

const ChatMessagesContext = createContext(null);
const SOCKET_URL = 'http://localhost:9000'; // Your WebSocket server URL. We'll use localhost:8000 for this example.

export const queryKey = ['messages'];

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();
const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
   
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const sendMessage = useCallback((content) => {
    console.log(content, "CONETN")
    if (isConnected) {
      socket.emit(MESSAGE_TYPE.SEND_MESSAGE, content);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) return;

    socket.on(MESSAGE_TYPE.NEW_MESSAGE, (message) => {
      queryClient.setQueryData(queryKey, (oldData) => [...oldData, message]);
    });

    return () => {
      socket.off(MESSAGE_TYPE.NEW_MESSAGE);
    };
  }, [isConnected, queryClient]);

  const value = {
    sendMessage,
    canSendMessages: socket,
  };

  return (
    <ChatMessagesContext.Provider value={value}>
      {children}
    </ChatMessagesContext.Provider>
  );
};

export const useChatMessagesContext = () => useContext(ChatMessagesContext);

// Define message types
const MESSAGE_TYPE = {
  INITIAL_DATA: 'INITIAL_DATA',
  SEND_MESSAGE: 'SEND_MESSAGE',
  NEW_MESSAGE: 'NEW_MESSAGE',
};
