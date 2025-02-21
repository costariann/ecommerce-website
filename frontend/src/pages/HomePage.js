import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../component/Product';
import LoadingBox from '../component/LoadingBox';
import { Helmet } from 'react-helmet-async';
import { MessageBox } from '../component/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [], // Initialize as empty array
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        console.log('API Response:', data); // Debug log

        // Ensure data is an array before dispatching
        const productsArray = Array.isArray(data) ? data : [];
        dispatch({ type: 'FETCH_SUCCESS', payload: productsArray });
      } catch (err) {
        console.error('Fetch Error:', err);
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Multimart</title>
      </Helmet>
      <h1>Featured Products</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : !Array.isArray(products) ? (
        <MessageBox variant="danger">Invalid data format received</MessageBox>
      ) : products.length === 0 ? (
        <MessageBox>No Products Found</MessageBox>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
