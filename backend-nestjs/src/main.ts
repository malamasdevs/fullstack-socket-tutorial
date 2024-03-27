import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http'; // Import the 'http' module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve the HTTP server instance from the Nest.js application
  const httpServer = app.getHttpServer();

  // Ensure that the HTTP server instance is an instance of the 'http.Server' class
  if (!(httpServer instanceof http.Server)) {
    throw new Error('HttpServer is not an instance of Server');
  }

  // Use the IoAdapter with the HTTP server instance
  app.useWebSocketAdapter(new IoAdapter(httpServer));

  // Start listening on the specified port
  await app.listen(9000);
}

bootstrap();
