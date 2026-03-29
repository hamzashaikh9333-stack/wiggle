# Use Node.js 18
FROM node:18-bookworm

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install --upgrade yt-dlp --break-system-packages

# Set working directory
WORKDIR /app

# ✅ IMPORTANT: Copy everything first
COPY . .

# Install dependencies
RUN npm install

# Start server
CMD ["npm", "start"]