import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Dacosta',
      email: 'dacostaobiriyeboah@gmail.com',
      password: bcrypt.hashSync('12345'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 130,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'higher quality shirt',
    },
    {
      // _id: '2',
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 309,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'higher quality product',
    },
    {
      // _id: '3',
      name: 'Nike Slim Pants',
      slug: 'nike-slim-pants',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 225,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'higher quality product',
    },
    {
      // _id: '4',
      name: 'Puma Slim Pants',
      slug: 'puma-slim-pants',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 22,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'higher quality product',
    },
  ],
};

export default data;
