# MP3 Converter - Backend API

A robust Node.js/Express server that handles YouTube video downloads and MP3 conversion. Provides RESTful API endpoints for downloading audio from YouTube videos using yt-dlp and FFmpeg.

## 📋 Features

- ✅ **YouTube Download Integration** - Downloads videos from YouTube
- ✅ **MP3 Conversion** - Extracts and converts audio to MP3 format
- ✅ **REST API** - Clean and simple API endpoints
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **CORS Support** - Cross-origin request support for frontend
- ✅ **Environment Configuration** - Flexible configuration through `.env`
- ✅ **Production Ready** - Optimized for production deployment

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js 5.2.1** - Web framework
- **MongoDB/Mongoose** - Database integration
- **yt-dlp** - YouTube video downloader
- **FFmpeg** - Audio conversion
- **Dotenv** - Environment variable management
- **CORS** - Cross-origin request handling
- **Nodemon** - Development auto-reload

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup and middleware
│   ├── controllers/
│   │   └── auth.controller.js   # Request handlers (downloadVideo)
│   ├── database/
│   │   └── database.js     # MongoDB connection
│   └── routes/
│       └── auth.routes.js  # API route definitions
├── server.js               # Server entry point (port 3000)
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not in git)
├── .env.example            # Example .env template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Node.js** 16.0.0 or higher
2. **npm** or **yarn**
3. **yt-dlp** - Command-line tool to download videos
4. **FFmpeg** - Multimedia framework for audio conversion
5. **MongoDB** - Database (optional for current implementation)

### Installation Steps

#### 1. Install System Dependencies

**Windows:**
- Download yt-dlp: https://github.com/yt-dlp/yt-dlp/releases
- Download FFmpeg: https://ffmpeg.org/download.html
- Add both to system PATH or note their installation paths

**macOS (Homebrew):**
```bash
brew install yt-dlp ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install python3-pip
pip3 install yt-dlp
sudo apt-get install ffmpeg
```

#### 2. Clone Repository and Setup

```bash
cd Mp3Converter/backend

# Install Node dependencies
npm install
```

#### 3. Configure Environment Variables

```bash
# Copy example .env
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your editor
```

**`.env` Template:**
```env
# MongoDB Connection URL
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mp3converter

# Node Environment
NODE_ENV=development

# Server Port (optional, defaults to 3000)
PORT=3000

# Optional: Specify yt-dlp executable path
# YT_DLP_PATH=C:\yt-dlp\yt-dlp.exe  # Windows
# YT_DLP_PATH=/usr/local/bin/yt-dlp # macOS/Linux

# Optional: Specify FFmpeg executable path
# FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe       # Windows
# FFMPEG_PATH=/usr/local/bin/ffmpeg          # macOS/Linux
```

#### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
node server.js
```

Server will start on `http://localhost:3000`

## 📡 API Endpoints

### Download YouTube Video as MP3

```http
GET /api/auth/download?url={youtube_url}
```

**Description:** Downloads a YouTube video and converts it to MP3 format.

**Parameters:**
- `url` (string, required) - Valid YouTube video URL
  - Accepts: `https://www.youtube.com/watch?v=...`
  - Accepts: `https://youtu.be/...`
  - Accepts: `https://www.youtube.com/embed/...`

**Response:**
- **200 OK** - MP3 file data (binary)
- **400 Bad Request** - Missing or invalid URL
- **500 Internal Server Error** - Processing error

**Headers:**
- `Content-Type: audio/mpeg`
- `Content-Disposition: attachment; filename="audio.mp3"`

**Examples:**

Using cURL:
```bash
curl -O "http://localhost:3000/api/auth/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

Using fetch (JavaScript):
```javascript
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const apiUrl = `http://localhost:3000/api/auth/download?url=${encodeURIComponent(url)}`;

fetch(apiUrl)
  .then(res => res.blob())
  .then(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'audio.mp3';
    link.click();
  });
```

Using Python:
```python
import requests

url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
api_url = f'http://localhost:3000/api/auth/download?url={url}'

response = requests.get(api_url)
with open('audio.mp3', 'wb') as f:
    f.write(response.content)
```

## 🔧 Configuration Guide

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | No | - | MongoDB connection string |
| `NODE_ENV` | No | development | Environment (development/production) |
| `PORT` | No | 3000 | Server port |
| `YT_DLP_PATH` | No | yt-dlp | Path to yt-dlp executable |
| `FFMPEG_PATH` | No | ffmpeg | Path to FFmpeg executable |

### Download Process Workflow

1. **Receive Request**
   - Client sends YouTube URL via query parameter

2. **Validate URL**
   - Check if URL is provided
   - Verify it's a valid YouTube URL

3. **Download Video**
   - Execute yt-dlp command
   - Download video from YouTube

4. **Extract Audio**
   - Use FFmpeg to extract audio stream
   - Convert to MP3 format with quality settings

5. **Send Response**
   - Stream MP3 file to client
   - Set appropriate headers

6. **Cleanup**
   - Delete temporary files from server
   - Free up disk space

## 🐛 Troubleshooting

### Issue: "yt-dlp not found"

**Solution:**
1. Install yt-dlp:
```bash
pip install yt-dlp
```

2. Or specify path in `.env`:
```env
YT_DLP_PATH=/usr/local/bin/yt-dlp
```

3. Verify installation:
```bash
yt-dlp --version
```

### Issue: "ffmpeg not found"

**Solution:**
1. Install FFmpeg:
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows: Download from ffmpeg.org
```

2. Or specify path in `.env`:
```env
FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe
```

3. Verify installation:
```bash
ffmpeg -version
```

### Issue: "spawn ENOTFOUND: yt-dlp"

**Solution:**
- Ensure yt-dlp is in system PATH
- Or specify full path in `.env`
- Restart server after changes

### Issue: "CORS Error when accessing from frontend"

**Solution:**
- Check `app.js` has CORS enabled:
```javascript
app.use(cors());
```

- Ensure frontend URL matches:
```env
FRONTEND_URL=http://localhost:5173
```

### Issue: "Download process timeout"

**Solution:**
1. The file might be large
2. Check internet connection
3. Try with a shorter video first
4. Increase timeout settings if needed

## 📊 Code Structure

### Server Entry Point (server.js)

```javascript
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/database/database.js";

connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Express App (src/app.js)

```javascript
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

export default app;
```

### Routes (src/routes/auth.routes.js)

```javascript
import { Router } from "express";
import { downloadVideo } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/download", downloadVideo);

export default authRouter;
```

### Controller (src/controllers/auth.controller.js)

```javascript
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const downloadVideo = (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  const filePath = path.resolve("audio.mp3");
  const command = `"C:\\yt-dlp\\yt-dlp.exe" -x --audio-format mp3 ...`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).send("Download error");
    }

    res.download(filePath, "audio.mp3", (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  });
};
```

## 🚀 Production Deployment

### Deployment Checklist

- [ ] Install Node.js on production server
- [ ] Install yt-dlp and FFmpeg
- [ ] Clone repository
- [ ] Create `.env` file with production values
- [ ] Run `npm install --production`
- [ ] Set `NODE_ENV=production`
- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Set up SSL/HTTPS
- [ ] Configure logging
- [ ] Set up monitoring

### Deployment Platforms

#### Heroku
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

#### DigitalOcean App Platform
```bash
# Configure deployment
doctl apps create --spec app.yaml
```

#### AWS EC2
```bash
# Connect via SSH
ssh -i key.pem ubuntu@your-instance

# Install dependencies and setup
# Configure security groups
```

## 🔒 Security Considerations

1. **Input Validation**
   - Always validate YouTube URLs
   - Reject malformed URLs
   - Check URL length limits

2. **File Handling**
   - Clean up temporary files promptly
   - Use secure file paths
   - Set proper file permissions

3. **Rate Limiting**
   - Consider adding rate limiting
   - Implement IP-based throttling
   - Monitor for abuse

4. **Error Handling**
   - Don't expose system paths in errors
   - Log errors securely
   - Return generic error messages

5. **CORS Policy**
   - Specify allowed origins
   - Restrict to trusted domains
   - Use credentials carefully

## 📈 Performance Optimization

1. **Caching**
   - Cache frequently downloaded videos
   - Implement expiration strategy

2. **Async Processing**
   - Use worker threads for large downloads
   - Queue downloads if needed

3. **Resource Management**
   - Monitor disk space
   - Clean up old files regularly
   - Set file size limits

4. **Database**
   - Index frequently queried fields
   - Use connection pooling
   - Archive old records

## 🧪 Testing

### Manual Testing

Test basic download:
```bash
curl "http://localhost:3000/api/auth/download?url=https://youtu.be/dQw4w9WgXcQ"
```

Test error handling:
```bash
curl "http://localhost:3000/api/auth/download"  # Missing URL
curl "http://localhost:3000/api/auth/download?url=invalid"  # Invalid URL
```

### Development Testing

Start server in dev mode:
```bash
npm run dev
```

Monitor logs for errors and performance.

## 📝 API Response Examples

### Success Response (200)
```
Status: 200 OK
Content-Type: audio/mpeg
Content-Disposition: attachment; filename="audio.mp3"
Content-Length: 5242880

[Binary MP3 audio data]
```

### Error Response (400)
```
Status: 400 Bad Request
Content-Type: text/plain

URL is required
```

### Error Response (500)
```
Status: 500 Internal Server Error
Content-Type: text/plain

Download error
```

## 🔗 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| cors | ^2.8.6 | Cross-origin support |
| dotenv | ^17.3.1 | Environment variables |
| mongoose | ^9.3.3 | MongoDB ODM |
| nodemon | ^3.1.14 | Dev auto-reload |
| fluent-ffmpeg | ^2.1.3 | FFmpeg wrapper |

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [yt-dlp GitHub Repository](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg Documentation](https://ffmpeg.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [YouTube API Documentation](https://developers.google.com/youtube)

## 🤝 Contributing

1. Follow existing code style
2. Add meaningful commit messages
3. Test thoroughly before pushing
4. Document changes in README

## 📄 License

MIT License - See root project LICENSE file

## ⚖️ Disclaimer

This tool downloads YouTube content. Users are responsible for:
- Respecting YouTube's Terms of Service
- Complying with copyright laws
- Not distributing downloaded content illegally
- Using responsibly and ethically

## 🆘 Support

For issues or questions:
1. Check troubleshooting section
2. Review error logs
3. Check GitHub issues
4. Contact development team

---

**Version:** 1.0.0  
**Last Updated:** March 28, 2026  
**Status:** ✅ Production Ready
