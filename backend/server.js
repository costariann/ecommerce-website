import express from 'express';
import path from 'path';
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

const allowedDomains = [
  'https://urbancartshopping.netlify.app',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  );
  next();
});
//convert data to json inside the req.body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/api/keys/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
// });

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
// });

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});
