import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './BlogPage.module.css';
import blogPosts from '../../data/blogPosts.json'; // Placeholder data

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - numansyed.com</title>
        <meta name="description" content="Read the latest articles and thoughts on technology, development, and more from Numan Syed." />
      </Helmet>
      <motion.div
        className={styles.blogPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.pageTitle} variants={itemVariants}>
          My Thoughts & Articles
        </motion.h1>
        {blogPosts.length > 0 ? (
          <motion.div className={styles.postsGrid} variants={containerVariants}>
            {blogPosts.map((post) => (
              <motion.article key={post.id} className={styles.postCard} variants={itemVariants}>
                <Link to={`/blog/${post.id}`} className={styles.cardLink}>
                  {post.image && (
                    <div className={styles.postImageContainer}>
                      <img src={post.image} alt={post.title} className={styles.postImage} />
                    </div>
                  )}
                  <div className={styles.postContent}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <span>{post.date}</span>
                      {/* <span>&bull; {post.readTime}</span> */}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.p variants={itemVariants} className={styles.noPosts}>
            No blog posts yet. Check back soon!
          </motion.p>
        )}
      </motion.div>
    </>
  );
};

export default BlogPage;