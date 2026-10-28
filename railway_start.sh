#!/bin/bash

# Start backend in background
python -m backend.server &

# Navigate to frontend and start it
cd frontend
npm install
npm run build
npm start
