# Populate Lesson Notes on Railway - Quick Guide

## Problem
Lesson notes show "No notes available for this lesson yet" on production because the Railway database doesn't have notes yet.

## Solution
Run the populate script to add notes to all lessons on Railway.

## Method 1: Using Railway CLI (Recommended)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Link to Your Project
```bash
railway link
```
Select your wace project from the list.

### Step 4: Run the Script
```bash
railway run python populate_lesson_notes_railway.py
```

This will:
- Connect to your Railway database
- Add notes to all lessons
- Show progress as it runs
- Display summary when done

## Method 2: Using Railway Dashboard

### Step 1: Go to Railway Dashboard
1. Visit https://railway.app
2. Login to your account
3. Select your wace project

### Step 2: Open Shell
1. Click on your service (wacebackend)
2. Click "Shell" or "Terminal" tab
3. You'll get a command line interface

### Step 3: Run Commands
```bash
# Navigate to project directory
cd /app

# Run the populate script
python populate_lesson_notes_railway.py
```

### Step 4: Verify
Check the output - should see:
```
Updated: 207
Skipped: 0
✓ Done! All lessons now have notes.
```

## Method 3: Deploy Script via Git

### Step 1: Commit the Script
```bash
git add populate_lesson_notes_railway.py
git commit -m "Add lesson notes population script"
git push origin master
```

### Step 2: SSH into Railway
```bash
railway shell
```

### Step 3: Run Script
```bash
python populate_lesson_notes_railway.py
```

## Method 4: One-Time Deployment Command

Add to your Railway service settings:

**Build Command:**
```bash
python manage.py migrate && python populate_lesson_notes_railway.py
```

This will run automatically on next deployment.

## Verification

### Check if Notes Were Added

**Option 1: Via API**
```bash
curl https://your-railway-url.up.railway.app/api/courses/subjects/1/
```
Look for `"notes"` field in the response.

**Option 2: Via Django Admin**
1. Go to your Railway admin: `https://your-url.up.railway.app/admin/`
2. Navigate to Courses → Lessons
3. Click on any lesson
4. Check if "Lesson Notes" field has content

**Option 3: Via Frontend**
1. Go to your live site: https://wacefront.vercel.app
2. Navigate to any topic page
3. Select a lesson
4. Scroll down - should see lesson notes!

## What the Script Does

### Notes Content Includes:
- **English/Literature**: Grammar, writing, reading tips
- **Mathematics**: Formulas, concepts, problem-solving strategies
- **Science**: Scientific method, key principles, lab skills
- **General**: Study strategies, exam tips, learning objectives

### Features:
- Customizes notes based on subject
- Adds lesson-specific information (title, duration, type)
- Preserves existing notes (won't overwrite)
- Shows progress during execution
- Provides detailed summary

## Expected Output

```
======================================================================
POPULATING LESSON NOTES ON RAILWAY
======================================================================

Found 207 lessons

Processing...
  Processed 10/207 lessons...
  Processed 20/207 lessons...
  ...
  Processed 207/207 lessons...

======================================================================
SUMMARY
======================================================================
Total lessons: 207
Updated: 207
Skipped (already had notes): 0
======================================================================

✓ Done! All lessons now have notes.

You can now see lesson notes on the topic pages!
```

## Troubleshooting

### Issue: "No module named 'courses'"
**Solution:** Make sure you're in the correct directory
```bash
cd /app  # or wherever your Django project is
```

### Issue: "Database connection error"
**Solution:** Check Railway environment variables are set correctly
```bash
railway variables
```

### Issue: "Permission denied"
**Solution:** Make sure script is executable
```bash
chmod +x populate_lesson_notes_railway.py
```

### Issue: Script runs but notes still not showing
**Solution:** 
1. Check if migration was applied:
   ```bash
   python manage.py showmigrations courses
   ```
2. If `0005_lesson_notes` is not checked, run:
   ```bash
   python manage.py migrate courses
   ```
3. Then run the populate script again

## Quick Commands Reference

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migration (if needed)
railway run python manage.py migrate courses

# Populate notes
railway run python populate_lesson_notes_railway.py

# Check results
railway run python manage.py shell
>>> from courses.models import Lesson
>>> Lesson.objects.exclude(notes='').count()
207  # Should show all lessons have notes
```

## Alternative: Manual Population via Admin

If scripts don't work, you can add notes manually:

1. Go to Railway admin
2. Navigate to Courses → Lessons
3. Edit each lesson
4. Add notes in the "Lesson Notes" field
5. Save

(Not recommended for 207 lessons, but works for testing)

## After Population

Once notes are populated:
1. ✅ Visit your live site
2. ✅ Go to any topic page
3. ✅ Select a lesson
4. ✅ Scroll down
5. ✅ See beautiful formatted lesson notes!

## Need Help?

If you encounter issues:
1. Check Railway logs for errors
2. Verify database connection
3. Ensure migrations are applied
4. Try running script locally first
5. Check Django admin to verify notes exist

## Success Indicators

✅ Script completes without errors
✅ Shows "Updated: 207" in summary
✅ Django admin shows notes in lessons
✅ API returns notes field with content
✅ Frontend displays notes on topic pages

## Time Required

- Script execution: ~30 seconds
- Verification: ~2 minutes
- Total: ~3 minutes

## One-Line Command

If you have Railway CLI installed and linked:
```bash
railway run python populate_lesson_notes_railway.py
```

That's it! 🎉
