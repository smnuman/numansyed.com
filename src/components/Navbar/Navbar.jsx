import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons
import { useTheme } from '../../context/ThemeContext'; // Import useTheme hook
import styles from './Navbar.module.css';

const navLinkVariants = {
  hover: { scale: 1.1, originX: 0 },
  tap: { scale: 0.95 }
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Use theme from context

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10 }}
    >
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoNuman}>numan</span><span className={styles.logoSyed}>syed</span>.com
        </Link>
        <ul className={styles.navLinks}>
          <motion.li variants={navLinkVariants} whileHover="hover" whileTap="tap">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Home
            </NavLink>
          </motion.li>
          <motion.li variants={navLinkVariants} whileHover="hover" whileTap="tap">
            <NavLink
              to="/blog"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Blog
            </NavLink>
          </motion.li>
          <motion.li variants={navLinkVariants} whileHover="hover" whileTap="tap">
            <NavLink
              to="/reviews"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Reviews
            </NavLink>
          </motion.li>
          <motion.li variants={navLinkVariants} whileHover="hover" whileTap="tap">
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              About
            </NavLink>
          </motion.li>
        </ul>
        <button onClick={toggleTheme} className={styles.themeToggleButton} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;