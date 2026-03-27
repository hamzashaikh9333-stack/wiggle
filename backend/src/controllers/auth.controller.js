import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const downloadVideo = (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  // file path
  const fileName = `audio_${Date.now()}_${Math.floor(Math.random() * 1000)}.mp3`;
  const filePath = path.resolve(fileName);

  // yt-dlp command
  const command = `"C:\\yt-dlp\\yt-dlp.exe" -x --audio-format mp3 --ffmpeg-location "C:\\ffmpeg\\ffmpeg-8.1-essentials_build\\bin" -o "${fileName.replace(".mp3", ".%(ext)s")}" ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).send("Download error");
    }

    // send file
    res.download(filePath, fileName, (err) => {
      if (err) console.error(err);

      fs.unlinkSync(filePath); // delete after send
    });
  });
};
