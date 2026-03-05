import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Numan Syed</h1>
        <p className={styles.heroSubtitle}>
          Software engineer, writer, and chronic tinkerer. Writing about systems programming, developer tooling, and lessons from breaking things.
        </p>
      </div>

      <section className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Latest Stories</h2>
        
        <div className={styles.postList}>
          {blogPosts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <div className={styles.postMeta}>
                <span className={styles.authorName}>Numan Syed</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.postDate}>{post.date}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              
              <Link to={`/blog/${post.slug}`} className={styles.postTitleLink}>
                <h3 className={styles.postTitle}>{post.title}</h3>
              </Link>
              
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              
              <div className={styles.postFooter}>
                <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                  Read more
                </Link>
                <div className={styles.topicTags}>
                  {post.tags && post.tags.slice(0, 2).map(tag => (
                    <Link key={tag} to={`/blog?topic=${encodeURIComponent(tag)}`} className={styles.topicTag}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link to="/blog" className={styles.viewAllPosts}>
          View all stories
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
