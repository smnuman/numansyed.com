import React from 'react';
import styles from './AboutPage.module.css';
// import profilePic from '../../assets/profile.jpg'; // Placeholder for a profile picture

const AboutPage = () => {
  return (
    <div className={`${styles.aboutPage} container`}>
      <h1 className={styles.pageTitle}>About Me</h1>
      <section className={styles.introSection}>
        {/*
        <div className={styles.profileImageContainer}>
          <img src={profilePic} alt="Numan Syed" className={styles.profileImage} />
        </div>
        */}
        <div className={styles.introText}>
          <h2>Hi, I'm Numan Syed</h2>
          <p>
            I'm a passionate software developer with a keen interest in web technologies,
            problem-solving, and creating intuitive user experiences. This website serves as
            a personal space to share my thoughts, projects, and learnings.
          </p>
          <p>
            My journey into the world of code started with a fascination for how websites
            and applications are built. Since then, I've been continuously learning and
            exploring various aspects of software development, from front-end design to
            back-end logic.
          </p>
        </div>
      </section>

      <section className={styles.skillsSection}>
        <h2>Skills & Interests</h2>
        <p>
          I enjoy working with modern JavaScript frameworks like React, and I'm always
          eager to explore new tools and techniques that can improve development
          workflows and product quality. Some of my key areas of interest include:
        </p>
        <ul className={styles.skillsList}>
          <li>Frontend Development (HTML, CSS, JavaScript, React)</li>
          <li>Responsive Web Design & UI/UX Principles</li>
          <li>Version Control (Git & GitHub)</li>
          <li>Agile Methodologies</li>
          <li>Problem Solving & Algorithmic Thinking</li>
          <li>Continuous Learning & Tech Exploration</li>
        </ul>
      </section>

      <section className={styles.missionSection}>
        <h2>My Mission</h2>
        <p>
          Through this platform, I aim to document my growth as a developer, share
          insights that might be helpful to others, and connect with like-minded
          individuals. Whether it's a technical deep-dive, a review of a tool or book,
          or just a general musing on technology, I hope you find something valuable here.
        </p>
      </section>

      <section className={styles.connectSection}>
        <h2>Let's Connect</h2>
        <p>
          I'm always open to discussions, collaborations, or just a friendly chat.
          Feel free to reach out! (Contact methods to be added later - e.g., LinkedIn, GitHub, Email).
        </p>
      </section>
    </div>
  );
};

export default AboutPage;