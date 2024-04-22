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
