import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={`${styles.homePage} container`}>
      <section className={styles.hero}>
        <h1>Welcome to My Personal Space</h1>
        <p className={styles.subtitle}>
          Exploring technology, sharing insights, and documenting my journey.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/blog" className={`${styles.ctaButton} ${styles.primary}`}>
            Read My Blog
          </Link>
          <Link to="/about" className={`${styles.ctaButton} ${styles.secondary}`}>
            Learn More About Me
          </Link>
        </div>
      </section>

      <section className={styles.recentPosts}>
        <h2>Recent Blog Posts</h2>
        {/* Placeholder for recent posts - will be dynamic later */}
        <div className={styles.postGrid}>
          <div className={styles.postCard}>
            <h3>Building This Website with React & Vite</h3>
            <p>A quick look into the tools and techniques used to create numansyed.com...</p>
            <Link to="/blog/building-this-website" className={styles.readMore}>Read More &rarr;</Link>
          </div>
          <div className={styles.postCard}>
            <h3>The Importance of Dark Mode</h3>
            <p>Why every modern website should consider a dark theme option for user comfort...</p>
            <Link to="/blog/importance-of-dark-mode" className={styles.readMore}>Read More &rarr;</Link>
          </div>
          {/* Add more placeholder posts if needed */}
        </div>
        <Link to="/blog" className={styles.viewAllPosts}>View All Posts</Link>
      </section>

      <section className={styles.featuredReview}>
        <h2>Featured Review</h2>
        {/* Placeholder for a featured review */}
        <div className={styles.reviewCard}>
          <h3>Review: "The Pragmatic Programmer"</h3>
          <p>A timeless classic that every software developer should read. Here are my thoughts...</p>
          <Link to="/reviews/pragmatic-programmer" className={styles.readMore}>Read Full Review &rarr;</Link>
        </div>
        <Link to="/reviews" className={styles.viewAllReviews}>View All Reviews</Link>
      </section>
    </div>
  );
};

export default HomePage;