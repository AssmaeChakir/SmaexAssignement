FROM node:20
WORKDIR /app
COPY Web/Smaex/package*.json ./
RUN npm install
COPY Web/Smaex
RUN npm run build
CMD ["npm", "start"]
