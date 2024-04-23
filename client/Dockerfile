# Build React app
from node:alpine as reactApp

WORKDIR /app

COPY /app/package.json .
RUN npm install

COPY /app .

RUN npm run build

# Setup express server
FROM node:alpine

WORKDIR /server

COPY /server/package.json .
RUN npm install

COPY --from=reactApp /app/build /app/build
COPY /server .

EXPOSE 8000

CMD ["npm", "run", "start"]
