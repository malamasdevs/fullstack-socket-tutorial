import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enable CORS for WebSocket connections
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Array to store chat messages
  chatMessages: any[] = [];

  handleConnection(client: any) {
    console.log('Client connected.');
    // Send initial chat messages to the newly connected client
    client.emit('INITIAL_DATA', this.chatMessages);
  }

  @SubscribeMessage('SEND_MESSAGE')
  handleMessage(client: any, content: any): WsResponse<any> {
    const newMessage = {
      username: content?.username,
      text: content?.text,
      timestamp: new Date(),
    };
    this.chatMessages.push(newMessage);
    // Broadcast the new message to all connected clients
    return { event: 'NEW_MESSAGE', data: newMessage };
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected.');
  }
}
