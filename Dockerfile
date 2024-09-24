# Use Node for the frontend
FROM node:18 AS frontend

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY Web/Smaex/package*.json ./

RUN npm install

# Copy the entire Web/Smaex directory
COPY Web/Smaex ./

RUN npm run build

# Expose the port your app runs on
EXPOSE 5173

# Start the Node app
CMD ["npm", "start"]
