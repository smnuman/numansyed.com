import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPage.module.css';

// Dummy blog post data
const blogPosts = [
  {
    slug: 'building-this-website',
    title: 'Building This Website with React & Vite',
    date: 'May 17, 2025',
    excerpt: 'A quick look into the tools and techniques used to create numansyed.com, including React for the UI, Vite for the build tool, and a custom theme system.',
  },
  {
    slug: 'importance-of-dark-mode',
    title: 'The Importance of Dark Mode in Modern Web Design',
    date: 'May 16, 2025',
    excerpt: 'Why every modern website should consider a dark theme option for user comfort, accessibility, and aesthetic appeal.',
  },
  {
    slug: 'responsive-design-principles',
    title: 'Core Principles of Responsive Web Design',
    date: 'May 15, 2025',
    excerpt: 'Ensuring your website looks and functions great on all devices, from desktops to smartphones, is crucial. Here are some key principles.',
  },
  // Add more posts as needed
];

const BlogPage = () => {
  return (
    <div className={`${styles.blogPage} container`}>
      <h1 className={styles.pageTitle}>Blog</h1>
      <p className={styles.pageSubtitle}>Thoughts, tutorials, and updates.</p>
      <div className={styles.postList}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <article key={post.slug} className={styles.postItem}>
              <h2 className={styles.postTitle}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className={styles.postMeta}>Published on {post.date}</p>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className={styles.readMoreLink}>
                Read More &rarr;
              </Link>
            </article>
          ))
        ) : (
          <p>No blog posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;