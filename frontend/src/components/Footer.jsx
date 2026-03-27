import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {currentYear} MP3 Converter. All rights reserved.
        </p>
        <p className={styles.disclaimer}>
          Please ensure you have the right to download content before using this tool.
        </p>
      </div>
    </footer>
  );
};
