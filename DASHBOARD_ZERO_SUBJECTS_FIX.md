# Dashboard "0 Subjects" Issue - Quick Fix Guide

## The Problem
William Yarquah's dashboard shows:
```
Welcome back, William Yarquah! 🎓
Continue your General Arts journey. You're 0% through your program!
Enrolled: December 2025 • 0 Subjects
```

But it should show the core and elective subjects for General Arts programme.

## Why This Happens
The Railway production database doesn't have subjects populated yet. The local database has subjects, but Railway is a separate database.

## Quick Fix (3 Steps)

### Step 1: Check Current Status
```bash
# Run this to see what's in the Railway database
check_railway_database.bat
```

### Step 2: Populate Subjects
```bash
# Run this to add all subjects to Railway
populate_railway_subjects.bat
```

### Step 3: Verify
- Refresh the dashboard
- You should now see subjects listed

## What Gets Created

The populate script creates:

### Core Subjects (for ALL programmes):
1. English Language
2. Mathematics (Core)
3. Integrated Science
4. Social Studies
5. ICT/Computing

### General Arts Electives:
1. Economics
2. Geography
3. History
4. Elective Mathematics
5. Literature-in-English
6. French
7. Government
8. Christian Religious Studies

**Total for General Arts: 4-5 core + 8 electives = 12-13 subjects**

## Alternative: Manual Fix via Django Admin

If you prefer to use the web interface:

1. Go to: `https://your-railway-app.railway.app/admin/`
2. Login with admin credentials
3. Navigate to **Courses > Subjects** and create subjects
4. Navigate to **Courses > Programme Subjects** and link them to programmes

## Troubleshooting

**Q: Script says "Railway CLI not found"**
A: Install it: `npm install -g @railway/cli`

**Q: Script says "Not logged in"**
A: Run: `railway login`

**Q: Still showing 0 subjects after running script**
A: 
1. Check the script output for errors
2. Run `check_railway_database.bat` to verify subjects were created
3. Clear browser cache and refresh
4. Check browser console (F12) for API errors

**Q: How do I know if it worked?**
A: Run `check_railway_database.bat` - you should see:
- Total Subjects: 28
- General Arts: 12-13 subjects
- Students should show their programme

## Files Created

- `populate_railway_subjects.bat` - Populates subjects on Railway (Windows)
- `populate_railway_subjects.sh` - Populates subjects on Railway (Mac/Linux)
- `check_railway_database.bat` - Checks Railway database status
- `FIX_ZERO_SUBJECTS.md` - Detailed troubleshooting guide

## Next Steps

After fixing this issue:
1. Consider adding a data migration to automatically populate subjects on deployment
2. Add a check in the signup process to ensure programmes have subjects
3. Add better error handling in the dashboard when subjects are missing
