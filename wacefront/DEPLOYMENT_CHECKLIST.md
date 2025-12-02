# 🚀 Vercel Deployment Checklist

## Pre-Deployment Setup

### ✅ 1. Backend Preparation
- [ ] Deploy your Django backend to a hosting service (Railway, Heroku, DigitalOcean, etc.)
- [ ] Get your backend API URL (e.g., `https://your-backend.railway.app/api`)
- [ ] Ensure backend CORS settings allow your Vercel domain
- [ ] Test backend API endpoints are working

### ✅ 2. Environment Variables
- [ ] Update `VITE_API_URL` in Vercel dashboard to your backend URL
- [ ] Set `VITE_APP_NAME=ExcelWASSCE`
- [ ] Set `VITE_APP_VERSION=1.0.0`

### ✅ 3. Code Preparation
- [ ] All images are in `public/images/` folder
- [ ] API calls use `import.meta.env.VITE_API_URL`
- [ ] Mobile responsive design is tested
- [ ] All pages load correctly

## Deployment Steps

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from wacefront folder
cd wacefront
vercel --prod
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `wacefront`
5. Configure build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

## Post-Deployment

### ✅ 4. Configure Environment Variables in Vercel
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   ```
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_APP_NAME=ExcelWASSCE
   VITE_APP_VERSION=1.0.0
   ```

### ✅ 5. Update Backend CORS
Add your Vercel domain to Django CORS settings:
```python
# In your Django settings.py
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",
    "http://localhost:3000",  # Keep for development
]
```

### ✅ 6. Test Deployment
- [ ] Visit your Vercel URL
- [ ] Test navigation between pages
- [ ] Test mobile responsiveness
- [ ] Test login/signup functionality
- [ ] Test API connections
- [ ] Check browser console for errors

## Common Issues & Solutions

### 🔧 Build Errors
- **"Module not found"**: Check import paths and case sensitivity
- **"Out of memory"**: Increase Node.js memory in Vercel settings
- **TypeScript errors**: Run `npm run typecheck` locally first

### 🔧 Runtime Errors
- **API calls fail**: Check VITE_API_URL environment variable
- **CORS errors**: Update backend CORS settings
- **404 on refresh**: Vercel.json should handle SPA routing (already configured)

### 🔧 Performance Issues
- **Slow loading**: Images are optimized and in public folder
- **Large bundle**: Code splitting is configured in Vite

## Files Created for Vercel

- ✅ `vercel.json` - Vercel configuration
- ✅ `.env.production` - Production environment template
- ✅ `deploy.sh` - Deployment script
- ✅ Updated `package.json` with `vercel-build` script
- ✅ Updated `shared/api.ts` to use environment variables

## Success Indicators

When deployment is successful, you should see:
- ✅ Green checkmark in Vercel dashboard
- ✅ Your app loads at the provided URL
- ✅ All pages are accessible
- ✅ Login/signup works with your backend
- ✅ Images display correctly
- ✅ Mobile version works properly

## Need Help?

1. Check Vercel build logs in the dashboard
2. Test locally with `npm run build && npm run preview`
3. Verify environment variables are set correctly
4. Ensure backend is accessible and CORS is configured

---

🎉 **Ready to deploy!** Run `./deploy.sh` or follow the manual steps above.