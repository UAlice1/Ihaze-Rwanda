#!/bin/bash
# Start script for Render deployment
echo "Starting Ihaze Rwanda backend..."
python -m backend.server --port ${PORT:-8765}
