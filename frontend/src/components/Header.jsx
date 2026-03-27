import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>🎵 MP3 Converter</div>
        <nav className={styles.nav}>
          <a href="#" className={styles.link}>
            Home
          </a>
        </nav>
      </div>
    </header>
  );
};
