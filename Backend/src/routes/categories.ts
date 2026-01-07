import { Router } from 'express';
import { CategoryModel } from '../models/Category.js';

const router = Router();

router.get('/', async (_req, res) => {
  const categories = await CategoryModel.find().lean();
  res.json(categories.map(c => ({ ...c, id: (c as any)._id.toString() })));
});

router.get('/:id', async (req, res) => {
  const category = await CategoryModel.findById(req.params.id).lean();
  if (!category) return res.status(404).json({ message: 'Not found' });
  res.json({ ...category, id: (category as any)._id.toString() });
});

export async function seedCategoriesIfEmpty() {
  const count = await CategoryModel.countDocuments();
  if (count > 0) {
    console.log(`✓ Categories already exist (${count} categories found)`);
    return;
  }
  
  // Original Sports Hub categories - using only project data, no sample data
  const sportsCategories = [
    { id: '1', name: 'Kabaddi', slug: 'kabaddi', description: 'Traditional Indian sport equipment', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center', type: 'national' },
    { id: '2', name: 'Cricket', slug: 'cricket', description: 'Cricket bats, balls, and protective gear', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=500&fit=crop&crop=center', type: 'outdoor' },
    { id: '3', name: 'Football', slug: 'football', description: 'Football gear and equipment', imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=500&fit=crop&crop=center', type: 'outdoor' },
    { id: '4', name: 'Basketball', slug: 'basketball', description: 'Basketball essentials', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop&crop=center', type: 'outdoor' },
    { id: '5', name: 'Hockey', slug: 'hockey', description: 'Hockey sticks and protective gear', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center', type: 'outdoor' },
    { id: '6', name: 'Tennis', slug: 'tennis', description: 'Tennis rackets and accessories', imageUrl: 'https://images.unsplash.com/photo-1544717684-6e7b95b4d7e5?w=500&h=500&fit=crop&crop=center', type: 'outdoor' },
    { id: '7', name: 'Badminton', slug: 'badminton', description: 'Badminton rackets and shuttlecocks', imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&h=500&fit=crop&crop=center', type: 'indoor' },
    { id: '8', name: 'Volleyball', slug: 'volleyball', description: 'Volleyball equipment', imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&h=500&fit=crop&crop=center', type: 'indoor' },
    { id: '9', name: 'Chess', slug: 'chess', description: 'Chess boards and accessories', imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=500&fit=crop&crop=center', type: 'indoor' },
  ];
  
  console.log(`Seeding ${sportsCategories.length} original Sports Hub categories to database...`);
  await CategoryModel.insertMany(sportsCategories);
  console.log('✓ Original Sports Hub categories seeded successfully');
}

export default router;