# Quick Reference Card

## 🔗 Your URLs

```
Backend:  https://wacce-production.up.railway.app
Frontend: https://wacefront.vercel.app
Admin:    https://wacce-production.up.railway.app/admin/
```

## 🚀 Deploy Commands

```bash
# Backend (Railway - auto-deploys on git push)
git push

# Frontend (Vercel - auto-deploys on git push)
cd wacefront && git push

# Manual Railway deploy
railway up
```

## 📊 Check Status

```bash
# Railway logs
railway logs

# Railway variables
railway variables

# Test API
curl https://wacce-production.up.railway.app/api/health/

# Test CORS
curl -I -X OPTIONS https://wacce-production.up.railway.app/api/auth/profile/ \
  -H "Origin: https://wacefront.vercel.app"
```

## 🔧 Common Tasks

```bash
# Create superuser
railway run python manage.py createsuperuser

# Run migrations
railway run python manage.py migrate

# Django shell
railway run python manage.py shell

# Collect static files
railway run python manage.py collectstatic
```

## ⚙️ Environment Variables (Railway)

```
DEBUG=False
SECRET_KEY=<your-secret-key>
DATABASE_URL=<auto-set-by-railway>
FRONTEND_URL=https://wacefront.vercel.app
ALLOWED_ORIGINS=https://wacefront.vercel.app
DJANGO_SETTINGS_MODULE=wace_api.settings_production
```

## 🐛 Quick Fixes

**CORS Error?**
- Check `ALLOWED_ORIGINS` in Railway variables
- Verify frontend is using correct backend URL

**500 Error?**
- Check Railway logs: `railway logs`
- Verify DATABASE_URL is set

**Can't login to admin?**
- Create superuser: `railway run python manage.py createsuperuser`

**Frontend can't connect?**
- Check `wacefront/.env.production` has correct `VITE_API_URL`
- Redeploy Vercel after changes

## 📱 Test Your Deployment

1. Visit https://wacefront.vercel.app
2. Try to sign up or log in
3. Check browser console (F12) - no CORS errors!
4. Test API: https://wacce-production.up.railway.app/api/health/

---

**Everything is working! 🎉**
