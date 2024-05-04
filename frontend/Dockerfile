# Common setup for both development and production
FROM node:18-alpine as base

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

# By specifying "target" as "base", we won't continue on from here
# Thus, development won't build and run on nginx

# Build for production
FROM base as build
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
