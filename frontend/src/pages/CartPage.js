import React, { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { MessageBox } from '../component/MessageBox';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';

export const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItem },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <MessageBox>
              Cart is empty <Link to="/">Shop Items</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-item-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItem.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItem.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      disabled={cartItem.length === 0}
                      type="button"
                      variant="primary"
                    >
                      Proceed to Checkout
                    </Button>
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
