jest.mock('redis', () => jest.requireActual('redis-mock'));

/**
 * redis-mock is out of date, and does not support the latest version of Redis.
 * This code is a workaround from:
 * https://github.com/yeahoffline/redis-mock/issues/211
 */

// Extend redis-mock to include isOpen, connect, and disconnect
jest.mock('redis', () => {
  const redisMock = jest.requireActual('redis-mock');

  const enhancedRedisMock = {
    ...redisMock,
    createClient: () => {
      const client = redisMock.createClient();
      client.isOpen = true;
      client.connect = jest.fn().mockResolvedValue(null);
      client.disconnect = jest.fn().mockResolvedValue(null);
      return client;
    },
  };

  return enhancedRedisMock;
});
