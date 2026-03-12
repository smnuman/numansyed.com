import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gardenNotes, statusInfo } from '../../data/gardenNotes';
import styles from './GardenNotePage.module.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const GardenNotePage = () => {
  const { slug } = useParams();
  const note = gardenNotes.find(n => n.slug === slug);

  if (!note) {
    return <NotFoundPage />;
  }

  const status = statusInfo[note.status];
  const connectedNotes = note.connections
    .map(connSlug => gardenNotes.find(n => n.slug === connSlug))
    .filter(Boolean);

  return (
    <div className={styles.gardenNotePage}>
      <article className={styles.noteContent}>
        <header className={styles.noteHeader}>
          <div className={`${styles.statusBadge} ${styles[note.status]}`}>
            <span className={styles.statusEmoji}>{status.emoji}</span>
            <span className={styles.statusLabel}>{status.label}</span>
            <span className={styles.statusSep}>&mdash;</span>
            <span className={styles.statusDesc}>{status.description}</span>
          </div>
          <h1 className={styles.noteTitle}>{note.title}</h1>
          <div className={styles.metaLine}>
            <span>Last updated: {note.lastUpdated}</span>
            <span className={styles.metaDot}>&middot;</span>
            <span>Planted: {note.created}</span>
          </div>
        </header>

        <div
          className={styles.noteBody}
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        <footer className={styles.noteFooter}>
          {note.tags.length > 0 && (
            <div className={styles.tagsSection}>
              {note.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/garden?topic=${encodeURIComponent(tag)}`}
                  className={styles.tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {connectedNotes.length > 0 && (
            <div className={styles.connectionsSection}>
              <h3 className={styles.connectionsTitle}>Connected Notes</h3>
              <div className={styles.connectionsList}>
                {connectedNotes.map(cn => {
                  const cnStatus = statusInfo[cn.status];
                  return (
                    <Link
                      key={cn.slug}
                      to={`/garden/${cn.slug}`}
                      className={styles.connectionCard}
                    >
                      <span className={styles.connectionEmoji}>
                        {cnStatus.emoji}
                      </span>
                      <div className={styles.connectionInfo}>
                        <span className={styles.connectionTitle}>
                          {cn.title}
                        </span>
                        <span className={styles.connectionExcerpt}>
                          {cn.excerpt}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <Link to="/garden" className={styles.backLink}>
            &larr; Back to Garden
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default GardenNotePage;
