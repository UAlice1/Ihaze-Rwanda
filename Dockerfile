# Multi-stage build for Ihaze Rwanda
FROM node:20-slim AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Final image with both frontend and backend
FROM python:3.11-slim

# Install Node.js for running Next.js
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend
COPY backend/ ./backend/
COPY requirements.txt ./
RUN pip install --no-cache-dir python-dotenv

# Copy built frontend
COPY --from=frontend-builder /app/frontend ./frontend

# Install frontend dependencies for runtime
WORKDIR /app/frontend
RUN npm ci --production

WORKDIR /app

# Create startup script
RUN echo '#!/bin/bash\n\
python -m backend.server &\n\
cd frontend && npm start' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080

CMD ["/bin/bash", "/app/start.sh"]
