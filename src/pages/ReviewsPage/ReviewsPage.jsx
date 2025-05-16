import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll have detail pages for reviews
import styles from './ReviewsPage.module.css';

// Dummy review data
const reviews = [
  {
    id: 'pragmatic-programmer',
    title: 'Book Review: "The Pragmatic Programmer"',
    category: 'Book',
    rating: 5, // Out of 5
    excerpt: 'A timeless classic that offers practical advice for software developers at all levels. Highly recommended for its focus on craftsmanship and continuous improvement.',
    date: 'May 10, 2025',
  },
  {
    id: 'vs-code-deep-dive',
    title: 'Tool Review: Visual Studio Code',
    category: 'Software',
    rating: 4.5,
    excerpt: 'My go-to code editor. VS Code is powerful, extensible, and has a fantastic community. A few minor quirks but overall an excellent tool for developers.',
    date: 'April 28, 2025',
  },
  {
    id: 'new-mechanical-keyboard',
    title: 'Hardware Review: Keychron K2 Pro',
    category: 'Hardware',
    rating: 4,
    excerpt: 'A solid mechanical keyboard with great features for both Mac and Windows users. Good build quality and typing experience, though the keycaps could be better.',
    date: 'May 5, 2025',
  },
  // Add more reviews as needed
];

const ReviewsPage = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className={`${styles.reviewsPage} container`}>
      <h1 className={styles.pageTitle}>Reviews</h1>
      <p className={styles.pageSubtitle}>My thoughts on books, software, hardware, and more.</p>
      <div className={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <article key={review.id} className={styles.reviewItem}>
              <h2 className={styles.reviewTitle}>
                {/* Link to a detail page if you plan to create them */}
                {/* <Link to={`/reviews/${review.id}`}>{review.title}</Link> */}
                {review.title}
              </h2>
              <div className={styles.reviewMeta}>
                <span className={styles.reviewCategory}>{review.category}</span>
                <span className={styles.reviewRating}>{renderStars(review.rating)} ({review.rating}/5)</span>
              </div>
              <p className={styles.reviewExcerpt}>{review.excerpt}</p>
              <p className={styles.reviewDate}>Reviewed on: {review.date}</p>
              {/*
              <Link to={`/reviews/${review.id}`} className={styles.readMoreLink}>
                Read Full Review &rarr;
              </Link>
              */}
            </article>
          ))
        ) : (
          <p>No reviews yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;