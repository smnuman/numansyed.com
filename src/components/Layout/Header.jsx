import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import styles from './Header.module.css';

const Header = ({ toggleTheme, currentTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const fuzzyMatch = (text, query) => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (textLower.includes(queryLower)) {
      return { match: true, score: queryLower.length / textLower.length };
    }
    
    let queryIndex = 0;
    let score = 0;
    let prevMatchIndex = -1;
    
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += 1;
        if (prevMatchIndex === i - 1 || prevMatchIndex === -1) {
          score += 0.5;
        }
        prevMatchIndex = i;
        queryIndex++;
      }
    }
    
    if (queryIndex === queryLower.length) {
      return { match: true, score: score / textLower.length };
    }
    
    return { match: false, score: 0 };
  };

  const searchPosts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = blogPosts
      .map(post => {
        const titleMatch = fuzzyMatch(post.title, query);
        const excerptMatch = fuzzyMatch(post.excerpt, query);
        const contentMatch = post.content ? fuzzyMatch(post.content, query) : { score: 0 };
        const tagMatch = post.tags.some(tag => fuzzyMatch(tag, query).match);
        
        const maxScore = Math.max(titleMatch.score, excerptMatch.score, contentMatch.score);
        
        return {
          ...post,
          matchScore: maxScore + (tagMatch ? 0.3 : 0),
        };
      })
      .filter(post => post.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setSearchResults(results);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchPosts(query);
  };

  const toggleSearch = () => {
    if (searchExpanded) {
      if (searchQuery) {
        setSearchQuery('');
        setSearchResults([]);
      } else {
        setSearchExpanded(false);
      }
    } else {
      setSearchExpanded(true);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setSearchExpanded(false);
    }
  };

  const closeSearch = () => {
    setSearchExpanded(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    closeSearch();
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (searchQuery) {
          setSearchQuery('');
          setSearchResults([]);
        } else {
          setSearchExpanded(false);
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target) && searchExpanded && !searchQuery) {
        setSearchExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [searchExpanded, searchQuery]);

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.numan}>Numan</span>
            <span className={styles.syed}>Syed</span>
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
          <div className={styles.searchContainer} ref={searchContainerRef}>
            <div className={`${styles.searchExpandable} ${searchExpanded ? styles.expanded : ''}`}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInputField}
                placeholder="Search stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
              />
              {searchResults.length > 0 && (
                <div className={styles.searchDropdown}>
                  {searchResults.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className={styles.searchResultItem}
                      onClick={closeSearch}
                    >
                      <div className={styles.searchResultTitle}>{post.title}</div>
                      <div className={styles.searchResultMeta}>
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.searchResultTags}>
                          {post.tags.map(tag => (
                            <Link
                              key={tag}
                              to={`/blog?topic=${encodeURIComponent(tag)}`}
                              className={styles.searchResultTag}
                              onClick={(e) => {
                                e.stopPropagation();
                                closeSearch();
                              }}
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button 
              className={styles.searchButton} 
              aria-label="Search"
              onClick={toggleSearch}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
          
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
