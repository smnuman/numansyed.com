import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styles from './ReviewDetailPage.module.css';
import productReviewsData from '../../data/productReviews.json'; // Placeholder data

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const ReviewDetailPage = () => {
  const { reviewId } = useParams();
  const review = productReviewsData.find((r) => r.id === reviewId);

  if (!review) {
    return <Navigate to="/reviews" replace />;
  }

  // Simple star rating display
  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>{review.productName} Review - numansyed.com</title>
        <meta name="description" content={review.summary} />
      </Helmet>
      <motion.article
        className={styles.reviewDetailPage}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {review.image && (
          <motion.div className={styles.reviewImageHeader} variants={itemVariants}>
            <img src={review.image} alt={review.productName} className={styles.reviewImage} />
          </motion.div>
        )}
        <motion.h1 className={styles.reviewProductName} variants={itemVariants}>
          {review.productName}
        </motion.h1>
        <motion.div className={styles.reviewMeta} variants={itemVariants}>
          <span className={styles.reviewCategory}>Category: {review.category}</span>
          <span className={styles.reviewDate}>Reviewed on: {review.date}</span>
          <span className={styles.reviewRating}>Rating: {renderStars(review.rating)} ({review.rating}/5)</span>
        </motion.div>
        <motion.div
          className={styles.reviewFullContent}
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: review.fullReview.replace(/\n/g, '<br />') }}
        />
        <motion.div className={styles.backLinkContainer} variants={itemVariants}>
          <Link to="/reviews" className={styles.backLink}>
            &larr; Back to All Reviews
          </Link>
        </motion.div>
      </motion.article>
    </>
  );
};

export default ReviewDetailPage;