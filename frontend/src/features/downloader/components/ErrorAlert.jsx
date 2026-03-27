import styles from './ErrorAlert.module.css';

export const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={styles.alert}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};
