# 🚀 Quick Start: Deploy CORS Fix to Railway

## TL;DR - 3 Steps to Fix CORS

1. **Set environment variables in Railway**
2. **Redeploy your backend**
3. **Test your frontend**

---

## Step 1: Set Environment Variables

### Option A: Use the Script (Easiest)

**Windows:**
```cmd
set_railway_env.bat
```

**Mac/Linux:**
```bash
chmod +x set_railway_env.sh
./set_railway_env.sh
```

### Option B: Set Manually via Railway Dashboard

1. Go to https://railway.app
2. Open your backend project
3. Click **Variables** tab
4. Add these variables:

```
DEBUG=False
DJANGO_SETTINGS_MODULE=wace_api.settings_production
FRONTEND_URL=https://wacefront.vercel.app
ALLOWED_ORIGINS=https://wacefront.vercel.app
USE_HTTPS=True
```

5. **Generate and set SECRET_KEY:**
   ```bash
   # Run this to generate a key
   python -c "import secrets; print(secrets.token_urlsafe(50))"
   
   # Copy the output and add as SECRET_KEY variable in Railway
   ```

### Option C: Use Railway CLI

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set variables
railway variables set DEBUG=False
railway variables set DJANGO_SETTINGS_MODULE=wace_api.settings_production
railway variables set FRONTEND_URL=https://wacefront.vercel.app
railway variables set ALLOWED_ORIGINS=https://wacefront.vercel.app
railway variables set SECRET_KEY=<your-generated-secret-key>
```

---

## Step 2: Deploy to Railway

### If Connected to GitHub (Automatic)

```bash
git add .
git commit -m "Fix CORS for production"
git push
```

Railway will automatically redeploy (takes 2-5 minutes).

### Using Railway CLI

```bash
railway up
```

### From Railway Dashboard

1. Go to your backend service
2. Click **Deployments** tab
3. Click **Deploy** button

---

## Step 3: Test It Works

### 1. Wait for Deployment
Check Railway dashboard until status shows "Success" ✅

### 2. Test CORS Headers

Replace `YOUR-APP-NAME` with your actual Railway app name:

```bash
curl -I -X OPTIONS https://YOUR-APP-NAME.railway.app/api/auth/profile/ \
  -H "Origin: https://wacefront.vercel.app" \
  -H "Access-Control-Request-Method: GET"
```

**Expected output:**
```
Access-Control-Allow-Origin: https://wacefront.vercel.app
Access-Control-Allow-Credentials: true
```

### 3. Test Your Frontend

1. Go to https://wacefront.vercel.app
2. Try to sign up or log in
3. Check browser console - **no more CORS errors!** 🎉

---

## What If It Still Doesn't Work?

### Check 1: Verify Environment Variables
```bash
railway variables
```

Make sure you see:
- `FRONTEND_URL=https://wacefront.vercel.app`
- `ALLOWED_ORIGINS=https://wacefront.vercel.app`
- `DEBUG=False`

### Check 2: View Logs
```bash
railway logs
```

Look for:
- Any Python errors
- CORS-related messages
- "ALLOWED_ORIGINS" in the logs

### Check 3: Verify Backend URL

Make sure your frontend `.env.production` has the correct Railway URL:
```
VITE_API_URL=https://YOUR-APP-NAME.railway.app/api
```

If you changed it, redeploy Vercel:
```bash
cd wacefront
git add .
git commit -m "Update backend URL"
git push
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "No Access-Control-Allow-Origin header" | Check `ALLOWED_ORIGINS` is set in Railway |
| "CSRF token missing" | Ensure `CORS_ALLOW_CREDENTIALS = True` (already set) |
| 500 Internal Server Error | Check Railway logs for Python errors |
| Frontend can't connect | Verify `VITE_API_URL` in frontend `.env.production` |

---

## Need Your Railway App Name?

1. Go to https://railway.app
2. Open your backend project
3. Look at the URL or **Settings** → **Domains**
4. It will be something like: `your-app-name.railway.app`

---

## Summary of Changes Made

✅ Updated `wacebackend/wace_api/settings.py` - Added environment variable support  
✅ Updated `wacebackend/wace_api/settings_production.py` - Fixed CORS for production  
✅ Created deployment scripts and guides  

**All you need to do now is deploy!** 🚀
