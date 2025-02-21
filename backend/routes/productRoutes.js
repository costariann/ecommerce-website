import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products`);
    res.status(200).json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get product by slug
productRouter.get(
  '/slug/:slug',
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      if (product) {
        console.log('✅ Product found by slug:', req.params.slug);
        res.status(200).json(product);
      } else {
        console.log('❌ Product not found by slug:', req.params.slug);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('❌ Error finding product by slug:', error);
      res.status(500).json({ message: 'Error finding product' });
    }
  })
);

// Get product by ID
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        console.log('✅ Product found by ID:', req.params.id);
        res.status(200).json(product);
      } else {
        console.log('❌ Product not found by ID:', req.params.id);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('❌ Error finding product by ID:', error);
      res.status(500).json({ message: 'Error finding product' });
    }
  })
);

// Create new product
productRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    try {
      const newProduct = new Product({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
      });

      const product = await newProduct.save();
      console.log('✅ New product created:', product.name);
      res.status(201).json(product);
    } catch (error) {
      console.error('❌ Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  })
);

// Update product
productRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = req.body.name || product.name;
        product.slug = req.body.slug || product.slug;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.rating = req.body.rating || product.rating;
        product.numReviews = req.body.numReviews || product.numReviews;

        const updatedProduct = await product.save();
        console.log('✅ Product updated:', updatedProduct.name);
        res.status(200).json(updatedProduct);
      } else {
        console.log('❌ Product not found for update:', req.params.id);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('❌ Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  })
);

// Delete product
productRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        await Product.deleteOne({ _id: product._id });
        console.log('✅ Product deleted:', product.name);
        res.status(200).json({ message: 'Product deleted' });
      } else {
        console.log('❌ Product not found for deletion:', req.params.id);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  })
);

export default productRouter;
