# Use a slim Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]
