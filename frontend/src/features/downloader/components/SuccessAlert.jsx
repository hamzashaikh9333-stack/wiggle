import styles from './SuccessAlert.module.css';

export const SuccessAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.alert}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
