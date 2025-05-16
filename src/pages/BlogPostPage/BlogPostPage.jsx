import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogPostPage.module.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

// Dummy blog post data (should ideally be fetched or imported from a central place)
const blogPosts = {
  'building-this-website': {
    title: 'Building This Website with React & Vite',
    date: 'May 17, 2025',
    author: 'Numan Syed',
    content: `
      <p>This website, numansyed.com, was built using a modern JavaScript stack. Here's a quick rundown of the key technologies and why they were chosen:</p>
      <ul>
        <li><strong>React:</strong> A popular JavaScript library for building user interfaces. Its component-based architecture makes it easy to create reusable UI elements.</li>
        <li><strong>Vite:</strong> A next-generation frontend tooling that provides an extremely fast development server and optimized builds. It made the development experience very smooth.</li>
        <li><strong>React Router:</strong> For handling client-side routing, allowing for a single-page application (SPA) feel.</li>
        <li><strong>CSS Modules:</strong> To scope CSS locally to components, preventing style conflicts and making styling more manageable.</li>
        <li><strong>Dark/Light Theme:</strong> Implemented using CSS custom properties (variables) and a simple JavaScript toggle, with theme preference saved to local storage.</li>
      </ul>
      <p>The goal was to create a clean, modern, and responsive personal website that's easy to maintain and update. The design is inspired by nayeemsyed.com, focusing on readability and a pleasant user experience.</p>
      <p>Future improvements might include adding a CMS for blog posts, more interactive elements, and further performance optimizations.</p>
    `,
  },
  'importance-of-dark-mode': {
    title: 'The Importance of Dark Mode in Modern Web Design',
    date: 'May 16, 2025',
    author: 'Numan Syed',
    content: `
      <p>Dark mode has become an increasingly popular feature in applications and websites, and for good reason. It's not just a trend; it offers several tangible benefits:</p>
      <ul>
        <li><strong>Reduced Eye Strain:</strong> Especially in low-light environments, dark mode can be easier on the eyes by reducing the overall brightness of the screen.</li>
        <li><strong>Improved Readability:</strong> For some users, light text on a dark background can enhance contrast and make text easier to read.</li>
        <li><strong>Battery Savings:</strong> On OLED and AMOLED screens, dark mode can conserve battery life because black pixels are essentially turned off.</li>
        <li><strong>Aesthetic Appeal:</strong> Many users simply prefer the look and feel of dark interfaces. It can give a website a sleek, modern appearance.</li>
        <li><strong>Accessibility:</strong> For users with certain visual impairments, such as photophobia, dark mode can be a crucial accessibility feature.</li>
      </ul>
      <p>Implementing dark mode using CSS custom properties is relatively straightforward and provides a significant enhancement to the user experience. It's a feature worth considering for any modern web project.</p>
    `,
  },
  'responsive-design-principles': {
    title: 'Core Principles of Responsive Web Design',
    date: 'May 15, 2025',
    author: 'Numan Syed',
    content: `
      <p>With the variety of devices used to access the web today, responsive web design (RWD) is no longer a luxury but a necessity. The core idea is to create web pages that look good on all devices (desktops, tablets, and phones).</p>
      <p>Here are some fundamental principles:</p>
      <ul>
        <li><strong>Fluid Grids:</strong> Using relative units like percentages for widths, rather than fixed units like pixels. This allows the layout to adapt to different screen sizes.</li>
        <li><strong>Flexible Images:</strong> Ensuring images scale within their containing elements, often using <code>max-width: 100%;</code>.</li>
        <li><strong>Media Queries:</strong> A CSS technique that allows you to apply different styles based on device characteristics, primarily screen width.</li>
        <li><strong>Mobile-First Approach:</strong> Designing for mobile devices first and then progressively enhancing the design for larger screens. This often leads to a cleaner, more focused design.</li>
        <li><strong>Content Prioritization:</strong> Thinking about what content is most important and how it should be presented on smaller screens where space is limited.</li>
      </ul>
      <p>By adhering to these principles, developers can create websites that provide a consistent and optimal user experience across a wide range of devices.</p>
    `,
  },
};


const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className={`${styles.blogPostPage} container`}>
      <article className={styles.postContent}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postMeta}>
          By {post.author} on {post.date}
        </p>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <Link to="/blog" className={styles.backLink}>
        &larr; Back to Blog
      </Link>
    </div>
  );
};

export default BlogPostPage;