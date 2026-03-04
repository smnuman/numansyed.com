import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const blogPosts = [
  {
    slug: 'git-crypt-decontamination-submodule-restructure',
    title: 'How I Decontaminated a Poisoned Git-Crypt Repo and Rebuilt My Entire Dotfiles Hierarchy',
    date: 'February 21, 2026',
    readTime: '12 min read',
    excerpt: 'A war story about git-crypt encrypting its own infrastructure files, a phantom self-referencing submodule, and three phases of surgical repair across five interconnected repositories.',
  },
  {
    slug: 'building-this-website',
    title: 'Building This Website with React & Vite',
    date: 'May 17, 2025',
    readTime: '4 min read',
    excerpt: 'A quick look into the tools and techniques used to create numansyed.com, including React for the UI, Vite for the build tool, and a custom theme system.',
  },
  {
    slug: 'importance-of-dark-mode',
    title: 'The Importance of Dark Mode in Modern Web Design',
    date: 'May 16, 2025',
    readTime: '5 min read',
    excerpt: 'Why every modern website should consider a dark theme option for user comfort, accessibility, and aesthetic appeal.',
  },
];

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
                  <span className={styles.topicTag}>Programming</span>
                  <span className={styles.topicTag}>DevOps</span>
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
