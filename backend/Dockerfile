# Use the official Node.js 16 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files to the working directory
# This command copies all files and directories from the current directory (where the Dockerfile is located)
# into the working directory of the Docker image being built.
COPY . .

# Expose the port that the backend server will listen on
EXPOSE 9000

# Command to run the backend server
CMD ["node", "server.js"]
