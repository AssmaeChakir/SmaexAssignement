FROM node:20

WORKDIR /app

# Expose the port for the PHP server
EXPOSE 10000

# Copy package.json and package-lock.json if available
COPY Web/Smaex/package*.json ./

RUN npm install

# Copy the entire Web/Smaex directory
COPY Web/Smaex ./

RUN npm run build

# Start the PHP server
CMD ["php", "-S", "0.0.0.0:10000", "-t", "./backend"]
