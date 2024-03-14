import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryKey, useChatMessagesContext } from '../src/providers/WebSocketProvider';

const App = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Get username from localStorage
  const { data } = useQuery({queryKey, queryFn:() => [], staleTime: Infinity, cacheTime: Infinity});
  const { sendMessage, canSendMessages } = useChatMessagesContext();

  const mutation = useMutation({
    mutationFn: (newMessage) => {
      return sendMessage(newMessage);
    },
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      const generatedUsername = `User${Math.floor(Math.random() * 1000)}`; // Generate a random username
      setUsername(generatedUsername);
      localStorage.setItem('username', generatedUsername);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      text: message,
      username: username, 
    };
    mutation.mutate(newMessage);
    setMessage('');
  };


  return (
    <div>
      <h1>Chat Messages</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit" disabled={!canSendMessages || !message}>
          Send Message
        </button>
      </form>
      <div>
        {data?.map(({ text, username, timestamp }, index) => (
          <div key={index}>
            <div>{new Date(timestamp).toLocaleString()}</div>
            <div>{username}: {text}</div> {/* Display username along with the message */}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
