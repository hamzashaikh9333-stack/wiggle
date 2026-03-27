import { apiClient } from '../../../api/client';

export const downloadService = {
  downloadFromYouTube: async (url) => {
    try {
      const response = await apiClient.get(
        `/api/auth/download?url=${encodeURIComponent(url)}`
      );

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
      link.download = 'audio.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Failed to download audio');
    }
  },
};
