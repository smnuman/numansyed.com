import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={`${styles.notFoundPage} container`}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page Not Found.</h2>
      <p className={styles.errorDescription}>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;