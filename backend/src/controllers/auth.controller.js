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

  // 🔥 USE PYTHON yt-dlp (IMPORTANT)

  if (format === "mp3") {
    fileName += ".mp3";
    command = `python3 -m yt_dlp -x --audio-format mp3 -o "${fileName.replace(
      ".mp3",
      ".%(ext)s"
    )}" "${url}"`;
  }

  else if (format === "m4a") {
    fileName += ".m4a";
    command = `python3 -m yt_dlp -f bestaudio[ext=m4a] -o "${fileName}" "${url}"`;
  }

  else if (format === "720") {
    fileName += ".mp4";
    command = `python3 -m yt_dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 -o "${fileName}" "${url}"`;
  }

  else if (format === "1080") {
    fileName += ".mp4";
    command = `python3 -m yt_dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 -o "${fileName}" "${url}"`;
  }

  const filePath = path.resolve(fileName);

  console.log("Running command:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("EXEC ERROR:", error);
      console.error("STDERR:", stderr);
      return res.status(500).send("Download error");
    }

    // check file exists before sending
    if (!fs.existsSync(filePath)) {
      console.error("File not found after download");
      return res.status(500).send("File not generated");
    }

    res.download(filePath, fileName, (err) => {
      if (err) console.error("DOWNLOAD ERROR:", err);

      // cleanup
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });
};