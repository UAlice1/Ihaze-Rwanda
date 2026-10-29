# Multi-stage build for Ihaze Rwanda
FROM node:20-slim AS frontend-builder

# Install build dependencies for native modules
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final image with both frontend and backend
FROM python:3.11-slim

# Install Node.js for running Next.js and supervisor
RUN apt-get update && \
    apt-get install -y nodejs npm supervisor && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend
COPY backend/ ./backend/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY frontend/package*.json ./frontend/
COPY frontend/next.config.mjs ./frontend/

# Install frontend dependencies for runtime
WORKDIR /app/frontend
RUN npm install --omit=dev

WORKDIR /app

# Create supervisor config
RUN echo '[supervisord]\n\
nodaemon=true\n\
logfile=/dev/null\n\
logfile_maxbytes=0\n\
\n\
[program:backend]\n\
command=python -m backend.server\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0\n\
environment=PORT="8765",RENDER="true"\n\
\n\
[program:frontend]\n\
command=npm start -- -p 8080 -H 0.0.0.0\n\
directory=/app/frontend\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0\n\
environment=NEXT_PUBLIC_BACKEND_URL="http://localhost:8765"' > /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
