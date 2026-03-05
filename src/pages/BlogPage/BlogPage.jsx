import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, popularPosts, allTopics } from '../../data/blogPosts';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  return (
    <div className={styles.blogPage}>
      <div className={styles.mainContent}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Stories</h1>
          <p className={styles.pageSubtitle}>Thoughts, tutorials, and lessons learned.</p>
        </header>

        <div className={styles.postList}>
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.slug} className={styles.postItem}>
                <div className={styles.postMeta}>
                  <span className={styles.authorName}>Numan Syed</span>
                  <span className={styles.metaDot}>·</span>
                  <span className={styles.postDate}>{post.date}</span>
                  <span className={styles.metaDot}>·</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                
                <Link to={`/blog/${post.slug}`} className={styles.postTitleLink}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                </Link>
                
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                
                <div className={styles.postFooter}>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`} className={styles.readMoreLink}>
                    Read more
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.noPosts}>No blog posts yet. Check back soon!</p>
          )}
        </div>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <h3 className={styles.sidebarTitle}>Popular on Numan Syed</h3>
          <ul className={styles.popularList}>
            {popularPosts.map((post, index) => (
              <li key={post.slug} className={styles.popularItem}>
                <span className={styles.popularNumber}>{index + 1}</span>
                <div>
                  <Link to={`/blog/${post.slug}`} className={styles.popularLink}>
                    {post.title}
                  </Link>
                  <span className={styles.popularReads}>{post.reads} reads</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sidebarSection}>
          <h3 className={styles.sidebarTitle}>Discover by Topic</h3>
          <div className={styles.topicList}>
            {allTopics.map((topic) => (
              <Link key={topic} to={`/blog?topic=${topic}`} className={styles.topicLink}>
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
