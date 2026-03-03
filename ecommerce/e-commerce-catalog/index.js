import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // <--- import cors
import connectDB from './src/config/db.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // <--- enable CORS for all origins
app.use(express.json());

// --- ROUTES ---
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// --- HEALTH CHECK ---
app.get('/', (req, res) => {
  res.send('E-commerce catalog API is running');
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});