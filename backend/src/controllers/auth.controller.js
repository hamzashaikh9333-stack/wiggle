import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export const downloadVideo = (req, res) => {
  const url = req.query.url;
  const format = req.query.format || "mp3";

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Use system temp directory for better compatibility on Railway
  const tempDir = os.tmpdir();
  const fileName = `file_${Date.now()}`;
  let outputName = "";
  let command = "";

  try {
    // Base yt-dlp options with YouTube authentication fixes
    const ytdlpBaseFlags = "-x --no-check-certificates --socket-timeout 30 --extractor-args youtube:skip=hls/dash --retries 3 --quiet";

    // 🔥 USE PYTHON yt-dlp (IMPORTANT)
    if (format === "mp3") {
      outputName = `${fileName}.mp3`;
      command = `python3 -m yt_dlp ${ytdlpBaseFlags} --audio-format mp3 -o "${path.join(
        tempDir,
        fileName + ".%(ext)s"
      )}" "${url}"`;
    } else if (format === "m4a") {
      outputName = `${fileName}.m4a`;
      command = `python3 -m yt_dlp ${ytdlpBaseFlags} -f bestaudio[ext=m4a] -o "${path.join(
        tempDir,
        fileName + ".m4a"
      )}" "${url}"`;
    } else if (format === "720") {
      outputName = `${fileName}.mp4`;
      command = `python3 -m yt_dlp ${ytdlpBaseFlags} -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 -o "${path.join(
        tempDir,
        fileName + ".mp4"
      )}" "${url}"`;
    } else if (format === "1080") {
      outputName = `${fileName}.mp4`;
      command = `python3 -m yt_dlp ${ytdlpBaseFlags} -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 -o "${path.join(
        tempDir,
        fileName + ".mp4"
      )}" "${url}"`;
    } else {
      return res.status(400).json({ error: "Invalid format" });
    }

    const filePath = path.join(tempDir, outputName);

    console.log("Running command:", command);

    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        console.error("EXEC ERROR:", error);
        console.error("STDERR:", stderr);
        return res.status(500).json({ error: "Download failed: " + stderr });
      }

      // Check file exists before sending
      if (!fs.existsSync(filePath)) {
        console.error("File not found after download:", filePath);
        return res.status(500).json({ error: "File not generated" });
      }

      // Set proper response headers
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${outputName}"`
      );

      res.download(filePath, outputName, (err) => {
        if (err) console.error("DOWNLOAD ERROR:", err);

        // Cleanup file after download
        setTimeout(() => {
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) console.error("Cleanup error:", unlinkErr);
              else console.log("Cleaned up file:", filePath);
            });
          }
        }, 1000);
      });
    });
  } catch (err) {
    console.error("Controller error:", err);
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};