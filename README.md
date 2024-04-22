# url-shortener
A simple full-stack project to shorten a URL.

## Requirements
- As a user, I want to enter a URL and get a short URL, so I can share the shorter URL
- As a user, I can visit a short URL, and navigate to the original long URL

## Routes
`GET /`
- Visit form to create a short URL for a URL

`GET /:shortUrl`
- Redirect to URL referenced by `shortUrl`

`POST /api/short-url`
- Given a URL, create a new short URL
