import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

// Change from named export to default export
const LoadingBox = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingBox; // Change to default export
