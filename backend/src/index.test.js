const request = require('supertest');
const app = require('./index');

describe('example', () => {
  it('adds 2 numbers', () => {
    expect(1 + 2).toEqual(3);
  });
});

describe('GET /status', () => {
  it('returns "ok"', async () => {
    const response = await request(app).get('/status');
    expect(response.text).toEqual('ok');
  });
});
