import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './HomePage.module.css';
// Placeholder for an image - replace with an actual image or component
import placeholderImage from '../../assets/placeholder-800x400.jpg'; // Assuming you'll add this

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
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

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - numansyed.com</title>
        <meta name="description" content="Welcome to the personal website of Numan Syed. Explore blog posts, product reviews, and more." />
      </Helmet>
      <motion.div
        className={styles.homePage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className={styles.heroSection} variants={itemVariants}>
          <div className={styles.heroText}>
            <motion.h1 variants={itemVariants}>Welcome to My Digital Space</motion.h1>
            <motion.p variants={itemVariants}>
              Discover insights, reviews, and a bit about me.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/blog" className={styles.ctaButton}>Explore Blog</Link>
              <Link to="/reviews" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>See Reviews</Link>
            </motion.div>
          </div>
          <motion.div className={styles.heroImageContainer} variants={itemVariants}>
            {/* Replace with a proper image component or img tag */}
            <img src={placeholderImage} alt="Abstract placeholder" className={styles.heroImage} />
          </motion.div>
        </motion.section>

        <motion.section className={styles.featuresSection} variants={containerVariants}>
          <motion.h2 variants={itemVariants}>What You'll Find</motion.h2>
          <div className={styles.featuresGrid}>
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <h3>Latest Blog Posts</h3>
              <p>Thoughts on tech, development, and life.</p>
              <Link to="/blog" className={styles.featureLink}>Read More &rarr;</Link>
            </motion.div>
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <h3>Honest Product Reviews</h3>
              <p>My take on the latest gadgets and software.</p>
              <Link to="/reviews" className={styles.featureLink}>Check Them Out &rarr;</Link>
            </motion.div>
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <h3>About Me</h3>
              <p>Learn more about my journey and interests.</p>
              <Link to="/about" className={styles.featureLink}>Discover More &rarr;</Link>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default HomePage;