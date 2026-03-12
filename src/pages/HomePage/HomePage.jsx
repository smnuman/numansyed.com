import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { gardenNotes, statusInfo } from '../../data/gardenNotes';
import { tilEntries } from '../../data/tilEntries';
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

      <section className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>From the Garden</h2>
        
        <div className={styles.gardenGrid}>
          {gardenNotes.slice(0, 3).map((note) => (
            <Link key={note.slug} to={`/garden/${note.slug}`} className={styles.gardenCard}>
              <span className={styles.gardenStatus}>
                {statusInfo[note.status].emoji} {statusInfo[note.status].label}
              </span>
              <h3 className={styles.gardenCardTitle}>{note.title}</h3>
              <p className={styles.gardenCardExcerpt}>{note.excerpt}</p>
            </Link>
          ))}
        </div>

        <Link to="/garden" className={styles.viewAllPosts}>
          Explore the garden
        </Link>
      </section>

      <section className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Recently Learned</h2>
        
        <div className={styles.tilList}>
          {tilEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className={styles.tilEntry}>
              <span className={styles.tilDate}>{entry.date}</span>
              <h3 className={styles.tilTitle}>{entry.title}</h3>
            </div>
          ))}
        </div>

        <Link to="/til" className={styles.viewAllPosts}>
          View all TILs
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
