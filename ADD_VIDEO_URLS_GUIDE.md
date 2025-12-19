# Guide: Adding Video URLs to Lessons

## Overview
This guide explains how to add video URLs to individual lessons in your Django admin interface.

---

## What Changed

### Django Admin Interface Updates
The Lesson admin interface now shows the `video_url` field, making it easy to add video URLs for each lesson.

**New Fields Visible:**
- ✅ **Video URL** - Add the full URL to the video file
- ✅ **Video Duration (minutes)** - Specify how long the video is
- ✅ **Has Video** indicator - Shows which lessons have videos

---

## How to Add Video URLs

### Method 1: Via Django Admin (Individual Lessons)

1. **Login to Django Admin**
   - URL: https://wacce-production.up.railway.app/admin/
   - Username: `railwayadmin`
   - Password: `Willfynn1992@`

2. **Navigate to Lessons**
   - Click on "Courses" → "Lessons"
   - OR go to a specific Topic and edit lessons inline

3. **Edit a Lesson**
   - Click on the lesson you want to edit
   - You'll see three sections:
     - **Basic Information**: Title, Type, Order, Is Free
     - **Video Content**: Video URL, Video Duration
     - **Text Content**: Content for reading materials

4. **Add Video URL**
   - In the "Video Content" section
   - Paste the full video URL in the "Video URL" field
   - Example: `https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/video.mp4`
   - Set the duration in minutes

5. **Save**
   - Click "Save" or "Save and continue editing"

### Method 2: Via Topic Admin (Inline Editing)

1. **Navigate to Topics**
   - Click on "Courses" → "Topics"

2. **Edit a Topic**
   - Click on the topic (e.g., "Grammar and Syntax")
   - Scroll down to the "Lessons" section

3. **Edit Lessons Inline**
   - You'll see a table with columns:
     - Title
     - Lesson type
     - **Video URL** ← NEW!
     - **Video duration minutes** ← NEW!
     - Order
     - Is free
   - Add video URLs directly in the table

4. **Save**
   - Click "Save" at the bottom

---

## Method 3: Bulk Update via Management Command

### Update All Lessons at Once

We created a management command to update all video lessons with URLs automatically.

**Run via API:**

```python
# Use the update_all_videos_railway.py script
python update_all_videos_railway.py
```

This will:
- Update all video lessons that don't have URLs
- Use the default video URL for all subjects
- Skip lessons that already have URLs

**Customize Video URLs:**

Edit `wacebackend/students/management/commands/update_all_video_urls.py`:

```python
SUBJECT_VIDEO_URLS = {
    'English Language': "https://your-video-url.com/english.mp4",
    'Mathematics (Core)': "https://your-video-url.com/math.mp4",
    'Integrated Science': "https://your-video-url.com/science.mp4",
    # Add more subjects...
}
```

---

## Video URL Format

### Supported Formats
- ✅ MP4 videos (`.mp4`)
- ✅ Direct video URLs
- ✅ CDN-hosted videos (DigitalOcean Spaces, AWS S3, etc.)

### Example URLs
```
https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/english-grammar.mp4
https://your-cdn.com/videos/mathematics-lesson-1.mp4
https://storage.googleapis.com/your-bucket/science-video.mp4
```

### Important Notes
- ⚠️ Use **direct video file URLs** (ending in .mp4, .webm, etc.)
- ⚠️ Don't use YouTube/Vimeo embed URLs (use their API if needed)
- ⚠️ Ensure videos are publicly accessible
- ⚠️ Use HTTPS URLs for security

---

## Current Lesson Structure

### Example: English Language

**Subject:** English Language

**Topic:** Grammar and Syntax
- **Lesson 1:** Parts of Speech ← Add video URL here
- **Lesson 2:** Sentence Structure ← Add video URL here
- **Lesson 3:** Tenses and Verb Forms ← Add video URL here
- **Lesson 4:** Subject-Verb Agreement ← Add video URL here
- **Lesson 5:** Punctuation Rules ← Add video URL here

**Topic:** Vocabulary and Word Usage
- **Lesson 1:** Synonyms and Antonyms ← Add video URL here
- **Lesson 2:** Idioms and Phrases ← Add video URL here
- ... and so on

---

## Verification

### Check if Videos are Loading

1. **Via API:**
```bash
# Get subject details
curl https://wacce-production.up.railway.app/api/courses/subject/1/
```

Look for `video_url` in the lesson objects:
```json
{
  "lessons": [
    {
      "id": 1,
      "title": "Parts of Speech",
      "lesson_type": "video",
      "video_url": "https://your-video-url.com/video.mp4",
      "video_duration_minutes": 15
    }
  ]
}
```

2. **Via Frontend:**
- Login to https://wacefront.vercel.app
- Go to Dashboard → Select a Subject
- Click on a Topic
- Videos should now play in the video player

---

## Troubleshooting

### Videos Not Showing?

1. **Check if video_url is set:**
   - Go to Django admin
   - Check the lesson
   - Ensure "Video URL" field is filled

2. **Check video URL is accessible:**
   - Copy the video URL
   - Paste it in a browser
   - Video should download or play

3. **Check lesson type:**
   - Lesson type must be "video"
   - Not "reading", "quiz", etc.

4. **Check API response:**
   - Use browser dev tools (F12)
   - Check Network tab
   - Look for the API call to `/api/courses/subject/{id}/`
   - Verify `video_url` is in the response

### Video URL Not Saving?

1. **Check URL format:**
   - Must be a valid URL
   - Must start with `http://` or `https://`

2. **Check field length:**
   - Django URLField has a max length
   - Very long URLs might be truncated

3. **Check permissions:**
   - Ensure you're logged in as admin
   - Check you have permission to edit lessons

---

## Next Steps

### Option 1: Manual Entry (Recommended for Custom Videos)
- Go through each lesson in Django admin
- Add specific video URLs for each lesson
- Set appropriate durations

### Option 2: Bulk Update (Quick Start)
- Run the `update_all_videos_railway.py` script
- All video lessons get the same default video
- Later, update specific lessons with custom videos

### Option 3: Hybrid Approach
- Run bulk update to populate all lessons
- Manually update important lessons with specific videos
- Leave others with default video

---

## Summary

✅ **Django Admin Updated** - Video URL field now visible
✅ **Inline Editing** - Edit videos directly from Topic page
✅ **Bulk Update Command** - Update all lessons at once
✅ **API Working** - Video URLs returned in API responses
✅ **Frontend Ready** - Video player will display videos

**Next Action:**
1. Wait for Railway deployment to complete (~2-3 minutes)
2. Login to Django admin
3. Navigate to a Topic (e.g., "Grammar and Syntax")
4. Add video URLs to lessons
5. Test on frontend

---

## Admin URLs

- **Django Admin**: https://wacce-production.up.railway.app/admin/
- **Lessons List**: https://wacce-production.up.railway.app/admin/courses/lesson/
- **Topics List**: https://wacce-production.up.railway.app/admin/courses/topic/

**Credentials:**
- Username: `railwayadmin`
- Password: `Willfynn1992@`

---

**Status**: ✅ Deployed to Railway - Ready to add video URLs!
