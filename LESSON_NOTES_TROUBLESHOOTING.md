# Lesson Notes Troubleshooting Guide

## Issue: "I can't see lesson notes"

### Quick Checks

#### 1. Check if Django Server is Running
```bash
python wacebackend/manage.py runserver
```
Should see: `Starting development server at http://127.0.0.1:8000/`

#### 2. Check if Frontend is Running
```bash
cd wacefront
npm run dev
```
Should see: `Local: http://localhost:5173/`

#### 3. Open Browser Console
- Press F12 in your browser
- Go to Console tab
- Look for any errors (red text)
- Look for the console.log messages:
  ```
  First lesson: {...}
  Has notes: true
  Notes length: 1062
  ```

### Verification Steps

#### Step 1: Verify Database Has Notes
```bash
python check_lesson_notes.py
```

**Expected Output:**
```
Has notes: True
Notes length: 1062 characters
```

**If False:** Run `python add_sample_lesson_notes.py`

#### Step 2: Verify API Returns Notes
```bash
python test_api_notes.py
```

**Expected Output:**
```
✓ API Response: 200
Has 'notes' field: True
Notes length: 1062 characters
```

**If notes field missing:** Check `wacebackend/courses/views.py` line ~150

#### Step 3: Test with HTML Page
1. Open `test_lesson_notes_ui.html` in browser
2. Should see lesson info and notes
3. If error, check Django server is running

#### Step 4: Check Frontend
1. Go to: http://localhost:5173/topic/english-language/1
2. Click on first lesson
3. Scroll down past the video
4. Should see "📄 Lesson Notes" section

### Common Issues & Solutions

#### Issue 1: Notes Section Not Visible

**Symptom:** Can't see "Lesson Notes" heading at all

**Solution:**
1. Make sure you selected a lesson (click on lesson in sidebar)
2. Scroll down below the video player
3. Check browser console for errors
4. Clear browser cache (Ctrl+Shift+Delete)

#### Issue 2: "No notes available for this lesson yet"

**Symptom:** See notes section but message says no notes

**Possible Causes:**
1. **Database doesn't have notes**
   ```bash
   python check_lesson_notes.py
   ```
   If shows "Has notes: False", run:
   ```bash
   python add_sample_lesson_notes.py
   ```

2. **API not returning notes**
   ```bash
   python test_api_notes.py
   ```
   If shows "Has 'notes' field: False", check views.py

3. **Frontend not receiving notes**
   - Check browser console
   - Look for: `Has notes: true`
   - If false, API might not be returning data

#### Issue 3: Notes Show But Are Empty

**Symptom:** Notes section visible but blank

**Solution:**
1. Check database:
   ```bash
   python check_lesson_notes.py
   ```
2. If notes exist in DB but not showing:
   - Clear browser cache
   - Hard refresh (Ctrl+F5)
   - Check browser console for errors

#### Issue 4: API Error 404

**Symptom:** Console shows "Failed to load topic data"

**Solution:**
1. Verify Django server is running
2. Check URL is correct
3. Verify subject/topic exists in database
4. Check CORS settings if using different ports

#### Issue 5: TypeScript Errors

**Symptom:** Frontend won't compile

**Solution:**
1. Check `wacefront/shared/api.ts` has notes field:
   ```typescript
   export interface Lesson {
     // ...
     notes?: string;
   }
   ```
2. Run: `npm install` in wacefront directory
3. Restart dev server

### Debug Mode

#### Enable Detailed Logging

**In Topic.tsx (already added):**
```typescript
console.log('First lesson:', firstLesson);
console.log('Has notes:', !!firstLesson.notes);
console.log('Notes length:', firstLesson.notes?.length || 0);
```

**Check Console Output:**
1. Open browser console (F12)
2. Navigate to topic page
3. Look for these log messages
4. Verify notes data is present

### Manual Testing Checklist

- [ ] Django server running on port 8000
- [ ] Frontend running on port 5173
- [ ] Database has notes (check_lesson_notes.py)
- [ ] API returns notes (test_api_notes.py)
- [ ] Browser console shows no errors
- [ ] Lesson is selected (clicked in sidebar)
- [ ] Scrolled down below video player
- [ ] Browser cache cleared
- [ ] Hard refresh performed (Ctrl+F5)

### Expected Behavior

#### What You Should See:

1. **Video Player** at top
2. **Lesson Title** and info
3. **Mark as Complete** button
4. **Lesson Notes Section** with:
   - 📄 Icon and "Lesson Notes" heading
   - Light blue background
   - Formatted text with proper line breaks
   - Headers, bullet points, etc.

#### Example Layout:
```
┌─────────────────────────┐
│   VIDEO PLAYER          │
└─────────────────────────┘
┌─────────────────────────┐
│ Introduction to Grammar │
│ 20 min • video • Free   │
│ [Completed ✓] [Resources]│
└─────────────────────────┘
┌─────────────────────────┐
│ 📄 Lesson Notes         │  ← Should see this!
│ ─────────────────────   │
│ # Key Points            │
│ - Grammar rules         │
│ - Sentence structure    │
└─────────────────────────┘
```

### Still Not Working?

#### Collect Debug Information:

1. **Database Check:**
   ```bash
   python check_lesson_notes.py > debug_db.txt
   ```

2. **API Check:**
   ```bash
   python test_api_notes.py > debug_api.txt
   ```

3. **Browser Console:**
   - Open console (F12)
   - Copy all messages
   - Save to debug_console.txt

4. **Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Find request to `/api/courses/subjects/`
   - Check Response tab
   - Verify notes field exists

### Quick Fix Commands

```bash
# 1. Add notes to all lessons
python add_sample_lesson_notes.py

# 2. Restart Django server
# Press Ctrl+C to stop, then:
python wacebackend/manage.py runserver

# 3. Restart frontend
# Press Ctrl+C to stop, then:
cd wacefront
npm run dev

# 4. Clear browser cache and hard refresh
# In browser: Ctrl+Shift+Delete, then Ctrl+F5
```

### Contact Support

If still not working, provide:
1. Output of `check_lesson_notes.py`
2. Output of `test_api_notes.py`
3. Browser console screenshot
4. Network tab screenshot showing API response
5. Django server logs

## Success Indicators

✅ Database has notes (check_lesson_notes.py shows True)
✅ API returns notes (test_api_notes.py shows notes field)
✅ Browser console shows "Has notes: true"
✅ Notes section visible on page
✅ Notes content displays properly
✅ Formatting preserved (line breaks, headers)

## Prevention

To avoid issues in future:
1. Always run migrations after model changes
2. Verify API responses include new fields
3. Check TypeScript interfaces match API
4. Test in browser after changes
5. Clear cache when updating code
