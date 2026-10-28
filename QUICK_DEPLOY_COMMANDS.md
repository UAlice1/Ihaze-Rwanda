# ⚡ Quick Deployment Commands

**Copy and paste these commands for fast deployment!**

---

## 🔧 Pre-Deployment Check

```bash
# Check if backend works
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight
python -m backend.server
# Then test: http://127.0.0.1:8765/api/health
```

```bash
# Check if frontend works
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight\frontend
npm install
npm run dev
# Then test: http://127.0.0.1:3000
```

---

## 📦 GitHub Repository Setup

```bash
# Navigate to project
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight

# Initialize git
git init

# Add .gitignore to protect sensitive files
echo ".env
.env.local
node_modules/
.next/
__pycache__/
*.pyc
dist/
.DS_Store" > .gitignore

# Stage all files
git add .

# Create commit
git commit -m "Initial commit - Ihaze Rwanda NISR Hackathon 2026"

# After creating repo on GitHub:
git remote add origin https://github.com/YOUR-USERNAME/ihaze-rwanda.git
git branch -M main
git push -u origin main
```

---

## 🚀 Frontend Deployment (Vercel)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Navigate to frontend
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight\frontend

# Deploy to production
vercel --prod

# Follow prompts:
# - Login to Vercel
# - Link to existing project or create new
# - Accept defaults
# - Copy the production URL
```

### Option 2: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Set Root Directory: `frontend`
5. Framework Preset: Next.js
6. Click "Deploy"
7. Copy the URL

**Important:** After backend is deployed, update `frontend/.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.railway.app
```

Then redeploy:
```bash
vercel --prod
```

---

## 🐍 Backend Deployment (Railway)

### Using Railway Dashboard (Easiest)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Select your `ihaze-rwanda` repository
6. Configure:
   - **Root Directory:** Leave empty (project root)
   - **Start Command:** `python -m backend.server`
   - **Environment Variables:**
     - `GROQ_API_KEY` = `your_groq_key_here`
     - `GROQ_MODEL` = `llama-3.1-70b-versatile`
7. Click "Deploy"
8. Go to Settings → Networking → Generate Domain
9. Copy the domain URL (e.g., `https://ihaze-production.up.railway.app`)

### Using Railway CLI (Alternative)

```bash
# Install Railway CLI (first time only)
npm install -g @railway/cli

# Navigate to project
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight

# Login
railway login

# Initialize
railway init

# Deploy
railway up

# Add environment variables
railway variables set GROQ_API_KEY=your_key_here
railway variables set GROQ_MODEL=llama-3.1-70b-versatile
```

---

## 🔗 Update Frontend with Backend URL

After backend is deployed:

```bash
# Edit frontend/.env.local
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight\frontend

# Create/update .env.local with deployed backend URL
echo NEXT_PUBLIC_BACKEND_URL=https://your-railway-url.railway.app > .env.local

# Commit changes
git add .env.local
git commit -m "Update backend URL for production"
git push

# Redeploy frontend
vercel --prod
```

---

## 🎥 Demo Video Recording

### Using OBS Studio (Free)

1. Download: https://obsproject.com/
2. Install and open OBS
3. Add Source → Display Capture
4. Click "Start Recording"
5. Follow script in `DEMO_SCRIPT.md`
6. Click "Stop Recording" after 3 minutes
7. Find video in `Videos` folder
8. Upload to YouTube:
   - Go to youtube.com
   - Click "Create" → "Upload video"
   - Select visibility: "Unlisted" or "Public"
   - Copy the video URL

### Using Windows Game Bar (Built-in)

1. Press `Win + G` to open Game Bar
2. Click the record button (or `Win + Alt + R`)
3. Open your app and follow demo script
4. Press `Win + Alt + R` to stop recording
5. Find video in `Videos/Captures` folder
6. Upload to YouTube

### Using Loom (Online)

1. Go to https://www.loom.com
2. Sign up for free account
3. Install Loom desktop app
4. Click "Start Recording" → "Screen + Camera"
5. Follow demo script
6. Click "Stop" after recording
7. Copy the Loom link

---

## ✅ Test Deployed Application

```bash
# Test backend health
curl https://your-railway-url.railway.app/api/health

# Expected response:
# {"status": "ok", "dataset": "agricultural-2017-v1", "ai_configured": true}

# Test frontend
# Open: https://your-vercel-url.vercel.app
# Should see landing page with chat widget
```

---

## 📝 Final README Updates

After everything is deployed:

1. Open `README.md`
2. Find these sections and update URLs:

**Line ~20:**
```markdown
[🚀 Live App](https://your-vercel-url.vercel.app) | [📊 Full Research Report](research_report.md) | [🎥 Demo Video](https://youtube.com/watch?v=YOUR_VIDEO_ID)
```

**Line ~460:**
```markdown
### Submission Components
- ✅ **Public Repository:** https://github.com/YOUR-USERNAME/agriinsight-rwanda
- ✅ **Live Deployment:** https://your-vercel-url.vercel.app
- ✅ **Demo Video:** https://youtube.com/watch?v=YOUR_VIDEO_ID
```

**Line ~510:**
```markdown
**Questions about the project?**  
📧 Email: your.email@example.com  
💬 GitHub Issues: https://github.com/YOUR-USERNAME/agriinsight-rwanda/issues
```

**Line ~450:**
```markdown
## 👥 Team

**Project Lead:** Your Full Name  
**Contact:** your.email@example.com  
**Location:** Rwanda 🇷🇼
```

3. Commit and push changes:
```bash
git add README.md
git commit -m "Update README with deployment URLs and team info"
git push
```

---

## 🔒 Security Checklist Before Pushing to GitHub

**Make sure these files are in `.gitignore`:**
```
.env
.env.local
frontend/.env.local
__pycache__/
*.pyc
node_modules/
.next/
```

**Check that no API keys are in your code:**
```bash
# Search for potential secrets
git grep -i "gsk_"
git grep -i "sk-proj-"
git grep -i "api_key"

# Should find nothing in committed files!
```

---

## 🆘 Common Issues & Fixes

### Issue: "Port 8765 already in use"
```bash
# Find and kill the process
netstat -ano | findstr :8765
taskkill /PID [PID_NUMBER] /F
```

### Issue: "npm ERR! Missing script: dev"
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Module not found: backend"
```bash
# Make sure you're in the right directory
cd c:\Users\hp\Documents\Codex\2026-10-22\di-x20\outputs\agriinsight
python -m backend.server
```

### Issue: "Vercel deployment fails"
```bash
# Check build works locally
cd frontend
npm run build

# If errors, fix them before deploying
```

### Issue: "Railway deployment times out"
- Check start command: `python -m backend.server`
- Check Python version in Railway settings (should be 3.8+)
- Check logs in Railway dashboard

### Issue: "AI chat not working in production"
- Verify `GROQ_API_KEY` is set in Railway environment variables
- Check backend health endpoint: `https://your-backend.railway.app/api/health`
- Should show `"ai_configured": true`

---

## 📊 Verification URLs

After deployment, test these:

### Backend Endpoints
```
https://your-backend.railway.app/api/health
https://your-backend.railway.app/api/metadata
https://your-backend.railway.app/api/indicators
https://your-backend.railway.app/api/districts
```

### Frontend Pages
```
https://your-frontend.vercel.app/
https://your-frontend.vercel.app/about
https://your-frontend.vercel.app/dashboard
```

---

## 🎯 Final Submission URLs

**Copy these to your submission form:**

1. **GitHub Repository:** `https://github.com/YOUR-USERNAME/ihaze-rwanda`
2. **Live Application:** `https://your-app.vercel.app`
3. **Demo Video:** `https://youtube.com/watch?v=YOUR_VIDEO_ID` or `https://loom.com/share/YOUR_VIDEO_ID`
4. **README File:** `https://github.com/YOUR-USERNAME/ihaze-rwanda/blob/main/README.md`
5. **Data Source:** `https://microdata.statistics.gov.rw/index.php/catalog/90`

---

## 🏁 Final Steps Timeline

**30 minutes before submission:**
- [ ] All URLs tested and working
- [ ] README updated with team info and URLs
- [ ] Demo video uploaded and accessible
- [ ] GitHub repository public
- [ ] No sensitive data in repository
- [ ] One final test of the live app

**Submit and celebrate!** 🎉

---

**Good luck with your submission!** 🇷🇼 🌾 🏆
