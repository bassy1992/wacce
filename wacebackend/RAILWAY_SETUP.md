# 🚂 Railway Deployment Guide for ExcelWASSCE Backend

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Railway CLI** (optional): `npm install -g @railway/cli`

## Quick Deploy (Recommended)

### Option 1: Deploy Button
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/django)

### Option 2: Manual Setup

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set root directory to `wacebackend`

2. **Add PostgreSQL Database**
   - In your Railway project dashboard
   - Click "New Service"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically provide `DATABASE_URL`

## Environment Variables Setup

In your Railway project dashboard, go to **Variables** and add:

```bash
# Required Variables
DEBUG=False
SECRET_KEY=your-super-secret-key-here-make-it-long-and-random
DJANGO_SETTINGS_MODULE=wace_api.settings_production

# Frontend Configuration
FRONTEND_URL=https://wacefront.vercel.app
USE_HTTPS=True

# Optional Variables
DJANGO_LOG_LEVEL=INFO
```

### Generate Secret Key
```python
# Run this in Python to generate a secure secret key
import secrets
print(secrets.token_urlsafe(50))
```

## Deployment Configuration

Railway will automatically:
- ✅ Detect Python and install dependencies from `requirements.txt`
- ✅ Run database migrations
- ✅ Collect static files
- ✅ Start the Gunicorn server
- ✅ Provide PostgreSQL database with `DATABASE_URL`

## Custom Configuration Files

The following files are configured for Railway:

- **`railway.json`** - Railway-specific configuration
- **`Procfile`** - Process definition for deployment
- **`nixpacks.toml`** - Build configuration
- **`requirements.txt`** - Updated with production dependencies
- **`settings_production.py`** - Production Django settings

## Post-Deployment Steps

### 1. Create Superuser
```bash
# Using Railway CLI
railway run python manage.py createsuperuser

# Or via Railway dashboard
# Go to your service → Deploy logs → Click "View Logs"
# Then use the web terminal feature
```

### 2. Test Your API
Your API will be available at: `https://your-app-name.railway.app`

Test endpoints:
- Health check: `https://your-app-name.railway.app/api/health/`
- API info: `https://your-app-name.railway.app/api/info/`
- Admin panel: `https://your-app-name.railway.app/admin/`

### 3. Update Frontend Configuration
Update your frontend's `VITE_API_URL` to point to your Railway URL:
```bash
VITE_API_URL=https://your-app-name.railway.app/api
```

## Domain Configuration

### Custom Domain (Optional)
1. Go to your Railway service
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `FRONTEND_URL` environment variable

## Monitoring & Logs

### View Logs
- **Railway Dashboard**: Go to your service → "Deployments" → Click on a deployment
- **Railway CLI**: `railway logs`

### Health Monitoring
Railway automatically monitors your app using the health check endpoint at `/api/health/`

## Troubleshooting

### Common Issues

**1. Build Fails**
```bash
# Check build logs in Railway dashboard
# Ensure all dependencies are in requirements.txt
```

**2. Database Connection Issues**
```bash
# Verify DATABASE_URL is set automatically by Railway
# Check PostgreSQL service is running
```

**3. Static Files Not Loading**
```bash
# Verify STATIC_ROOT and WhiteNoise are configured
# Check collectstatic runs during deployment
```

**4. CORS Errors**
```bash
# Update FRONTEND_URL environment variable
# Verify CORS_ALLOWED_ORIGINS in settings_production.py
```

### Debug Commands
```bash
# Railway CLI commands
railway login
railway link  # Link to existing project
railway run python manage.py shell
railway run python manage.py migrate
railway run python manage.py collectstatic
```

## Security Checklist

- ✅ `DEBUG=False` in production
- ✅ Strong `SECRET_KEY` (50+ characters)
- ✅ Database credentials secured (Railway handles this)
- ✅ HTTPS enabled (`USE_HTTPS=True`)
- ✅ CORS properly configured
- ✅ Static files served securely with WhiteNoise

## Cost Optimization

- **Starter Plan**: Free tier with 500 hours/month
- **Developer Plan**: $5/month for unlimited usage
- **Database**: PostgreSQL included in plans

## Backup Strategy

Railway automatically backs up PostgreSQL databases. For additional safety:
1. Set up regular database dumps
2. Store media files in external storage (AWS S3, Cloudinary)
3. Keep your code in version control (GitHub)

---

## Quick Commands Reference

```bash
# Deploy via CLI
railway login
railway link
railway up

# Environment variables
railway variables set DEBUG=False
railway variables set SECRET_KEY=your-secret-key

# Database operations
railway run python manage.py migrate
railway run python manage.py createsuperuser
railway run python manage.py collectstatic

# Logs and monitoring
railway logs
railway status
```

🎉 **Your Django backend is now ready for Railway deployment!**

Need help? Check the [Railway Documentation](https://docs.railway.app) or [Django Deployment Guide](https://docs.djangoproject.com/en/stable/howto/deployment/).