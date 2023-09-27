import express from 'express';
import data from './data.js';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the allowed origin.
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get('/api/products', (req, res) => {
  res.status(200).send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});
