import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Rating } from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

const Product = (props) => {
  const { product } = props;

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const addToCartHandler = async (item) => {
    try {
      const existItem = cartItem.find((item) => item._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${product._id}`
      );

      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
      navigate('/cart');
    } catch (error) {
      console.log('Error adding to cart', error);
    }
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
        ></img>
      </Link>
      <Rating rating={product.rating} review={product.numReviews} />
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            Out of Stock
          </Button>
        ) : (
          <Button onClick={addToCartHandler}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default Product;
