# Quick Guide: Add Video URLs to Lessons

## 🎯 Problem
In Django admin, you see lessons but can't add video URLs to them.

## ✅ Solution
I've updated the admin interface to show the video URL field!

---

## 📝 Step-by-Step Instructions

### Option 1: Edit Individual Lessons

1. **Go to**: https://wacce-production.up.railway.app/admin/courses/lesson/

2. **Click on any lesson** (e.g., "Parts of Speech")

3. **You'll now see 3 sections:**

   ```
   ┌─────────────────────────────────────┐
   │ Basic Information                   │
   ├─────────────────────────────────────┤
   │ Topic: Grammar and Syntax           │
   │ Title: Parts of Speech              │
   │ Lesson type: Video                  │
   │ Order: 1                            │
   │ Is free: ☐                          │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ Video Content                       │ ← NEW!
   ├─────────────────────────────────────┤
   │ Video URL: [paste URL here]         │
   │ Video duration: [15] minutes        │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ Text Content                        │
   ├─────────────────────────────────────┤
   │ Content: [for reading materials]    │
   └─────────────────────────────────────┘
   ```

4. **Paste your video URL** in the "Video URL" field

5. **Click "Save"**

---

### Option 2: Edit Multiple Lessons at Once (Faster!)

1. **Go to**: https://wacce-production.up.railway.app/admin/courses/topic/

2. **Click on a topic** (e.g., "Grammar and Syntax")

3. **Scroll down to "Lessons" section**

4. **You'll see a table like this:**

   ```
   Lessons
   ┌──────────────────────┬────────┬─────────────────────────┬──────────┬───────┬─────────┐
   │ Title                │ Type   │ Video URL               │ Duration │ Order │ Is free │
   ├──────────────────────┼────────┼─────────────────────────┼──────────┼───────┼─────────┤
   │ Parts of Speech      │ video  │ [paste URL here]        │ 15       │ 1     │ ☐       │
   │ Sentence Structure   │ video  │ [paste URL here]        │ 15       │ 2     │ ☐       │
   │ Tenses and Verbs     │ video  │ [paste URL here]        │ 15       │ 3     │ ☐       │
   │ Subject-Verb Agree   │ video  │ [paste URL here]        │ 15       │ 4     │ ☐       │
   │ Punctuation Rules    │ video  │ [paste URL here]        │ 15       │ 5     │ ☐       │
   └──────────────────────┴────────┴─────────────────────────┴──────────┴───────┴─────────┘
   ```

5. **Add video URLs directly in the table**

6. **Click "Save" at the bottom**

---

## 🎥 Example Video URL

```
https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4
```

---

## 🚀 Quick Test

After adding video URLs:

1. **Go to**: https://wacefront.vercel.app
2. **Login** as a student
3. **Click Dashboard** → Select a subject
4. **Click on a topic** (e.g., "Grammar and Syntax")
5. **Click on a lesson** → Video should play!

---

## 📊 Current Status

### What You Have Now:
- ✅ 515 lessons across all subjects
- ✅ Each topic has 5-6 lessons
- ✅ Lessons have titles and types
- ❌ Most lessons don't have video URLs yet

### What You Need to Do:
- Add video URLs to lessons
- Either manually (one by one)
- Or use bulk update script (all at once)

---

## 🔧 Bulk Update (Optional)

If you want to add the same video to ALL lessons quickly:

```bash
python update_all_videos_railway.py
```

This will:
- Add video URLs to all 515 video lessons
- Use the default video for all
- You can then manually update specific lessons later

---

## 📍 Admin Login

**URL**: https://wacce-production.up.railway.app/admin/

**Username**: `railwayadmin`  
**Password**: `Willfynn1992@`

---

## ⏱️ Deployment Status

The changes are being deployed to Railway now. Wait 2-3 minutes, then:

1. Login to admin
2. Go to any lesson
3. You should see the "Video URL" field!

---

**That's it!** The video URL field is now available in your Django admin. 🎉
