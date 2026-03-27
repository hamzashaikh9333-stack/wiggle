import { useState } from 'react';
import { downloadService } from '../api/downloadService';

export const useDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const download = async (url) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!url.trim()) {
        throw new Error('Please enter a valid YouTube URL');
      }

      // Basic URL validation
      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        throw new Error('Please enter a valid YouTube URL');
      }

      await downloadService.downloadFromYouTube(url);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'An error occurred during download');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    download,
    clearError: () => setError(null),
  };
};
