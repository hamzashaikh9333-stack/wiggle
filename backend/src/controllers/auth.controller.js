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

  // 🔥 FORMAT LOGIC (LINUX COMPATIBLE)

  if (format === "mp3") {
    fileName += ".mp3";
    command = `yt-dlp -x --audio-format mp3 -o "${fileName.replace(
      ".mp3",
      ".%(ext)s"
    )}" "${url}"`;
  }

  else if (format === "m4a") {
    fileName += ".m4a";
    command = `yt-dlp -f bestaudio[ext=m4a] -o "${fileName}" "${url}"`;
  }

  else if (format === "720") {
    fileName += ".mp4";
    command = `yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 -o "${fileName}" "${url}"`;
  }

  else if (format === "1080") {
    fileName += ".mp4";
    command = `yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 -o "${fileName}" "${url}"`;
  }

  const filePath = path.resolve(fileName);

  console.log("Running command:", command); // 🔥 debug

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("EXEC ERROR:", error);
      console.error("STDERR:", stderr);
      return res.status(500).send("Download error");
    }

    res.download(filePath, fileName, (err) => {
      if (err) console.error("DOWNLOAD ERROR:", err);

      // file delete after sending
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });
};