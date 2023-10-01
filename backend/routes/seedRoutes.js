import express from 'express';
import Product from '../models/productModels.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    await Product.deleteMany({});

    const createdProduct = await Product.insertMany(data.products);
    res.status(201).send({ createdProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
export default seedRouter;
