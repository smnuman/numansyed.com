import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFoundPage.module.css';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - numansyed.com</title>
        <meta name="description" content="The page you are looking for could not be found on numansyed.com." />
      </Helmet>
      <motion.div
        className={styles.notFoundPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.errorCode} variants={itemVariants}>
          404
        </motion.h1>
        <motion.h2 className={styles.errorMessage} variants={itemVariants}>
          Oops! Page Not Found.
        </motion.h2>
        <motion.p className={styles.errorDescription} variants={itemVariants}>
          The page you're looking for doesn't seem to exist.
          Maybe it was moved, or you mistyped the URL.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/" className={styles.homeButton}>
            Go Back to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFoundPage;