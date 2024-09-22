FROM node:20
WORKDIR /app
COPY Web/package*.json ./
RUN npm install
COPY Web .      
RUN npm run build
CMD ["npm", "start"]
