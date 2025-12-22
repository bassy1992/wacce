# Video Protection Setup Guide

## Overview
Your videos are now protected with signed URLs and frontend download prevention. This makes it significantly harder for users to download or share your videos.

## What's Been Implemented

### 1. **Signed URLs (Backend)**
- Videos now use temporary, expiring URLs (1 hour by default)
- URLs are generated on-demand when users request lessons
- Only authenticated users get video URLs (except for free lessons)
- Uses DigitalOcean Spaces S3-compatible API

### 2. **Frontend Protection**
- `controlsList="nodownload"` - Removes download button from video player
- `disablePictureInPicture` - Prevents picture-in-picture mode
- `onContextMenu={(e) => e.preventDefault()}` - Disables right-click menu
- `noremoteplayback` - Prevents casting to other devices

## Setup Instructions

### Step 1: Add Environment Variables

You need to add these environment variables to your Railway deployment:

```bash
DO_SPACES_ACCESS_KEY=your_access_key_here
DO_SPACES_SECRET_KEY=your_secret_key_here
DO_SPACES_REGION=sfo3
DO_SPACES_BUCKET=tailsandtrailsmedia
```

### Step 2: Get Your DigitalOcean Spaces Credentials

1. Log into your DigitalOcean account
2. Go to **API** → **Spaces Keys**
3. Click **Generate New Key**
4. Copy the **Access Key** and **Secret Key**
5. Add them to Railway environment variables

### Step 3: Set Environment Variables on Railway

**Option A: Via Railway Dashboard**
1. Go to your Railway project
2. Click on your service
3. Go to **Variables** tab
4. Add each variable:
   - `DO_SPACES_ACCESS_KEY`
   - `DO_SPACES_SECRET_KEY`
   - `DO_SPACES_REGION` (set to `sfo3`)
   - `DO_SPACES_BUCKET` (set to `tailsandtrailsmedia`)

**Option B: Via Railway CLI**
```bash
railway variables set DO_SPACES_ACCESS_KEY=your_key_here
railway variables set DO_SPACES_SECRET_KEY=your_secret_here
railway variables set DO_SPACES_REGION=sfo3
railway variables set DO_SPACES_BUCKET=tailsandtrailsmedia
```

### Step 4: Install Dependencies

The `boto3` library has been added to `requirements.txt`. Railway will automatically install it on next deployment.

If testing locally:
```bash
cd wacebackend
pip install boto3
```

### Step 5: Deploy

```bash
git add .
git commit -m "Add video protection with signed URLs"
git push
```

Railway will automatically redeploy with the new changes.

## How It Works

### Before (Unprotected)
```
User requests lesson → Backend returns direct URL → User can share/download
```

### After (Protected)
```
User requests lesson → Backend generates signed URL (expires in 1 hour) → 
User gets temporary URL → URL expires after 1 hour → Cannot be shared
```

## Security Features

### ✅ What's Protected
- Videos require authentication to access
- URLs expire after 1 hour (configurable)
- Download button removed from player
- Right-click disabled on video
- Picture-in-picture disabled
- Remote playback disabled

### ⚠️ Limitations
- Users can still screen record (no technology can prevent this)
- Determined users with technical knowledge can still extract videos
- The goal is to make it inconvenient enough that most users won't bother

## Configuration Options

### Change URL Expiration Time

In `wacebackend/courses/views.py`, line 143:
```python
video_url = generate_signed_video_url(video_url, expiration=3600)  # 3600 = 1 hour
```

Change `3600` to:
- `1800` = 30 minutes
- `7200` = 2 hours
- `300` = 5 minutes (very secure but may interrupt viewing)

### Disable Protection for Testing

If you want to temporarily disable signed URLs (for testing), the system will fall back to direct URLs if environment variables are not set.

## Testing

1. **Test Signed URLs**:
   - Log in to your app
   - Open a lesson with a video
   - Check browser DevTools → Network tab
   - Video URL should have query parameters like `?X-Amz-Algorithm=...`

2. **Test Expiration**:
   - Copy a video URL
   - Wait 1 hour
   - Try to access the URL directly → Should fail

3. **Test Frontend Protection**:
   - Right-click on video → Context menu should not appear
   - Look for download button → Should not be visible

## Troubleshooting

### Videos Not Loading
- Check that environment variables are set correctly
- Verify DigitalOcean Spaces credentials are valid
- Check Railway logs: `railway logs`

### URLs Not Signed
- If credentials are missing, system falls back to direct URLs
- Check logs for: "Warning: DigitalOcean Spaces credentials not configured"

### CORS Errors
- Ensure your DigitalOcean Spaces bucket has CORS configured
- Go to Spaces → Settings → CORS Configurations
- Add your domain to allowed origins

## Additional Security Recommendations

### 1. Add Watermarking
- Overlay user email/ID on videos
- Discourages sharing since it's traceable

### 2. Domain Restrictions
- Configure DigitalOcean Spaces to only allow requests from your domain
- Go to Spaces → Settings → CORS

### 3. Rate Limiting
- Limit how many videos a user can watch per day
- Prevents bulk downloading

### 4. Monitor Usage
- Track video access patterns
- Flag suspicious behavior (multiple IPs, rapid downloads)

## Cost Considerations

- Signed URLs don't add extra costs
- DigitalOcean Spaces charges for:
  - Storage: $5/month for 250GB
  - Bandwidth: $0.01/GB after 1TB free
- boto3 library is free and open source

## Support

If you encounter issues:
1. Check Railway logs: `railway logs`
2. Verify environment variables are set
3. Test with a free lesson first
4. Check DigitalOcean Spaces access logs
