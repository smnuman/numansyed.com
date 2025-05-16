import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './ReviewsPage.module.css';
import productReviews from '../../data/productReviews.json'; // Placeholder data
import placeholderImage from '../../assets/placeholder-800x400.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const ReviewsPage = () => {
  return (
    <>
      <Helmet>
        <title>Product Reviews - numansyed.com</title>
        <meta name="description" content="Honest reviews of the latest tech gadgets, software, and more by Numan Syed." />
      </Helmet>
      <motion.div
        className={styles.reviewsPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.pageTitle} variants={itemVariants}>
          My Product Reviews
        </motion.h1>
        {productReviews.length > 0 ? (
          <motion.div className={styles.reviewsGrid} variants={containerVariants}>
            {productReviews.map((review) => (
              <motion.article key={review.id} className={styles.reviewCard} variants={itemVariants}>
                <Link to={`/reviews/${review.id}`} className={styles.cardLink}>
                  {/* Always show placeholder if review.image is "placeholder.jpg" or if it's missing */}
                  {(review.image === "placeholder.jpg" || !review.image) && (
                    <div className={styles.reviewImageContainer}>
                      <img src={placeholderImage} alt={review.productName} className={styles.reviewImage} />
                    </div>
                  )}
                  {/* If review.image is a real path (not "placeholder.jpg") and exists, use it */}
                  {review.image && review.image !== "placeholder.jpg" && (
                     <div className={styles.reviewImageContainer}>
                        <img src={review.image} alt={review.productName} className={styles.reviewImage} />
                    </div>
                  )}
                  <div className={styles.reviewContent}>
                    <h2 className={styles.reviewTitle}>{review.productName}</h2>
                    <p className={styles.reviewCategory}>Category: {review.category}</p>
                    <p className={styles.reviewExcerpt}>{review.summary}</p>
                    <div className={styles.reviewMeta}>
                      <span>Rating: {review.rating}/5</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.p variants={itemVariants} className={styles.noReviews}>
            No product reviews yet. Check back soon!
          </motion.p>
        )}
      </motion.div>
    </>
  );
};

export default ReviewsPage;