import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

// Connect to Redis when the module loads
await connectRedis();

// Listen on port for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;