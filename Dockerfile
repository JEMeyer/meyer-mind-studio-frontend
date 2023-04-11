# Use an official Node.js runtime as a parent image
FROM node:bullseye as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the production-ready React app
RUN npm run build

# Use nginx as a parent image
FROM nginx:stable-alpine

# Copy the build output from the previous stage to the nginx image
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
