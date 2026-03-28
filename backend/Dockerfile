# Use Node.js 18 with Debian Bookworm
FROM node:18-bookworm

# Install Python, pip, ffmpeg
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 🔥 FIX: Install yt-dlp with PEP 668 bypass
RUN pip3 install --upgrade yt-dlp --break-system-packages

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]