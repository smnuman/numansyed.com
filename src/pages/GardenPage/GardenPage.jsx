import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gardenNotes, gardenTopics, statusInfo } from '../../data/gardenNotes';
import styles from './GardenPage.module.css';

const STATUS_OPTIONS = ['all', 'seedling', 'budding', 'evergreen'];

const GardenPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredNotes = gardenNotes.filter(note => {
    const matchesTopic = !topic || note.tags.includes(topic);
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    return matchesTopic && matchesStatus;
  });

  return (
    <div className={styles.gardenPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {topic ? `${topic} Notes` : 'Digital Garden'}
        </h1>
        <p className={styles.pageSubtitle}>
          Ideas growing at their own pace — from seedlings to evergreen notes.
        </p>
        {topic && (
          <Link to="/garden" className={styles.clearFilter}>
            View all notes
          </Link>
        )}
      </header>

      <div className={styles.filterBar}>
        <div className={styles.statusFilters}>
          {STATUS_OPTIONS.map(status => (
            <button
              key={status}
              className={styles.statusButton}
              style={statusFilter === status ? {
                color: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              } : undefined}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all'
                ? 'All'
                : `${statusInfo[status].emoji} ${statusInfo[status].label}`}
            </button>
          ))}
        </div>
        <div className={styles.topicFilters}>
          {gardenTopics.map(t => (
            <Link
              key={t}
              to={`/garden?topic=${encodeURIComponent(t)}`}
              className={styles.topicLink}
              style={topic === t ? {
                color: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              } : undefined}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        <div className={styles.cardGrid}>
          {filteredNotes.map(note => (
            <Link
              key={note.slug}
              to={`/garden/${note.slug}`}
              className={styles.card}
            >
              <span className={`${styles.statusBadge} ${styles[`status_${note.status}`]}`}>
                {statusInfo[note.status].emoji} {statusInfo[note.status].label}
              </span>
              <h2 className={styles.cardTitle}>{note.title}</h2>
              <p className={styles.cardExcerpt}>{note.excerpt}</p>
              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {note.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <span className={styles.lastUpdated}>
                  Last updated: {note.lastUpdated}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>
          No notes match the current filters. Try adjusting your selection.
        </p>
      )}
    </div>
  );
};

export default GardenPage;
