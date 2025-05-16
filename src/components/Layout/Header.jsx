import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ toggleTheme, currentTheme }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.numan}>Numan</span>
          <span className={styles.syed}>Syed</span>
          <span className={styles.com}>.com</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/blog" className={styles.navLink}>Blog</Link>
          <Link to="/reviews" className={styles.navLink}>Reviews</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
        </nav>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
};

export default Header;