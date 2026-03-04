import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ toggleTheme, currentTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.numan}>Numan</span>
          </Link>
          
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            <Link 
              to="/" 
              className={styles.navLink} 
              onClick={closeMenu}
              style={isActive('/') ? { color: 'var(--color-text-primary)' } : {}}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={styles.navLink} 
              onClick={closeMenu}
              style={isActive('/blog') || location.pathname.startsWith('/blog/') ? { color: 'var(--color-text-primary)' } : {}}
            >
              Blog
            </Link>
            <Link 
              to="/reviews" 
              className={styles.navLink} 
              onClick={closeMenu}
              style={isActive('/reviews') ? { color: 'var(--color-text-primary)' } : {}}
            >
              Reviews
            </Link>
            <Link 
              to="/about" 
              className={styles.navLink} 
              onClick={closeMenu}
              style={isActive('/about') ? { color: 'var(--color-text-primary)' } : {}}
            >
              About
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <button 
            className={styles.searchButton} 
            aria-label="Search"
            onClick={() => {}}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          
          <button className={styles.writeButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Write
          </button>
          
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
            {currentTheme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          
          <button className={styles.avatar} aria-label="User menu">
            <span className={styles.avatarInitial}>N</span>
          </button>
        </div>

        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;
