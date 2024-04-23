from node:alpine

# TODO: Build client, too

# Setup express server
WORKDIR /server
COPY /server/package.json .
RUN npm install

COPY /server .

EXPOSE 8000

CMD ["npm", "run", "start"]

