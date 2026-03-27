# MP3 Converter - Quick Start Guide

⏱️ **Getting started in 5 minutes**

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

✅ Wait for: `Server is running on port 3000`

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

✅ Wait for: `Local: http://localhost:5173`

## Step 3: Open Browser

Navigate to: **`http://localhost:5173`**

## Step 4: Download MP3

1. Paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=...`)
2. Click **"Download MP3"**
3. Wait for download to complete
4. Audio file appears automatically

---

## ✨ Features at a Glance

| Feature | Details |
|---------|---------|
| 🎵 Download | YouTube → MP3 conversion |
| 🎨 Design | Modern dark theme with animations |
| ⚡ Speed | Fast processing and download |
| 📱 Responsive | Works on mobile, tablet, desktop |
| 🛡️ Safe | Input validation and error handling |
| 🎯 Simple | One-click download interface |

---

## 📁 Project Structure

```
Mp3Converter/
├── frontend/          # React app (starts on :5173)
│   ├── src/
│   │   ├── features/downloader/    # Main download feature
│   │   ├── components/             # UI components
│   │   ├── api/                    # API client
│   │   └── styles/                 # Global styles
│   ├── package.json
│   └── README.md                   # Frontend guide
│
├── backend/           # Node.js server (runs on :3000)
│   ├── src/
│   │   ├── controllers/            # API handlers
│   │   ├── routes/                 # API endpoints
│   │   └── database/               # MongoDB
│   ├── server.js
│   ├── package.json
│   └── README.md                   # Backend guide
│
├── README.md          # Main project guide
├── SETUP.md           # Detailed setup info
└── QUICK_START.md     # This file
```

---

## 🔧 Requirements

- **Node.js** 16+ ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **yt-dlp** ([install](https://github.com/yt-dlp/yt-dlp/wiki/Installation))
- **FFmpeg** ([install](https://ffmpeg.org/download.html))

---

## ⚙️ Configuration

### Frontend (Optional)

`frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### Backend (Required)

`backend/.env`:
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

---

## 🎨 What You'll See

### Dark Theme
- 🌙 Professional dark background
- 🎨 Indigo accent color
- ✨ Smooth animations
- 📱 Mobile-optimized

### Components
```
┌─────────────────────────────┐
│   MP3 Converter             │  ← Header
│   Download audio from...    │
│                             │
│  📝 YouTube URL: [____]     │  ← Input field
│  ⬇️  Download MP3 [BUTTON] │  ← Download button
│                             │
│  ✓ Convert YouTube...       │  ← Features
│  ✓ High quality audio...    │
│  ✓ Fast downloads...        │
│  ✓ Multiple formats...      │
│                             │
└─────────────────────────────┘
│ © 2026 MP3 Converter        │  ← Footer
└─────────────────────────────┘
```

---

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
# Or specify different port in .env
PORT=3001

# Ensure yt-dlp and FFmpeg are installed
yt-dlp --version
ffmpeg -version
```

### Frontend shows "Cannot reach server"
```bash
# Make sure backend is running
# Check if VITE_API_URL is correct in .env
# Clear browser cache and refresh
```

### Download button doesn't work
```bash
# Check browser console (F12) for errors
# Verify YouTube URL is valid
# Make sure it's a public video
```

---

## 📚 Full Documentation

- **Setup Details:** See [SETUP.md](SETUP.md)
- **Frontend Guide:** See [frontend/README.md](frontend/README.md)
- **Backend Guide:** See [backend/README.md](backend/README.md)
- **Main README:** See [README.md](README.md)

---

## 🎯 Next Steps

### To Use
1. ✅ Download & install Node.js
2. ✅ Install yt-dlp and FFmpeg
3. ✅ Run `npm run dev` in backend
4. ✅ Run `npm run dev` in frontend
5. ✅ Open http://localhost:5173

### To Customize
1. Edit colors in `frontend/src/styles/variables.css`
2. Modify timeout in `backend/src/controllers/auth.controller.js`
3. Change messages in component files

### To Deploy
1. Run `npm run build` in frontend
2. Deploy to Vercel/Netlify
3. Deploy backend to Heroku/DigitalOcean
4. Update API URL in environment variables

---

## 📖 Code Structure

### Frontend (React)
```javascript
App
├── Header (Navigation)
├── DownloaderPage (Main feature)
│   ├── URLInput (Input form)
│   ├── DownloadButton (CTA button)
│   ├── ErrorAlert (Error message)
│   ├── SuccessAlert (Success message)
│   └── Features (Feature list)
└── Footer (Info & disclaimer)
```

### Backend (Node.js/Express)
```
GET /api/auth/download?url=...
├── Validate URL
├── Download with yt-dlp
├── Convert with FFmpeg
├── Send MP3 to client
└── Cleanup files
```

---

## ⚠️ Important Notes

- ✅ **For Personal Use Only** - Respect copyright laws
- ✅ **YouTube Terms** - Comply with YouTube ToS
- ✅ **Responsibly** - Don't download copyrighted content
- ✅ **Ethically** - Use the tool responsibly

---

## 🎉 You're All Set!

Your MP3 converter is ready to use! 

**Open http://localhost:5173 and start downloading** 🎵

---

### Quick Reference Commands

```bash
# Backend setup & run
cd backend && npm install && npm run dev

# Frontend setup & run
cd frontend && npm install && npm run dev

# Build for production
cd frontend && npm run build

# Check code style
npm run lint

# Preview production build
npm run preview
```

---

**Version:** 1.0.0  
**Status:** ✅ Ready to Use  
**Need Help?** Check the README files or SETUP.md
