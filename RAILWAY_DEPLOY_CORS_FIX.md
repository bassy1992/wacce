# 🚂 Railway Deployment - CORS Fix

## What Was Fixed

Updated both `settings.py` and `settings_production.py` to properly handle CORS for your Vercel frontend.

## Deploy to Railway - Step by Step

### 1. Set Environment Variables in Railway

Go to your Railway project dashboard → **Variables** tab and add/update:

```bash
# Required
DEBUG=False
SECRET_KEY=<generate-a-strong-secret-key>
DJANGO_SETTINGS_MODULE=wace_api.settings_production

# CORS Configuration
FRONTEND_URL=https://wacefront.vercel.app
ALLOWED_ORIGINS=https://wacefront.vercel.app

# Optional (Railway sets these automatically)
RAILWAY_ENVIRONMENT=production
USE_HTTPS=True
```

**Generate a Secret Key:**
```python
# Run in Python terminal
import secrets
print(secrets.token_urlsafe(50))
```

### 2. Deploy Options

#### Option A: Automatic Deploy (Recommended)
If your Railway project is connected to GitHub:
1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Fix CORS configuration for production"
   git push
   ```
2. Railway will automatically detect the push and redeploy

#### Option B: Manual Deploy via Railway CLI
```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project (if not linked)
railway link

# Deploy
railway up
```

#### Option C: Redeploy from Dashboard
1. Go to your Railway project
2. Click on your backend service
3. Go to **Deployments** tab
4. Click **Deploy** button (top right)

### 3. Verify Deployment

#### Check Deployment Status
1. Go to Railway dashboard → Your service → **Deployments**
2. Wait for "Success" status (usually 2-5 minutes)
3. Check the logs for any errors

#### Test CORS Headers
Once deployed, test the CORS configuration:

```bash
# Replace YOUR-APP-NAME with your Railway app name
curl -I -X OPTIONS https://YOUR-APP-NAME.railway.app/api/auth/profile/ \
  -H "Origin: https://wacefront.vercel.app" \
  -H "Access-Control-Request-Method: GET"
```

You should see:
```
Access-Control-Allow-Origin: https://wacefront.vercel.app
Access-Control-Allow-Credentials: true
```

#### Test API Endpoints
```bash
# Health check
curl https://YOUR-APP-NAME.railway.app/api/health/

# API info
curl https://YOUR-APP-NAME.railway.app/api/info/
```

### 4. Update Frontend (if needed)

Make sure your frontend `.env.production` has the correct backend URL:

```bash
VITE_API_URL=https://YOUR-APP-NAME.railway.app/api
```

### 5. Test Frontend

1. Go to https://wacefront.vercel.app
2. Try to sign up or log in
3. Check browser console - CORS errors should be gone!

## Troubleshooting

### Still Getting CORS Errors?

1. **Check Environment Variables**
   ```bash
   railway variables
   ```
   Verify `FRONTEND_URL` and `ALLOWED_ORIGINS` are set correctly

2. **Check Logs**
   ```bash
   railway logs
   ```
   Look for any Django errors or warnings

3. **Verify Settings Module**
   Make sure `DJANGO_SETTINGS_MODULE=wace_api.settings_production` is set

4. **Check CORS Middleware Order**
   In `settings.py`, `corsheaders.middleware.CorsMiddleware` should be first in MIDDLEWARE (already configured)

### Common Issues

**Issue**: "No 'Access-Control-Allow-Origin' header"
- **Solution**: Verify `ALLOWED_ORIGINS` environment variable is set
- Check Railway logs to see what origins are being allowed

**Issue**: "CSRF token missing or incorrect"
- **Solution**: Ensure `CORS_ALLOW_CREDENTIALS = True` (already set)
- Verify frontend is sending credentials with requests

**Issue**: 500 Internal Server Error
- **Solution**: Check Railway logs for Python errors
- Verify database migrations ran successfully

### Debug Commands

```bash
# View all environment variables
railway variables

# View recent logs
railway logs

# Run Django shell
railway run python manage.py shell

# Run migrations
railway run python manage.py migrate

# Create superuser
railway run python manage.py createsuperuser
```

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `DEBUG` | `False` | Yes |
| `SECRET_KEY` | `<random-50-char-string>` | Yes |
| `DJANGO_SETTINGS_MODULE` | `wace_api.settings_production` | Yes |
| `FRONTEND_URL` | `https://wacefront.vercel.app` | Yes |
| `ALLOWED_ORIGINS` | `https://wacefront.vercel.app` | Yes |
| `DATABASE_URL` | Auto-set by Railway | No |
| `RAILWAY_PUBLIC_DOMAIN` | Auto-set by Railway | No |
| `USE_HTTPS` | `True` | No (default: True) |
| `DJANGO_LOG_LEVEL` | `INFO` | No (default: INFO) |

## Next Steps After Deployment

1. ✅ Test all API endpoints
2. ✅ Create a superuser for admin access
3. ✅ Test frontend authentication flow
4. ✅ Monitor Railway logs for any issues
5. ✅ Set up custom domain (optional)

---

**Need Help?**
- Railway Docs: https://docs.railway.app
- Django CORS: https://github.com/adamchainz/django-cors-headers
