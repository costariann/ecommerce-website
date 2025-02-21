import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../component/Product';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { Helmet } from 'react-helmet-async';

// Define getError function
const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

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
        console.log('🔍 Fetching from:', process.env.REACT_APP_API_URL);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        console.log('✅ Received data:', data);

        // Ensure data is an array before dispatching
        if (!Array.isArray(data)) {
          throw new Error('API response is not an array');
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        console.error('❌ Error:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          data: err.response?.data,
        });
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
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
        <MessageBox variant="danger">Invalid product data received</MessageBox>
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
