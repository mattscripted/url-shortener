# url-shortener
A simple full-stack project to shorten a URL.

## Requirements
- As a user, I want to enter a URL, so I can share a short URL
- As a user, I want to visit a short URL, so I can go to the original URL

## Routes
`GET /`
- Visit form to create a short URL for a URL

`GET /:shortUrl`
- Redirect to URL referenced by `shortUrl`

`POST /api/short-url`
- Given a URL, create a new short URL

## Development
To run everything:
```bash
docker-compose -f compose.yaml -f compose.dev.yaml up --build
```

To view the app, go to http://localhost:3000/

To stop everything:
```bash
docker-compose -f compose.yaml -f compose.dev.yaml down
```

## Production
To run everything:
```bash
docker-compose -f compose.yaml -f compose.production.yaml up --build
```

To view the app, go to http://localhost/

To stop everything:
```bash
docker-compose -f compose.yaml -f compose.production.yaml down
```
