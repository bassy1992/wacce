# 🚀 Vercel Environment Variables Setup

## The Issue

Your frontend is still using the placeholder URL `https://your-backend-domain.com` because Vercel hasn't been configured with the correct backend URL yet.

## Quick Fix - Set Environment Variable in Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select your project: **wacefront**
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add this variable:
   ```
   Name:  VITE_API_URL
   Value: https://wacce-production.up.railway.app/api
   ```
6. Select all environments: **Production**, **Preview**, **Development**
7. Click **Save**
8. Go to **Deployments** tab
9. Click the **...** menu on the latest deployment
10. Click **Redeploy**

### Option 2: Via Vercel CLI

```bash
cd wacefront

# Install Vercel CLI if not installed
npm install -g vercel

# Login
vercel login

# Set environment variable
vercel env add VITE_API_URL production
# When prompted, enter: https://wacce-production.up.railway.app/api

# Also set for preview and development
vercel env add VITE_API_URL preview
vercel env add VITE_API_URL development

# Redeploy
vercel --prod
```

## Verify It Works

After redeployment (takes 1-2 minutes):

1. Go to https://wacefront.vercel.app
2. Open browser console (F12)
3. Try to sign up or log in
4. **No more CORS errors!** 🎉

## What We Fixed

✅ Updated `vercel.json` with correct backend URL  
✅ Configured environment variable for Vercel  
✅ Backend CORS already configured correctly  

## Environment Variables Summary

Your Vercel project needs these environment variables:

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://wacce-production.up.railway.app/api` | ✅ Yes |
| `VITE_APP_NAME` | `ExcelWASSCE` | Optional |
| `VITE_APP_VERSION` | `1.0.0` | Optional |
| `VITE_APP_URL` | `https://wacefront.vercel.app` | Optional |

## Troubleshooting

**Still seeing the error?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check Vercel deployment logs for build errors

**Environment variable not working?**
- Make sure you selected all environments (Production, Preview, Development)
- Verify the variable name is exactly `VITE_API_URL` (case-sensitive)
- Redeploy after adding the variable

**Build failing?**
- Check Vercel deployment logs
- Ensure `package.json` has correct build command

---

**Once you set the environment variable and redeploy, everything will work!** 🚀
