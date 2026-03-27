import styles from './DownloadButton.module.css';

export const DownloadButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={styles.button}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download MP3</span>
        </>
      )}
    </button>
  );
};
