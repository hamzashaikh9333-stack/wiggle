# MP3 Converter

A full-stack web application that allows users to download audio from YouTube videos in MP3 format. Features a modern React frontend with dark theme and a robust Node.js backend with MongoDB integration.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-success)

## 📸 Features

### Core Features
- ✅ **YouTube to MP3 Conversion** - Download audio from YouTube videos in high-quality MP3 format
- ✅ **Easy to Use Interface** - Paste URL and click download with instant feedback
- ✅ **Professional Dark Theme** - Modern UI with smooth animations and gradients
- ✅ **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ✅ **Real-time Validation** - Input validation and error handling
- ✅ **Fast Processing** - Efficient backend processing with yt-dlp
- ✅ **Multiple URL Formats** - Supports youtube.com and youtu.be links

### Technical Features
- Feature-based component architecture
- Custom React hooks for business logic
- API service layer for backend communication
- CSS Modules for style isolation
- Smooth animations and transitions
- Error boundary and error handling
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - Modern UI library
- **Vite 8.0.1** - Fast build tool
- **CSS Modules** - Scoped styling
- **JavaScript ES6+** - Modern JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **yt-dlp** - Audio extraction
- **FFmpeg** - Audio conversion

### Tools & Libraries
- **yt-dlp** - YouTube video downloader
- **FFmpeg** - Audio video processing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

## 📁 Project Structure

```
Mp3Converter/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/                # API client utilities
│   │   ├── components/         # Reusable UI components
│   │   ├── features/           # Feature modules
│   │   │   └── downloader/     # YouTube downloader feature
│   │   │       ├── api/        # Feature-specific APIs
│   │   │       ├── components/ # Feature components
│   │   │       ├── hooks/      # Custom hooks
│   │   │       └── DownloaderPage.jsx
│   │   ├── hooks/              # Global custom hooks
│   │   ├── styles/             # Global stylesheets
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md               # Frontend documentation
│   └── index.html
│
└── backend/                    # Node.js backend server
    ├── src/
    │   ├── app.js             # Express app configuration
    │   ├── controllers/       # Request handlers
    │   │   └── auth.controller.js
    │   ├── database/          # Database configuration
    │   │   └── database.js
    │   └── routes/            # API routes
    │       └── auth.routes.js
    ├── server.js              # Server entry point
    ├── package.json
    ├── .env                   # Environment variables
    ├── .gitignore
    └── src/
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** or **yarn**
- **yt-dlp** - [Installation Guide](https://github.com/yt-dlp/yt-dlp/wiki/Installation)
- **FFmpeg** - [Installation Guide](https://ffmpeg.org/download.html)
- **MongoDB** - Local or MongoDB Atlas connection

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mp3Converter
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env with your values
# Edit .env and set:
# - MONGO_URI (MongoDB connection string)
# - yt-dlp path
# - FFmpeg path

# Start the server
npm run dev
# or
node server.js
```

**Backend runs on:** `http://localhost:3000`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:3000" > .env

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

## 💻 Usage

### As a User

1. **Open the Application**
   - Navigate to `http://localhost:5173` in your browser

2. **Enter YouTube URL**
   - Copy a YouTube video link
   - Paste it in the input field
   - Supported formats: `youtube.com` or `youtu.be`

3. **Download**
   - Click "Download MP3" button
   - Wait for processing (shows loading spinner)

4. **Receive File**
   - MP3 file automatically downloads
   - Success notification appears
   - File ready to play

### API Endpoints

#### Download a YouTube Video as MP3
```http
GET /api/auth/download?url={youtube_url}
```

**Parameters:**
- `url` (string, required) - YouTube video URL

**Response:**
- **Success (200):** MP3 file data
- **Error (400):** Missing URL or invalid format
- **Error (500):** Server processing error

**Example:**
```bash
curl "http://localhost:3000/api/auth/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

## 🔧 Configuration

### Frontend Configuration (`.env`)
```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Defaults to localhost:3000 if not specified
```

### Backend Configuration (`.env`)
```env
# MongoDB Connection URL
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Optional: Custom paths for yt-dlp and FFmpeg
# YT_DLP_PATH=C:\yt-dlp\yt-dlp.exe
# FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe
```

### Customize Frontend Theme

Edit `frontend/src/styles/variables.css`:

```css
:root {
  --bg-primary: #0f172a;        /* Main background */
  --bg-secondary: #1e293b;      /* Secondary background */
  --accent-color: #6366f1;      /* Primary accent */
  --text-primary: #f1f5f9;      /* Primary text */
  --text-secondary: #94a3b8;    /* Secondary text */
  --error-color: #ef4444;       /* Error messages */
  --success-color: #22c55e;     /* Success messages */
}
```

## 🏗️ Architecture

### Frontend Architecture

**Feature-Based Structure:**
- Each feature (e.g., `downloader`) is self-contained
- Contains its own components, hooks, and APIs
- Easy to add new features without affecting existing code

**Component Hierarchy:**
```
App
├── Header
├── Main
│   └── DownloaderPage
│       ├── URLInput
│       ├── DownloadButton
│       ├── ErrorAlert
│       ├── SuccessAlert
│       └── Features List
└── Footer
```

**Hooks:**
- `useDownload` - Manages download logic, loading, and error states

**API Layer:**
- `client.js` - HTTP client for API requests
- `downloadService.js` - Download endpoint wrapper

### Backend Architecture

**Model-View-Controller (MVC):**
- **Routes** - Request handlers and endpoints
- **Controllers** - Business logic implementation
- **Database** - Data persistence layer

**Workflow:**
1. Request arrives at `/api/auth/download`
2. Controller processes YouTube URL
3. yt-dlp extracts audio from video
4. FFmpeg converts to MP3 format
5. File sent to client
6. File deleted from server

## 📚 Development Guide

### Adding a New Feature

1. Create feature folder in `src/features/`
```bash
mkdir -p src/features/myfeature/{api,components,hooks}
```

2. Create component structure:
```javascript
// MyFeaturePage.jsx
import { useMyFeature } from './hooks/useMyFeature';
import { MyComponent } from './components/MyComponent';

export const MyFeaturePage = () => {
  // Feature logic here
};
```

3. Create custom hook:
```javascript
// hooks/useMyFeature.js
import { useState } from 'react';

export const useMyFeature = () => {
  const [state, setState] = useState(null);
  // Hook logic here
  return { state };
};
```

### Code Conventions

- **Components:** PascalCase (e.g., `MyComponent.jsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useDownload.js`)
- **CSS Modules:** One per component (`Component.module.css`)
- **Files:** Organize by feature, not by type

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create pull request
git push origin feature/new-feature
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend

# Run linter
npm run lint

# Check code quality
npm run lint -- --fix
```

## 🚢 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

### Environment Setup

**Frontend (.env):**
```env
VITE_API_URL=https://your-api-domain.com
```

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://user:pass@prod-cluster.mongodb.net/db
NODE_ENV=production
```

### Deploy to Hosting

#### Frontend (Vercel/Netlify)
1. Connect repository to Vercel/Netlify
2. Set environment variables
3. Deploy `dist/` folder

#### Backend (Heroku/DigitalOcean)
1. Set environment variables
2. Install production dependencies
3. Start with `node server.js`

## 🐛 Troubleshooting

### Frontend Issues

**Issue:** Frontend won't start
```bash
# Solution:
rm -rf node_modules
npm install
npm run dev
```

**Issue:** API requests fail
```bash
# Check backend is running:
curl http://localhost:3000

# Check VITE_API_URL in .env
cat .env
```

**Issue:** Animations not working
```bash
# Clear browser cache (Ctrl+Shift+Del)
# Hard refresh (Ctrl+F5)
```

### Backend Issues

**Issue:** Module not found error
```bash
npm install
```

**Issue:** MongoDB connection fails
```bash
# Check MONGO_URI in .env
# Verify MongoDB is running
mongosh
```

**Issue:** yt-dlp not found
```bash
# Install yt-dlp
pip install yt-dlp

# Or download from: https://github.com/yt-dlp/yt-dlp/releases
```

**Issue:** FFmpeg not found
```bash
# Download from: https://ffmpeg.org/download.html
# Add to PATH or specify path in .env
```

## 📝 Contributing

### Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

### Code Style
- Use ESLint for JavaScript
- Follow folder structure conventions
- Write meaningful commit messages
- Add comments for complex logic

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important:** This tool is provided for personal use only. Users must ensure they have the right to download content before using this application. Please:

- Respect YouTube's Terms of Service
- Comply with copyright laws in your jurisdiction
- Do not download copyrighted content without permission
- Use responsibly and ethically

**Liability:** The creators are not responsible for misuse of this tool or any legal consequences that may arise from its use.

## 🤝 Support

### Getting Help
- Check the individual README files in `frontend/` and `backend/`
- Review troubleshooting section above
- Check GitHub issues

### Reporting Bugs
1. Verify the issue still exists
2. Provide steps to reproduce
3. Include system information
4. Create detailed issue report

## 📈 Future Enhancements

- [ ] Batch download multiple videos
- [ ] Audio quality selection
- [ ] Download history and favorites
- [ ] Playlist support
- [ ] Advanced audio editing
- [ ] User authentication and accounts
- [ ] Progress tracking
- [ ] Download queue management
- [ ] Mobile app (React Native)
- [ ] Multiple language support

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Express.js Guide](https://expressjs.com/)
- [yt-dlp Repository](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

## 📊 Project Statistics

- **Frontend:** React, 800+ lines of code
- **Backend:** Node.js Express, 100+ lines of code
- **Styling:** CSS Modules with animations
- **Database:** MongoDB
- **API Calls:** RESTful architecture

## 📅 Version History

### v1.0.0 (Current)
- ✅ Initial release
- ✅ YouTube to MP3 conversion
- ✅ Modern dark theme UI
- ✅ Full documentation

---

**Last Updated:** March 28, 2026  
**Maintainer:** MP3 Converter Team  
**Status:** ✅ Production Ready

For more detailed information, see:
- [Frontend README](frontend/README.md)
- [Backend Setup Guide](backend/README.md) (to be created)
