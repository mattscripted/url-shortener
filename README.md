# url-shortener
A simple full-stack project to shorten a URL.

- Frontend: https://url-shortener-2947.onrender.com/
- Backend: https://url-shortener-backend-v2u6.onrender.com/

## Requirements
- As a user, I want to enter a URL, so I can share a short URL
- As a user, I want to visit a short URL, so I can go to the original URL

## Routes
### Frontend
`GET /`
- Visit form to create a short URL for a URL

### Backend
`GET /:shortUrlHash`
- Redirect to URL referenced by `shortUrlHash`

`POST /api/short-url`
- Given a URL, create a new short URL

## Development
To run everything locally:
```bash
docker-compose -f compose.yaml -f compose.dev.yaml up --build
```

To view the app, go to http://localhost:3000/

To stop everything:
```bash
docker-compose -f compose.yaml -f compose.dev.yaml down
```

### Simulating Production
To simulate production locally:
```bash
docker-compose -f compose.yaml -f compose.production.yaml up --build
```

To view the app, go to http://localhost/

To stop everything:
```bash
docker-compose -f compose.yaml -f compose.production.yaml down
```

### Scripts
To generate a lot of example data:
```bash
cd scripts
node generate-examples.js
```

This script will take about 20 minutes to generate one million items.

## Production Hosting
- Render
  - Frontend (static site)
  - Backend (web service)
  - Cache (Redis)
- MongoDB Atlas
  - Database (MongoDB)
