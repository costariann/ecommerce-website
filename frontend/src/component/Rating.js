import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating = 0, numReviews = 0, caption = '' }) => {
  const ratingValue = Number(rating);
  const reviewCount = Number(numReviews);

  const stars = [1, 2, 3, 4, 5].map((index) => (
    <span key={index}>
      <i
        className={
          ratingValue >= index
            ? 'fas fa-star'
            : ratingValue >= index - 0.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      />
    </span>
  ));

  return (
    <div className="rating">
      {stars}
      {caption ? (
        <span className="caption">{caption}</span>
      ) : (
        <span className="review-count">
          {reviewCount > 0 ? `${reviewCount} reviews` : 'No reviews'}
        </span>
      )}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  numReviews: PropTypes.number,
  caption: PropTypes.string,
};

export default Rating;
