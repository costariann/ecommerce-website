import express from 'express';
import Product from '../models/productModels.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find({});
  console.log('hit product');
  res.status(200).send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.status(200).send(product);
  } else res.status(404).send({ message: 'Product not found' });
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).send(product);
  } else res.status(404).send({ message: 'Product not found' });
});

export default productRouter;
