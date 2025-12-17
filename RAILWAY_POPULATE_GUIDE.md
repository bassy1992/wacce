# How to Populate Subjects on Railway (Simple Method)

## The Problem
Dashboard shows "0 Subjects" because the Railway database is empty.

## Solution: Use Railway's Web Interface

### Method 1: Railway Dashboard (Easiest)

1. **Go to Railway Dashboard**
   - Visit: https://railway.app/
   - Login with your account
   - Select your project

2. **Open your service**
   - Click on your backend service (wacebackend)

3. **Go to Settings**
   - Click on the "Settings" tab

4. **Run One-Off Command**
   - Scroll down to find the command execution section
   - Or go to the "Deployments" tab and click "Run Command"

5. **Execute this command**:
   ```bash
   python wacebackend/manage.py populate_subjects
   ```

6. **Wait for completion**
   - You'll see output showing subjects being created
   - Should take 10-30 seconds

7. **Verify**
   - Refresh your dashboard
   - You should now see subjects!

### Method 2: Via Railway CLI (Alternative)

If the web interface doesn't work, try this:

```bash
# Make sure you're in the project directory
cd C:\Users\User\Desktop\projects\wace-full

# Link to your Railway project (if not already linked)
railway link

# Run the management command
railway run --service wacebackend python wacebackend/manage.py populate_subjects
```

### Method 3: Django Admin (Manual)

If both methods above fail:

1. Go to: `https://your-railway-app.railway.app/admin/`
2. Login with admin credentials
3. Follow the steps in `populate_via_admin.md`

## What Gets Created

After running the command, you'll have:

### Core Subjects (5):
- English Language
- Mathematics (Core)
- Integrated Science
- Social Studies
- ICT/Computing

### General Arts Electives (8):
- Economics
- Geography
- History
- Elective Mathematics
- Literature-in-English
- French
- Government
- Christian Religious Studies

**Total for General Arts: 13 subjects**

## Verify It Worked

1. **Check via Railway CLI**:
   ```bash
   railway run --service wacebackend python wacebackend/manage.py shell -c "from courses.models import Subject; print(f'Total Subjects: {Subject.objects.count()}')"
   ```

2. **Check the Dashboard**:
   - Login as William Yarquah
   - Dashboard should show "13 Subjects" instead of "0 Subjects"

3. **Check via API**:
   - Visit: `https://your-railway-app.railway.app/api/students/dashboard/`
   - You should see subjects in the JSON response

## Troubleshooting

### "Command not found"
- Make sure you're running the command in the Railway dashboard, not locally
- Or use `railway run --service wacebackend` prefix

### "No such table: courses_subject"
- Run migrations first:
  ```bash
  railway run --service wacebackend python wacebackend/manage.py migrate
  ```

### "Programme matching query does not exist"
- Create programmes first via Django admin
- Or run the initial data loading script

### Still showing 0 subjects
- Clear browser cache
- Check browser console (F12) for errors
- Verify the API endpoint is returning data
- Check that the student has a programme assigned

## Files Created

I've created these files to help:

1. `wacebackend/students/management/commands/populate_subjects.py` - Django management command
2. `populate_via_admin.md` - Manual steps via Django admin
3. `RAILWAY_POPULATE_GUIDE.md` - This guide

## Next Steps

After populating subjects:
1. Test the dashboard - should show all subjects
2. Create some topics for subjects (optional)
3. Add lessons to topics (optional)
4. Consider automating this in your deployment process
