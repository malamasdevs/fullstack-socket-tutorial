# Use the official Node.js 20 or other vesion image as the base image
FROM node:20 as build

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Ensure index.html and other project files are present in the project root
# Copy the rest of the application files to the working directory
COPY . .

# Build the React app
RUN yarn run build

# Add a debugging step to list contents of /app/frontend
RUN ls -la /app/frontend

# Use Nginx as the server for serving the built React app
FROM nginx:alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
