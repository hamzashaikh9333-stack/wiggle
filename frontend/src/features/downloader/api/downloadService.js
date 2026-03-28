import { apiClient } from '../../../api/client';

export const downloadService = {
  downloadFromYouTube: async (url, format = 'mp3', onProgress = null) => {
    try {
      const controller = new AbortController();
      
      // Simulate progress updates while downloading
      let simulatedProgress = 0;
      const progressInterval = setInterval(() => {
        if (simulatedProgress < 90) {
          simulatedProgress += Math.random() * 30;
          if (onProgress) {
            onProgress(Math.min(simulatedProgress, 90));
          }
        }
      }, 500);

      const response = await apiClient.get(
        `/api/auth/download?url=${encodeURIComponent(url)}&format=${format}`,
        { signal: controller.signal }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Download failed');
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Determine filename based on format
      const fileExtensions = {
        mp3: 'audio.mp3',
        m4a: 'audio.m4a',
        '720': 'video.mp4',
        '1080': 'video.mp4',
      };

      link.download = fileExtensions[format] || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Failed to download');
    }
  },
};
