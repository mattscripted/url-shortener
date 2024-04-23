from node:alpine

# Build React app
WORKDIR /app

COPY /app/package.json .
RUN npm install

COPY /app .

RUN npm run build

# Setup express server
WORKDIR /server

COPY /server/package.json .
RUN npm install

COPY /server .

EXPOSE 8000

CMD ["npm", "run", "start"]

