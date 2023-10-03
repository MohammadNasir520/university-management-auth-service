import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});
const redisPubClient = createClient({
  url: config.redis.url,
});
const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('rediserror', error));
redisClient.on('connect', error => console.log('redis connected', error));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};
export const RedisClient = {
  connect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
