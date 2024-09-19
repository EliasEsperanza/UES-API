import { createClient } from 'redis';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://172.17.0.3:6379'
});

redisClient.on('error', (err) => console.error('Redis error:', err));

await redisClient.connect();

export default redisClient;
