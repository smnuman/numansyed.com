import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { tilEntries, tilTopics } from '../../data/tilEntries';
import styles from './TILPage.module.css';

const renderContentWithInlineCode = (content) => {
  if (!content) return null;
  
  const parts = content.split('`');
  return parts.map((part, index) => {
    // Even indices are regular text, odd indices are code
    if (index % 2 === 0) {
      return <React.Fragment key={index}>{part}</React.Fragment>;
    } else {
      return <code key={index} className={styles.inlineCode}>{part}</code>;
    }
  });
};

const TILPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  
  const filteredEntries = topic
    ? tilEntries.filter(entry => entry.tags.includes(topic))
    : tilEntries;

  return (
    <div className={styles.tilPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Today I Learned</h1>
        <p className={styles.pageSubtitle}>Bite-sized things I pick up every day.</p>
        
        <div className={styles.topicFilter}>
          {tilTopics.map((t) => (
            <Link 
              key={t} 
              to={`/til?topic=${encodeURIComponent(t)}`} 
              className={`${styles.topicLink} ${topic === t ? styles.topicLinkActive : ''}`}
            >
              {t}
            </Link>
          ))}
          {topic && (
            <Link to="/til" className={styles.clearFilter}>
              View all
            </Link>
          )}
        </div>
      </header>

      <div className={styles.entryList}>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <article key={entry.id} className={styles.entryItem}>
              <span className={styles.entryDate}>{entry.date}</span>
              <h2 className={styles.entryTitle}>{entry.title}</h2>
              <p className={styles.entryContent}>
                {renderContentWithInlineCode(entry.content)}
              </p>
              <div className={styles.entryFooter}>
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <Link key={tag} to={`/til?topic=${encodeURIComponent(tag)}`} className={styles.tag}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className={styles.noEntries}>
            {topic ? `No entries found for "${topic}".` : 'No entries yet.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TILPage;
