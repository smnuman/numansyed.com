import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>Numan Syed</Link>
            <p className={styles.footerTagline}>
              Software engineer, writer, and chronic tinkerer.
            </p>
          </div>
          
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Write</h4>
              <ul className={styles.footerList}>
                <li><a href="#" className={styles.footerLink}>Start writing</a></li>
                <li><a href="#" className={styles.footerLink}>Writing tips</a></li>
                <li><a href="#" className={styles.footerLink}>Publishing guide</a></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Read</h4>
              <ul className={styles.footerList}>
                <li><Link to="/blog" className={styles.footerLink}>Blog</Link></li>
                <li><Link to="/reviews" className={styles.footerLink}>Reviews</Link></li>
                <li><Link to="/about" className={styles.footerLink}>About</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Connect</h4>
              <ul className={styles.footerList}>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a></li>
                <li><a href="mailto:hello@numansyed.com" className={styles.footerLink}>Email</a></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>About</h4>
              <ul className={styles.footerList}>
                <li><Link to="/about" className={styles.footerLink}>About Me</Link></li>
                <li><a href="#" className={styles.footerLink}>Contact</a></li>
                <li><a href="#" className={styles.footerLink}>Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <span>&copy; {currentYear} Numan Syed</span>
            <span className={styles.separator}>·</span>
            <span>All rights reserved</span>
          </div>
          <div className={styles.footerMeta}>
            <a href="#" className={styles.metaLink}>Terms</a>
            <a href="#" className={styles.metaLink}>Privacy</a>
            <a href="#" className={styles.metaLink}>Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
