import styles from './DownloadButton.module.css';

export const DownloadButton = ({ onClick, loading, disabled, format }) => {
  const formatLabels = {
    mp3: 'Download MP3 128kbps',
    m4a: 'Download High Quality Audio',
    '720': 'Download Video 720p',
    '1080': 'Download Video 1080p',
  };

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
          <span>{formatLabels[format] || 'Download'}</span>
        </>
      )}
    </button>
  );
};
