import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your actual frontend domain
  })
);

//convert data to json inside the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});
