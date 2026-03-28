import styles from './ProgressBar.module.css';

export const ProgressBar = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <span className={styles.text}>Downloading...</span>
          <span className={styles.percentage}>{Math.round(progress)}%</span>
        </div>
        <div className={styles.barContainer}>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
