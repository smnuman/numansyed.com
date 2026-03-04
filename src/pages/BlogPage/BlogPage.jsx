import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPage.module.css';

const blogPosts = [
  {
    slug: 'git-crypt-decontamination-submodule-restructure',
    title: 'How I Decontaminated a Poisoned Git-Crypt Repo and Rebuilt My Entire Dotfiles Hierarchy',
    date: 'February 21, 2026',
    readTime: '12 min read',
    excerpt: 'A war story about git-crypt encrypting its own infrastructure files, a phantom self-referencing submodule, and three phases of surgical repair across five interconnected repositories.',
    tags: ['Git', 'DevOps', 'Systems'],
  },
  {
    slug: 'building-this-website',
    title: 'Building This Website with React & Vite',
    date: 'May 17, 2025',
    readTime: '4 min read',
    excerpt: 'A quick look into the tools and techniques used to create numansyed.com, including React for the UI, Vite for the build tool, and a custom theme system.',
    tags: ['React', 'Web Dev', 'Tutorial'],
  },
  {
    slug: 'importance-of-dark-mode',
    title: 'The Importance of Dark Mode in Modern Web Design',
    date: 'May 16, 2025',
    readTime: '5 min read',
    excerpt: 'Why every modern website should consider a dark theme option for user comfort, accessibility, and aesthetic appeal.',
    tags: ['Design', 'UX', 'Accessibility'],
  },
  {
    slug: 'responsive-design-principles',
    title: 'Core Principles of Responsive Web Design',
    date: 'May 15, 2025',
    readTime: '6 min read',
    excerpt: 'Ensuring your website looks and functions great on all devices, from desktops to smartphones, is crucial. Here are some key principles.',
    tags: ['Design', 'CSS', 'Mobile'],
  },
];

const popularPosts = [
  { slug: 'git-crypt-decontamination-submodule-restructure', title: 'Decontaminating a Poisoned Git-Crypt Repo', reads: '2.4k' },
  { slug: 'building-this-website', title: 'Building This Website', reads: '1.8k' },
  { slug: 'importance-of-dark-mode', title: 'Dark Mode in Modern Web Design', reads: '1.2k' },
];

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
            {['Programming', 'DevOps', 'Web Development', 'Design', 'Tutorial', 'Systems'].map((topic) => (
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
