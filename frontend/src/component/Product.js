import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // Add default empty array if cartItems is undefined
  const cartItems = state.cart?.cartItems || [];

  const addToCartHandler = async (item) => {
    try {
      // Use the cartItems from above with null check
      const existItem = cartItems?.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/slug/${item.slug}`
      );

      if (!data) {
        toast.error('Product not found');
        return;
      }

      if (data.countInStock < quantity) {
        toast.error('Sorry. Product is out of stock');
        return;
      }

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: {
          _id: data._id,
          name: data.name,
          slug: data.slug,
          price: data.price,
          image: data.image,
          countInStock: data.countInStock,
          quantity,
        },
      });

      toast.success('Product added to cart');
    } catch (err) {
      console.error('Error fetching product data:', err);
      toast.error(err.response?.data?.message || 'Error adding to cart');
    }
  };

  return (
    <Card className="h-100">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.png';
          }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.slug}`} className="text-decoration-none">
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={Number(product.rating) || 0}
          numReviews={Number(product.numReviews) || 0}
        />
        <Card.Text>${(product.price || 0).toFixed(2)}</Card.Text>
        <div className="mt-auto">
          {product.countInStock > 0 ? (
            <Button
              onClick={() => addToCartHandler(product)}
              variant="primary"
              className="w-100"
            >
              Add to cart
            </Button>
          ) : (
            <Button variant="light" disabled className="w-100">
              Out of stock
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
