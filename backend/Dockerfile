# Common setup for both development and production
FROM node:18-alpine as base

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8000

# Run for production without hot-reloading
FROM base

CMD ["npm", "run", "start"]
