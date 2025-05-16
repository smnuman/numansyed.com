import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.footerContainer}>
        <p>&copy; {new Date().getFullYear()} numansyed.com. All rights reserved.</p>
        {/* Optional: Add social media links or other footer content here */}
        {/* <div className={styles.socialLinks}>
          <a href="#" target="_blank" rel="noopener noreferrer">GH</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LI</a>
        </div> */}
      </div>
    </motion.footer>
  );
};

export default Footer;