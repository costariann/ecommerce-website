import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Existing data cleared');

    // Insert users
    const createdUsers = await User.insertMany(data.users);
    console.log(`👥 ${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(data.products);
    console.log(`📦 ${createdProducts.length} products created`);

    res.send({ createdUsers, createdProducts });
  } catch (error) {
    console.error('❌ Seeding error:', error);
    res.status(500).send({ message: error.message });
  }
});

export default seedRouter;
