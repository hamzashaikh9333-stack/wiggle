import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const downloadVideo = (req, res) => {
  const url = req.query.url;
  const format = req.query.format || "mp3";

  if (!url) {
    return res.status(400).send("URL is required");
  }

  let fileName = `file_${Date.now()}`;
  let command = "";

  // 🔥 FORMAT LOGIC
  if (format === "mp3") {
    fileName += ".mp3";
    command = `"C:\\yt-dlp\\yt-dlp.exe" -x --audio-format mp3 --ffmpeg-location "C:\\ffmpeg\\ffmpeg-8.1-essentials_build\\bin" -o "${fileName.replace('.mp3', '.%(ext)s')}" ${url}`;
  }

  else if (format === "m4a") {
    fileName += ".m4a";
    command = `"C:\\yt-dlp\\yt-dlp.exe" -f bestaudio[ext=m4a] --ffmpeg-location "C:\\ffmpeg\\ffmpeg-8.1-essentials_build\\bin" -o "${fileName}" ${url}`;
  }

  else if (format === "720") {
    fileName += ".mp4";
    command = `"C:\\yt-dlp\\yt-dlp.exe" -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 --ffmpeg-location "C:\\ffmpeg\\ffmpeg-8.1-essentials_build\\bin" -o "${fileName}" ${url}`;
  }

  else if (format === "1080") {
    fileName += ".mp4";
    command = `"C:\\yt-dlp\\yt-dlp.exe" -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 --ffmpeg-location "C:\\ffmpeg\\ffmpeg-8.1-essentials_build\\bin" -o "${fileName}" ${url}`;
  }

  const filePath = path.resolve(fileName);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Download error");
    }

    res.download(filePath, fileName, (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  });
};