FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

# Start the app
CMD ["node", "server.js"]
