import { useState } from 'react';
import { URLInput } from './components/URLInput';
import { DownloadButton } from './components/DownloadButton';
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';
import { ProgressBar } from './components/ProgressBar';
import { FormatSelector } from './components/FormatSelector';
import { useDownload } from './hooks/useDownload';
import styles from './DownloaderPage.module.css';

export const DownloaderPage = () => {
  const [url, setUrl] = useState('');
  const {
    loading,
    error,
    success,
    progress,
    selectedFormat,
    download,
    setSelectedFormat,
    clearError,
  } = useDownload();

  const handleDownload = async () => {
    await download(url, selectedFormat);
    if (!error) {
      setUrl('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && url.trim()) {
      handleDownload();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="1" />
              <path d="M12 5v14" />
              <path d="M8 9v6" />
              <path d="M16 7v10" />
            </svg>
            <h1 className={styles.title}>wiggle</h1>
          </div>
          <p className={styles.subtitle}>
            Download audio & videos from YouTube in multiple formats
          </p>
        </div>

        <div className={styles.card}>
          {success && (
            <SuccessAlert message="Download completed successfully! ✓" />
          )}

          {error && (
            <ErrorAlert
              message={error}
              onClose={clearError}
            />
          )}

          <div onKeyPress={handleKeyPress}>
            <URLInput
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>

          <FormatSelector
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            disabled={loading}
          />

          <ProgressBar progress={progress} isVisible={loading} />

          <DownloadButton
            onClick={handleDownload}
            loading={loading}
            disabled={!url.trim()}
            format={selectedFormat}
          />

          <div className={styles.features}>
            <h2 className={styles.featuresTitle}>Features</h2>
            <ul className={styles.featuresList}>
              <li>
                <span className={styles.checkmark}>✓</span>
                Convert YouTube to MP3 (128kbps)
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                High quality audio (M4A format)
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                Download videos (720p & 1080p)
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                Real-time download progress tracking
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                Support for youtube.com and youtu.be links
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
