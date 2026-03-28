import styles from './FormatSelector.module.css';

export const FormatSelector = ({ selectedFormat, onFormatChange, disabled }) => {
  const formats = [
    {
      id: 'mp3',
      label: 'MP3 128kbps',
      description: 'Standard quality audio',
      icon: '♫',
    },
    {
      id: 'm4a',
      label: 'High Quality Audio',
      description: 'M4A format',
      icon: '★',
    },
    {
      id: '720',
      label: 'Download Video',
      description: '720p quality',
      icon: '▶',
    },
    {
      id: '1080',
      label: 'HD Video',
      description: '1080p quality',
      icon: '🎬',
    },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select Format</h3>
      <div className={styles.grid}>
        {formats.map((format) => (
          <button
            key={format.id}
            onClick={() => onFormatChange(format.id)}
            disabled={disabled}
            className={`${styles.button} ${
              selectedFormat === format.id ? styles.active : ''
            }`}
          >
            <span className={styles.icon}>{format.icon}</span>
            <span className={styles.label}>{format.label}</span>
            <span className={styles.description}>{format.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
