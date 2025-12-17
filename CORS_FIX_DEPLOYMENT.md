# CORS Fix Deployment Guide

## What Was Fixed

The CORS error was caused by the backend not allowing requests from your production frontend domain (`https://wacefront.vercel.app`).

## Changes Made

1. **Updated `wacebackend/wace_api/settings.py`**:
   - Added environment variable support for `DEBUG`, `ALLOWED_HOSTS`, and `ALLOWED_ORIGINS`
   - CORS origins now dynamically include production domains when `DEBUG=False`
   - Added CSRF trusted origins for production

## Deployment Steps

### 1. Set Environment Variables on Railway

In your Railway backend project, add these environment variables:

```bash
DEBUG=False
FRONTEND_URL=https://wacefront.vercel.app
ALLOWED_ORIGINS=https://wacefront.vercel.app
SECRET_KEY=<generate-a-new-secret-key>
```

### 2. Redeploy Backend

After setting the environment variables, Railway should automatically redeploy. If not:

```bash
cd wacebackend
git add .
git commit -m "Fix CORS configuration for production"
git push
```

### 3. Verify CORS Headers

After deployment, test the API endpoint:

```bash
curl -I -X OPTIONS https://your-backend-domain.com/api/auth/profile/ \
  -H "Origin: https://wacefront.vercel.app" \
  -H "Access-Control-Request-Method: GET"
```

You should see these headers in the response:
- `Access-Control-Allow-Origin: https://wacefront.vercel.app`
- `Access-Control-Allow-Credentials: true`

### 4. Test Frontend

Once the backend is redeployed, your frontend at `https://wacefront.vercel.app` should be able to make API requests without CORS errors.

## Important Notes

- **Replace `your-backend-domain.com`** with your actual Railway backend URL
- The backend will automatically allow all origins in development (`DEBUG=True`)
- In production (`DEBUG=False`), only origins listed in `ALLOWED_ORIGINS` are allowed
- Make sure to generate a strong `SECRET_KEY` for production

## Troubleshooting

If you still see CORS errors:

1. Check Railway logs to ensure environment variables are set correctly
2. Verify the backend is running with `DEBUG=False`
3. Ensure `corsheaders.middleware.CorsMiddleware` is first in MIDDLEWARE list (already configured)
4. Check that your frontend is using the correct backend URL
