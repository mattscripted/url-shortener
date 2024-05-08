const request = require('supertest');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const app = require('./index');

const ShortUrl = require('./models/ShortUrl');

// beforeAll(done => {
//   done();
// });

// afterAll(done => {
//   mongoose.connection.close();
//   done();
// });

describe('example', () => {
  it('adds 2 numbers', () => {
    expect(1 + 2).toEqual(3);
  });
});

describe('GET /status', () => {
  it('returns "ok"', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('ok');
  });
});

describe('GET /:shortUrlHash', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('returns a 404 error, when shortUrlHash finds no URLs', async () => {
    mockingoose(ShortUrl).toReturn(null, 'findOne');

    const response = await request(app).get('/does-not-exist');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      errors: [{
        status: 404,
        detail: 'No URL found for provided short URL hash.'
      }]
    })
  });

  it('redirects to the original URL, when shortUrlHash finds a URL', async () => {
    const url = 'http://www.google.com/';
    mockingoose(ShortUrl).toReturn({
      url,
    }, 'findOne');

    const response = await request(app).get('/google');

    expect(response.status).toEqual(302); // redirect
    expect(response.header.location).toEqual(url);
  });
});

describe('POST /api/short-url', () => {
  it('returns a 400 error, if the URL is invalid', async () => {
    const url = 'not-a-url';

    const response = await request(app)
      .post('/api/short-url')
      .send({
        url,
      });

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      errors: [{
        status: 400,
        detail: 'Invalid URL provided.',
      }],
    });
  });

  it('creates a short URL, and returns it', async () => {
    const url = 'http://www.google.com/';

    const response = await request(app)
      .post('/api/short-url')
      .send({
        url,
      });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      data: {
        type: 'shortUrl',
        id: expect.any(String),
        attributes: {
          url,
        },
      },
    });
  });

  it('returns an error, if the short URL fails to save', async () => {
    mockingoose(ShortUrl).toReturn(new Error('Cannot save'), 'save');
    const url = 'http://www.google.com/';

    const response = await request(app)
      .post('/api/short-url')
      .send({
        url,
      });

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({
      errors: [{
        status: 500,
        detail: 'Unable to create short URL.',
      }],
    });
  });
});
