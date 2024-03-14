const express = require('express');
const http = require('http');
const cors = require('cors'); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');

// Apply the cors middleware to the express app
app.use(cors());

// Array to store chat messages
let chatMessages = [];

const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust according to your environment
    methods: ["GET", "POST"]
  },
});

// Define message types
const MESSAGE_TYPE = {
    INITIAL_DATA: 'INITIAL_DATA',
    SEND_MESSAGE: 'SEND_MESSAGE',
    NEW_MESSAGE: 'NEW_MESSAGE',
};

// Handle new connections
io.on('connection', (socket) => {
    console.log('Client connected.');

    // Send initial chat messages to the newly connected client
    socket.emit(MESSAGE_TYPE.INITIAL_DATA, chatMessages);

    // Handle incoming messages
    socket.on(MESSAGE_TYPE.SEND_MESSAGE, (content) => {
        const newMessage = {
            username: content?.username,
            text: content?.text,
            timestamp: new Date(),
        };
        chatMessages.push(newMessage);
        // Broadcast the new message to all connected clients
        io.emit(MESSAGE_TYPE.NEW_MESSAGE, newMessage);
    });

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`WebSocket server started on port ${port}`);
});
