import { useState } from 'react';
import { downloadService } from '../api/downloadService';

export const useDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('mp3');

  const download = async (url, format = 'mp3') => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      if (!url.trim()) {
        throw new Error('Please enter a valid YouTube URL');
      }

      // Basic URL validation
      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        throw new Error('Please enter a valid YouTube URL');
      }

      await downloadService.downloadFromYouTube(url, format, (progressValue) => {
        setProgress(Math.min(progressValue, 99));
      });

      setProgress(100);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setProgress(0);
      }, 3000);
    } catch (err) {
      setError(err.message || 'An error occurred during download');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    progress,
    selectedFormat,
    download,
    setSelectedFormat,
    clearError: () => setError(null),
  };
};
