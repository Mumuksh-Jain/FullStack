import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

const PORT = process.env.PORT || 3000;

try {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('❌ Startup error:', err.message);
  process.exit(1);
}

export default app;