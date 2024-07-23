import React, { useContext, useEffect, useReducer } from 'react';
import { CheckoutSteps } from '../component/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import getError from '../component/utils';
import axios from 'axios';
import { LoadingBox } from '../component/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const shippingAddress = cart.shippingAddress || {};
  const fullName = shippingAddress.fullName || '';
  const address = shippingAddress.address || '';
  const city = shippingAddress.city || '';
  const postalCode = shippingAddress.postalCode || '';
  const country = shippingAddress.country || '';

  const decimalPlace2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //Round a number to 2 decimal place
  cart.itemPrice = decimalPlace2(
    cart.cartItem.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice =
    cart.itemPrice > 100 ? decimalPlace2(0) : decimalPlace2(10);
  cart.taxPrice = decimalPlace2(0.15 * cart.itemPrice);
  cart.totalPrice = decimalPlace2(
    cart.itemPrice + cart.shippingPrice + cart.taxPrice
  );

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await axios.post(
        'http://localhost:8000/api/orders',
        {
          orderItems: cart.cartItem,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemPrice: cart.itemPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: decimalPlace2(
            cart.itemPrice + cart.shippingPrice + cart.taxPrice
          ),
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItem');
      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {fullName} <br />
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3 ">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Title>Items</Card.Title>
            <ListGroup variant="flush">
              {cart.cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-item-center">
                    <Col md={6}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="image-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>{item.quantity}</Col>
                    <Col md={3}>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Link to="/cart">Edit</Link>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItem.length === 0}
                    >
                      Place Order
                    </Button>
                    {loading && <LoadingBox></LoadingBox>}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
