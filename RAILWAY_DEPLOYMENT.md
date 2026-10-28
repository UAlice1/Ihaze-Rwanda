# 🚂 Railway Deployment Guide - Ihaze Rwanda

**Deploy BOTH frontend and backend to Railway in 15 minutes!**

---

## 🎯 Quick Start

### 1. Go to Railway
👉 https://railway.app

### 2. Login with GitHub
- Click **"Login"**
- Choose **"Login with GitHub"**
- Authorize Railway

### 3. Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Find and select: **UAlice1/Ihaze-Rwanda**
- Click **"Deploy Now"**

---

## ⚙️ Configuration Options

Railway will auto-detect your project. You have two deployment strategies:

### Strategy 1: Two Separate Services (RECOMMENDED) ⭐

Deploy backend and frontend as separate services for better control.

#### Backend Service:

1. **After Railway creates the first service:**
   - Click on the service
   - Go to **Settings**
   - Set **Start Command**: `python -m backend.server`

2. **Add Environment Variables:**
   - Go to **Variables** tab
   - Add these variables:
     ```
     GROQ_API_KEY = your_groq_api_key_here
     PORT = 8765
     ```
   
   **⚠️ IMPORTANT:** Get your Groq API key from your `.env` file (not in GitHub)

3. **Generate Domain:**
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Copy the URL (e.g., `https://backend-xyz.railway.app`)

#### Frontend Service:

1. **Add New Service:**
   - In your project, click **"+ New Service"**
   - Select **"GitHub Repo"** → **UAlice1/Ihaze-Rwanda**

2. **Configure Frontend:**
   - Go to **Settings**
   - Set **Root Directory**: `frontend`
   - Set **Build Command**: `npm install && npm run build`
   - Set **Start Command**: `npm start`

3. **Add Environment Variable:**
   - Go to **Variables** tab
   - Add:
     ```
     NEXT_PUBLIC_BACKEND_URL = [YOUR BACKEND URL FROM ABOVE]
     ```

4. **Generate Domain:**
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Copy the URL - **THIS IS YOUR APP URL!**

---

### Strategy 2: Single Service (SIMPLER BUT LESS OPTIMAL)

Run both on one service.

1. **Configure Service:**
   - Click on the auto-created service
   - Go to **Settings**
   - Set **Start Command**: `bash railway_start.sh`

2. **Add Environment Variables:**
   ```
   GROQ_API_KEY = your_groq_api_key_here
   PORT = 3000
   ```
   
   **⚠️ IMPORTANT:** Get your actual Groq API key from your local `.env` file

3. **Generate Domain:**
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**

---

## 🔍 Deployment Status

After deployment starts, Railway will show build logs. Look for:

**Backend logs should show:**
```
Server running on http://0.0.0.0:8765
Ready to serve requests
```

**Frontend logs should show:**
```
ready - started server on 0.0.0.0:3000
```

---

## ✅ Verify Deployment

### Test Backend:
Visit: `https://your-backend-url.railway.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "dataset": "agricultural-2017-v1",
  "ai_configured": true
}
```

### Test Frontend:
Visit: `https://your-frontend-url.railway.app`

Should see the Ihaze Rwanda landing page!

---

## 🐛 Troubleshooting

### Build Failed?

**Backend Issues:**
- Check if Python version is correct (3.8+)
- Verify `backend/server.py` exists
- Check environment variables are set

**Frontend Issues:**
- Check if `frontend/package.json` exists
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check build logs for missing dependencies

### App Not Loading?

1. **Check Service Status:**
   - Go to Railway dashboard
   - Ensure both services show "Active"

2. **Check Logs:**
   - Click on service → **Deployments** tab
   - Click latest deployment
   - View logs for errors

3. **Check Domains:**
   - Go to **Settings** → **Networking**
   - Ensure domain is generated

### AI Chat Not Working?

- Verify `GROQ_API_KEY` is set in backend service
- Check backend logs for API errors
- Test backend health endpoint

---

## 🔄 Updating Your App

After pushing changes to GitHub:

```bash
git add .
git commit -m "Update description"
git push
```

Railway will **automatically redeploy** both services!

---

## 💰 Cost (FREE Tier)

Railway free tier includes:
- ✅ $5 credit per month
- ✅ 500 hours of execution time
- ✅ 1GB RAM per service
- ✅ 1GB disk per service

**Your app should stay within free tier!**

---

## 📊 Service URLs After Deployment

Once done, you'll have:

**Backend API:**
```
https://[your-backend-name].railway.app
```

**Frontend App (Main URL):**
```
https://[your-frontend-name].railway.app
```

**Use the frontend URL for your hackathon submission!**

---

## 🎯 After Successful Deployment

1. ✅ Copy your frontend URL
2. ✅ Update README.md with the URL
3. ✅ Test all features work
4. ✅ Record demo video
5. ✅ Submit to NISR!

---

## 📞 Need Help?

**Railway Documentation:** https://docs.railway.app
**Railway Discord:** https://discord.gg/railway

**Common Railway Commands (if using CLI):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Open in browser
railway open
```

---

## ✨ Deployment Checklist

Before you submit to NISR, verify:

- [ ] Backend deploys successfully
- [ ] Frontend deploys successfully
- [ ] `/api/health` endpoint works
- [ ] Landing page loads
- [ ] AI chat widget works
- [ ] District search works
- [ ] Data export works
- [ ] Mobile responsive
- [ ] All URLs updated in README.md

---

**Good luck with your deployment!** 🚀

Once you have your Railway URLs, update your README and you're ready to submit!
