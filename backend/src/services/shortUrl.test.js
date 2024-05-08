const redisClient = require('../utils/redisClient');
const mockingoose = require('mockingoose');
const ShortUrl = require('../models/ShortUrl');
const { get } = require('./shortUrl');

describe('get', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('returns the cached URL, if the cached shortUrlHash exists', async () => {
    const shortUrlHash = 'google';
    const url = 'http://www.google.com/';
    jest.spyOn(redisClient, 'get').mockReturnValueOnce(url);

    const shortUrl = await get(shortUrlHash);

    expect(shortUrl).toMatchObject({
      shortUrlHash,
      url,
    });
  });

  it('returns null, if there is no matching URL for the shortUrlHash', async () => {
    const shortUrlHash = 'google';
    mockingoose(ShortUrl).toReturn(null, 'findOne');

    const shortUrl = await get(shortUrlHash);
    
    expect(shortUrl).toBeNull();
  });

  it('returns the short URL object, if there is a matching URL for the shortUrlHash', async () => {
    const shortUrlHash = 'google';
    const url = 'http://www.google.com/';
    mockingoose(ShortUrl).toReturn({
      url,
    }, 'findOne');

    const shortUrl = await get(shortUrlHash);
    
    expect(shortUrl).toMatchObject({
      shortUrlHash,
      url,
    });
  });
});
