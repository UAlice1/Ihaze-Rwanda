# 🚀 AgriInsight Rwanda - Deployment Guide

**Get your app online in under 30 minutes**

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] App runs locally (test with `Start Backend.cmd` + `Start Next.js.cmd`)
- [ ] All sensitive data removed (no API keys in code)
- [ ] README has screenshots and documentation
- [ ] GitHub repository is public
- [ ] `.gitignore` excludes `node_modules/`, `.env`, SPSS raw files

---

## 🎯 Recommended: Vercel (Frontend) + Railway (Backend)

**Why this combo?**
- ✅ Free tiers available
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Easy environment variables
- ✅ Fast global CDN

**Estimated time:** 20-30 minutes

---

## 🔵 Step 1: Deploy Frontend to Vercel

### A. Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

### B. Prepare Frontend

```bash
cd frontend

# Ensure package.json has correct scripts
# Should have:
# "scripts": {
#   "dev": "next dev",
#   "build": "next build",
#   "start": "next start"
# }

# Test build locally
npm run build
```

### C. Deploy to Vercel

```bash
# Login to Vercel (browser will open)
vercel login

# Deploy
vercel --prod

# Follow prompts:
# Set up and deploy? [Y/n] Y
# Which scope? [Select your account]
# Link to existing project? [N]
# What's your project's name? agriinsight-rwanda
# In which directory is your code located? ./
# Want to modify settings? [N]
```

### D. Configure Environment (if using AI features)

```bash
# Add environment variables via Vercel dashboard:
# 1. Go to project settings
# 2. Environment Variables section
# 3. Add:
#    - NEXT_PUBLIC_API_URL = [your backend URL]
```

### E. Get Your Frontend URL

After deployment completes, Vercel will display:
```
✅ Production: https://agriinsight-rwanda.vercel.app
```

**Save this URL!** Add it to your README.

---

## 🚂 Step 2: Deploy Backend to Railway

### A. Prepare Backend Files

Create `railway.json` in project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python -m backend.server",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Create `runtime.txt` in project root:

```
python-3.11
```

### B. Push to GitHub (if not already done)

```bash
# Initialize git (if needed)
git init

# Create .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "*.pyc" >> .gitignore
echo "__pycache__/" >> .gitignore
echo ".next/" >> .gitignore
echo "spss/" >> .gitignore

# Commit
git add .
git commit -m "Initial commit for NISR Hackathon 2026"

# Push to GitHub
git remote add origin https://github.com/YOUR-USERNAME/agriinsight-rwanda.git
git branch -M main
git push -u origin main
```

### C. Deploy on Railway

1. **Go to Railway.app** → https://railway.app
2. **Sign up / Log in** (use GitHub account)
3. **New Project** → "Deploy from GitHub repo"
4. **Select repository:** agriinsight-rwanda
5. **Configure:**
   - Root directory: `/` (leave default)
   - Start command: `python -m backend.server`
6. **Add environment variables** (if using AI):
   ```
   OPENAI_API_KEY = sk-...
   OPENAI_MODEL = gpt-4
   PORT = 8765
   ```
7. **Deploy** → Wait 2-3 minutes

### D. Get Your Backend URL

Railway will provide:
```
https://agriinsight-rwanda-production.up.railway.app
```

**Save this URL!** You'll need it for frontend config.

---

## 🔗 Step 3: Connect Frontend to Backend

### Option A: Update Vercel Environment Variables

1. Go to Vercel dashboard → Your project
2. Settings → Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_API_URL = https://agriinsight-rwanda-production.up.railway.app
   ```
4. Redeploy:
   ```bash
   vercel --prod
   ```

### Option B: Update Frontend Code

In `frontend/next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : 'http://127.0.0.1:8765/:path*'
      }
    ]
  }
}

export default nextConfig
```

Then redeploy frontend.

---

## 🧪 Step 4: Test Your Deployment

### A. Basic Smoke Tests

```bash
# Test backend health
curl https://agriinsight-rwanda-production.up.railway.app/

# Test frontend
curl https://agriinsight-rwanda.vercel.app/
```

### B. Browser Testing

1. **Open frontend URL** in browser
2. **Check overview page** loads with statistics
3. **Navigate to districts** - verify 30 districts show
4. **Test filters** - select barrier type
5. **Try capacity planner** - enter a number, check calculation
6. **Export CSV** - download should work

### C. CORS Check (if needed)

If frontend can't reach backend, add CORS headers to `backend/server.py`:

```python
def end_headers(self):
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    super().end_headers()
```

---

## 🔄 Alternative: Deploy Both on Railway

**Single-platform deployment:**

### A. Create `Procfile`:

```
web: python -m backend.server & cd frontend && npm start
```

### B. Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm install --prefix frontend && npm run build --prefix frontend && python -m backend.server",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### C. Update Railway environment:

```
PORT = 8080
NODE_ENV = production
```

**Note:** This is simpler but less scalable. Vercel + Railway is better for production.

---

## 🆓 Alternative Free Platforms

### Render.com (Backend alternative)

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Build command: `pip install -r requirements.txt` (if needed)
5. Start command: `python -m backend.server`
6. Free tier available

### Netlify (Frontend alternative)

1. Go to https://netlify.com
2. New site from Git
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/.next`
5. Free tier available

---

## 🔐 Environment Variables Setup

### Backend (Railway/Render):

```bash
# Required only if using optional features:
OPENAI_API_KEY = sk-proj-...           # For AI explanations
OPENAI_MODEL = gpt-4                   # AI model choice
PORT = 8765                            # Server port
DATABASE_URL = postgresql://...        # If using PostgreSQL
```

### Frontend (Vercel/Netlify):

```bash
NEXT_PUBLIC_API_URL = https://your-backend-url.railway.app
```

**Important:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser!

---

## 🐛 Common Deployment Issues

### Issue 1: "Module not found" errors

**Solution:** Ensure `requirements.txt` lists all dependencies:

```txt
# For basic deployment (optional features only):
# fastapi==0.104.1
# uvicorn==0.24.0
# psycopg2-binary==2.9.9
# openai==1.3.0

# Minimal deployment needs no requirements!
```

### Issue 2: Frontend can't connect to backend

**Solution:** Check CORS headers and API URL configuration:

```javascript
// In frontend code:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8765'
```

### Issue 3: "Port already in use"

**Solution:** Railway/Vercel handle ports automatically. Just use:

```python
# In backend/server.py:
PORT = int(os.environ.get('PORT', 8765))
```

### Issue 4: Build timeout on Railway

**Solution:** Reduce frontend build output:

```bash
# In frontend/next.config.mjs:
const nextConfig = {
  output: 'standalone',
  compress: true
}
```

### Issue 5: CSV data not found

**Solution:** Ensure data files are committed to Git:

```bash
git add frontend/data/*.csv
git add frontend/data/*.json
git commit -m "Add aggregate data files"
git push
```

---

## 📊 Post-Deployment Checklist

After successful deployment:

- [ ] Frontend URL works: `https://agriinsight-rwanda.vercel.app`
- [ ] Backend URL works: `https://agriinsight-rwanda-production.up.railway.app`
- [ ] All 30 districts load
- [ ] Filters work correctly
- [ ] Capacity planner calculates
- [ ] CSV export downloads
- [ ] AI explanations work (if enabled)
- [ ] No console errors in browser dev tools
- [ ] Mobile responsive (test on phone)
- [ ] HTTPS enabled (should be automatic)

---

## 📝 Update Your README

Add deployment URLs to your README:

```markdown
## 🚀 Live Demo

**Frontend:** https://agriinsight-rwanda.vercel.app
**Backend API:** https://agriinsight-rwanda-production.up.railway.app

## 🎥 Demo Video

Watch our 3-minute demo: [YouTube/Loom link]
```

---

## 🔄 Continuous Deployment

**Both Vercel and Railway support automatic redeployment:**

1. Push changes to GitHub `main` branch
2. Vercel/Railway detect changes
3. Automatic rebuild and redeploy
4. Changes live in 2-5 minutes

**To disable auto-deploy:**
- Vercel: Project Settings → Git → Disable auto-deploy
- Railway: Deployment Settings → Disable auto-deploy

---

## 📈 Monitoring Your Deployment

### Vercel Analytics (Free):
1. Project Settings → Analytics
2. View visitor count, page views
3. Check build logs for errors

### Railway Logs:
1. Project → Deployments → Logs
2. Real-time backend logs
3. Filter by error level

---

## 💰 Cost Estimate

**For Hackathon (1-2 weeks):**
- **Vercel:** $0 (free tier: 100 GB bandwidth)
- **Railway:** $0 (free $5 credit + 500 hours)
- **Total:** FREE ✅

**For Production (if deployed long-term):**
- **Vercel Pro:** $20/month (if exceed free tier)
- **Railway Hobby:** $5/month (500 execution hours)
- **Total:** ~$25/month (only if significant traffic)

**Hackathon should stay 100% free!**

---

## 🆘 Need Help?

### Deployment not working?

1. **Check logs:**
   - Railway: Deployments → View Logs
   - Vercel: Deployments → Build Logs

2. **Test locally first:**
   ```bash
   # Does it work on your machine?
   Start Backend.cmd
   Start Next.js.cmd
   ```

3. **Common fixes:**
   - Clear build cache (Vercel/Railway dashboard)
   - Check environment variables
   - Verify all files committed to Git
   - Ensure `.gitignore` not excluding necessary files

---

## ✅ Final Pre-Submission Steps

1. **Test deployment** - Click through all features
2. **Update README** - Add live URLs
3. **Record demo video** - Use live deployment URL
4. **Share URLs** - Add to hackathon submission form
5. **Monitor first 24h** - Check for errors in logs

---

## 🎉 You're Deployed!

**Your app is now live and accessible worldwide! 🌍**

Share your URLs:
- 🌐 **Frontend:** [Your Vercel URL]
- 🔌 **Backend:** [Your Railway URL]
- 🎥 **Demo:** [Your video URL]

**Now focus on your presentation and demo video!**

Good luck! 🚀🏆

---

<div align="center">

**Questions?**

Check Railway docs: https://docs.railway.app  
Check Vercel docs: https://vercel.com/docs

**AgriInsight Rwanda** 🌾🇷🇼  
*Built for NISR Big Data Hackathon 2026*

</div>
