# Troubleshooting Guide - Ihaze Rwanda

## AI Chat Not Working

### Problem: "Sorry, I'm having trouble connecting to the backend"

**Possible Causes & Solutions:**

### 1. Backend Server Not Running
```bash
# Check if both services are running
flyctl logs --app ihaze-rwanda

# Look for these messages:
# - "Ihaze Rwanda: http://0.0.0.0:8765" (backend started)
# - "ready started" (Next.js frontend started)
```

### 2. Check Backend Health Endpoint
```bash
# Test backend directly
curl https://ihaze-rwanda.fly.dev/api/health
```

Expected response:
```json
{
  "status": "ok",
  "dataset": "agricultural-2017-v1",
  "ai_configured": true
}
```

### 3. CORS Issues
The backend needs to allow the frontend origin. Check logs for CORS errors:
```bash
flyctl logs --app ihaze-rwanda | grep -i cors
```

### 4. Groq API Key Not Set
```bash
# Verify the API key is set
flyctl secrets list --app ihaze-rwanda

# If GROQ_API_KEY is missing, set it:
flyctl secrets set GROQ_API_KEY="your_key_here" --app ihaze-rwanda
```

### 5. Frontend Can't Reach Backend
Check the browser console (F12) for errors:
- Look for network errors to `/api/`
- Check if requests are going to the correct URL

---

## Dashboard Not Loading Data

### Problem: District data not showing

**Check:**
1. Backend is running (see above)
2. Open browser DevTools Network tab
3. Try to load a district
4. Look for failed `/api/districts` requests

### Solution:
```bash
# Test districts API
curl https://ihaze-rwanda.fly.dev/api/districts

# Should return array of district objects
```

---

## Deployment Issues

### Problem: Fly.io deployment fails

**Common Issues:**

#### 1. Build Timeout
```bash
# Use larger machine for build
flyctl deploy --build-only --vm-size performance-2x
```

#### 2. Out of Memory
- Increase VM memory in `fly.toml`:
```toml
[[vm]]
  memory = "1024mb"  # Increase from 512mb
```

#### 3. Docker Build Fails
```bash
# Test Docker build locally
docker build -t ihaze-test .

# Run locally to debug
docker run -p 8080:8080 -e GROQ_API_KEY="your_key" ihaze-test
```

---

## Local Development Issues

### Problem: Frontend can't connect to backend locally

**Solution:**
1. Make sure backend is running:
```bash
cd backend
python -m backend.server
# Should show: "Ihaze Rwanda: http://127.0.0.1:8765"
```

2. Make sure frontend is running:
```bash
cd frontend
npm run dev
# Should show: "ready - started server on 127.0.0.1:3000"
```

3. Check `.env` file exists with Groq API key:
```bash
# In project root
cat .env
# Should contain: GROQ_API_KEY=gsk_...
```

---

## Performance Issues

### Problem: App is slow or times out

**Checks:**

#### 1. Machine Status
```bash
flyctl status --app ihaze-rwanda
```

#### 2. Scale Up
```bash
# Increase VM size
flyctl scale vm performance-1x --app ihaze-rwanda

# or increase memory
flyctl scale memory 1024 --app ihaze-rwanda
```

#### 3. Check Logs for Errors
```bash
flyctl logs --app ihaze-rwanda
```

---

## AI Queries Timing Out

### Problem: AI responses take too long or fail

**Possible Causes:**

#### 1. Groq API Rate Limit
- Free tier has rate limits
- Check Groq dashboard: https://console.groq.com

#### 2. Model Overload
- Llama 3.1 70B is a large model
- Consider switching to smaller model in `backend/service.py`:
```python
# Change from:
model="llama-3.1-70b-versatile"
# To:
model="llama-3.1-8b-instant"  # Faster, uses less quota
```

#### 3. Network Issues
```bash
# Test Groq API directly
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Browser Console Errors

### Common Errors & Solutions

#### 1. "Failed to fetch"
- Backend not running
- CORS issue
- Network problem

**Fix:** Check backend logs and health endpoint

#### 2. "Mixed Content" (HTTP/HTTPS)
- Frontend is HTTPS, backend is HTTP

**Fix:** Backend should use HTTPS on Fly.io (automatic)

#### 3. "Cannot read property of undefined"
- API returned unexpected data format

**Fix:** Check API response structure in Network tab

---

## Getting Help

### Collect Debug Information

```bash
# Get app status
flyctl status --app ihaze-rwanda > status.txt

# Get recent logs
flyctl logs --app ihaze-rwanda > logs.txt

# Test health endpoint
curl https://ihaze-rwanda.fly.dev/api/health > health.json

# Check configuration
cat fly.toml > config.txt
```

### Useful Commands

```bash
# Restart the app
flyctl apps restart ihaze-rwanda

# SSH into the machine
flyctl ssh console --app ihaze-rwanda

# View environment variables
flyctl secrets list --app ihaze-rwanda

# Monitor in real-time
flyctl logs --app ihaze-rwanda --follow
```

---

## Quick Fixes Checklist

- [ ] Backend health endpoint returns OK
- [ ] Groq API key is set as secret
- [ ] CORS allows Fly.io origin
- [ ] Both frontend and backend are in supervisor config
- [ ] Machines are running (not stopped)
- [ ] No errors in Fly.io logs
- [ ] Browser console has no errors
- [ ] Network tab shows successful API calls

---

**Still having issues?**
Check the Fly.io monitoring dashboard: https://fly.io/apps/ihaze-rwanda/monitoring
