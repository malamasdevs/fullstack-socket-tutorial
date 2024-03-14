# Full-Stack Chat Application with WebSocket and React

This project demonstrates the implementation of a full-stack chat application using WebSocket for real-time communication and React for the frontend.

## Project Structure

The project consists of two main parts: the frontend and the backend.

### Frontend

The frontend is built using React, and it provides the user interface for interacting with the chat application.

- **Location:** `/frontend`
- **Dependencies:** Managed by `package.json` in the frontend directory.
- **Key Files:**
  - `src/App.jsx`: Main component rendering the chat interface and handling user interactions.
  - `src/providers/WebSocketProvider.jsx`: Custom hook for managing WebSocket communication.
- **Setup and Usage:**
  1. Navigate to the `frontend` directory.
  2. Install dependencies: `yarn install`.
  3. Start the development server: `yarn run dev`.

### Backend

The backend is implemented using Node.js and Express, providing the server-side logic for managing WebSocket connections and handling chat messages.

- **Location:** `/backend`
- **Dependencies:** Managed by `package.json` in the backend directory.
- **Key Files:**
  - `server.js`: Entry point for the backend server, setting up WebSocket and handling message events.
- **Setup and Usage:**
  1. Navigate to the `backend` directory.
  2. Install dependencies: `yarn install`.
  3. Start the server: `yarn start`.

### Root Project

The root project serves as the container for both frontend and backend, allowing for easier management and deployment of the entire application.

- **Key Files:**
  - `package.json`: Defines scripts for building and running both frontend and backend.

## Tutorial

The tutorial included in this project demonstrates the following:

1. Setting up WebSocket communication between frontend and backend.
2. Creating a chat interface using React on the frontend.
3. Managing real-time chat messages with WebSocket events.
4. Deploying the application as a single unit or separately.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies for frontend and backend.
4. Start both frontend and backend servers.

For detailed instructions, refer to the setup and usage sections for frontend and backend respectively.
