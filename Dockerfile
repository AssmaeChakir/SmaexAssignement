FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY Web/Smaex/package*.json ./

RUN npm install

# Copy the entire Web/Smaex directory
COPY Web/Smaex ./

RUN npm run build

CMD ["npm", "start"]
