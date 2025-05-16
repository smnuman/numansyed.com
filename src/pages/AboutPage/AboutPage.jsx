import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styles from './AboutPage.module.css';
// Assuming a placeholder image for the about page, e.g., a profile picture
// You'll need to add this image to your assets, e.g., public/images/profile.jpg
// For now, we'll use the general placeholder from assets if it exists, or none.
// import profileImage from '../../assets/profile.jpg'; // Example path

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      type: 'spring',
      stiffness: 100,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Me - numansyed.com</title>
        <meta name="description" content="Learn more about Numan Syed, his skills, experience, and passion for technology and web development." />
      </Helmet>
      <motion.div
        className={styles.aboutPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header className={styles.aboutHeader} variants={itemVariants}>
          {/* Example: Profile Image
          {profileImage && (
            <motion.img
              src={profileImage}
              alt="Numan Syed"
              className={styles.profileImage}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            />
          )}
          */}
          <motion.h1 variants={itemVariants}>About Numan Syed</motion.h1>
          <motion.p className={styles.tagline} variants={itemVariants}>
            Passionate Developer | Tech Enthusiast | Lifelong Learner
          </motion.p>
        </motion.header>

        <motion.section className={styles.aboutContent} variants={itemVariants}>
          <motion.h2 variants={itemVariants}>My Journey</motion.h2>
          <motion.p variants={itemVariants}>
            Hello! I'm Numan, a software developer with a keen interest in building
            efficient, scalable, and user-friendly web applications. My journey into
            the world of code started with a fascination for how websites worked,
            and it has since grown into a full-blown passion.
          </motion.p>
          <motion.p variants={itemVariants}>
            I enjoy tackling complex problems and continuously learning new
            technologies. This website serves as a small canvas for my thoughts,
            projects, and reviews.
          </motion.p>

          <motion.h2 variants={itemVariants}>Skills & Technologies</motion.h2>
          <motion.ul className={styles.skillsList} variants={itemVariants}>
            <li>JavaScript (ES6+)</li>
            <li>React & Next.js</li>
            <li>Node.js & Express</li>
            <li>HTML5 & CSS3/SCSS</li>
            <li>Git & GitHub</li>
            <li>Cloud Platforms (e.g., AWS, Cloudflare)</li>
            <li>Databases (SQL & NoSQL)</li>
            <li>And always learning more...</li>
          </motion.ul>

          <motion.h2 variants={itemVariants}>Interests</motion.h2>
          <motion.p variants={itemVariants}>
            Beyond coding, I'm interested in UI/UX design principles, open-source
            contributions, and exploring the latest trends in the tech industry.
            When I'm not at my computer, I enjoy [Your Hobby 1], [Your Hobby 2],
            and spending time with family and friends.
          </motion.p>

          <motion.h2 variants={itemVariants}>Get In Touch</motion.h2>
          <motion.p variants={itemVariants}>
            Feel free to connect with me on{' '}
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a> or check out my projects on{' '}
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </motion.p>
        </motion.section>
      </motion.div>
    </>
  );
};

export default AboutPage;