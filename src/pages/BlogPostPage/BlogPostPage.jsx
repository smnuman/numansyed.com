import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styles from './BlogPostPage.module.css';
import blogPostsData from '../../data/blogPosts.json'; // Placeholder data

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPostsData.find((p) => p.id === postId);

  if (!post) {
    // Optional: Redirect to a 404 page or Blog page if post not found
    // For now, just rendering a message or redirecting to blog
    return <Navigate to="/blog" replace />;
    // Or return <Navigate to="/404" replace />; if you have a dedicated 404 component route
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Blog | numansyed.com</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <motion.article
        className={styles.blogPostPage}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {post.image && (
          <motion.div className={styles.postImageHeader} variants={itemVariants}>
            <img src={post.image} alt={post.title} className={styles.postImage} />
          </motion.div>
        )}
        <motion.h1 className={styles.postTitle} variants={itemVariants}>
          {post.title}
        </motion.h1>
        <motion.div className={styles.postMeta} variants={itemVariants}>
          <span>{post.date}</span>
          {/* <span>&bull; {post.readTime}</span> */}
        </motion.div>
        <motion.div
          className={styles.postContent}
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} // Basic rendering, consider Markdown parser for real content
        />
        <motion.div className={styles.backLinkContainer} variants={itemVariants}>
          <Link to="/blog" className={styles.backLink}>
            &larr; Back to Blog
          </Link>
        </motion.div>
      </motion.article>
    </>
  );
};

export default BlogPostPage;