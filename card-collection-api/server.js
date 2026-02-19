import express        from 'express';
import 'dotenv/config';
import { connectDB }  from './config/db.js';
import cardRoutes     from './routes/cards.js';

const app  = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('🃏 Playing Card Collection API is running!');
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});