import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import productsRouter, { seedProductsIfEmpty } from './routes/products.js';
import categoriesRouter, { seedCategoriesIfEmpty } from './routes/categories.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Root route - Welcome page
app.get('/', (_req, res) => {
  res.json({
    message: '🏆 Sports Hub API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      categories: '/api/categories',
      auth: '/api/auth'
    },
    database: mongoose.connection.name || 'connected'
  });
});

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports_hub';

async function start() {
  try {
    console.log('Connecting to MongoDB...');
    console.log(`URI: ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
    
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✓ MongoDB connected successfully');
      console.log(`Database: ${mongoose.connection.name}`);
    } catch (e) {
      console.error('✗ MongoDB connection failed');
      // On some Windows setups, localhost may resolve to ::1 only; retry with explicit IPv4
      if (MONGODB_URI.includes('localhost')) {
        const ipv4Uri = MONGODB_URI.replace('localhost', '127.0.0.1');
        console.warn(`Retrying with ${ipv4Uri} ...`);
        await mongoose.connect(ipv4Uri);
        console.log('✓ MongoDB connected successfully');
        console.log(`Database: ${mongoose.connection.name}`);
      } else {
        throw e;
      }
    }

    await seedCategoriesIfEmpty();
    await seedProductsIfEmpty();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server listening on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🏪 Products API: http://localhost:${PORT}/api/products`);
      console.log(`📂 Categories API: http://localhost:${PORT}/api/categories\n`);
    });
  } catch (err) {
    console.error('\n✗ Failed to start server:', err);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MongoDB is running');
    console.error('2. Check your MONGODB_URI in .env file');
    console.error('3. See MONGODB_SETUP.md for help\n');
    process.exit(1);
  }
}

start();


