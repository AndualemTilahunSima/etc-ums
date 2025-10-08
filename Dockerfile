# Use official Node.js LTS image
FROM node:20

# Install netcat-openbsd (needed to wait for MySQL)
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*


# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache node_modules if dependencies don't change
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Set the default command to start the app
CMD ["npm", "start"]
