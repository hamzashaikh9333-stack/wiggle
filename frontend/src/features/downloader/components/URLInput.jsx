import styles from "./URLInput.module.css";

export const URLInput = ({ value, onChange, disabled }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor="youtube-url" className={styles.label}>
        YouTube URL
      </label>
      <div className={styles.inputWrapper}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <input
          id="youtube-url"
          type="text"
          placeholder="Paste your YouTube URL here..."
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
        />
      </div>
    </div>
  );
};
