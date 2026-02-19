import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

// Connect to Redis when the module loads
await connectRedis();

export default app;