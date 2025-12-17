# Populate Subjects via API (No Railway Web Interface Needed!)

## Quick Solution

Since you can't use the Railway web interface, we'll use an API endpoint instead.

### Step 1: Deploy the Changes

First, commit and push the new code to Railway:

```bash
git add .
git commit -m "Add populate subjects API endpoint"
git push
```

Wait for Railway to deploy (usually 1-2 minutes).

### Step 2: Run the Populate Script

```bash
python populate_via_api.py
```

The script will ask for:
1. Your Railway app URL (e.g., `https://your-app.railway.app`)
2. Admin username
3. Admin password

Then it will automatically populate all subjects!

### Alternative: Use cURL or Postman

If you prefer, you can call the API directly:

#### 1. Login first:
```bash
curl -X POST https://your-app.railway.app/api/auth/signin/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}' \
  -c cookies.txt
```

#### 2. Call populate endpoint:
```bash
curl -X POST https://your-app.railway.app/api/students/populate-subjects/ \
  -b cookies.txt
```

### What Gets Created

- 5 Core subjects (English, Math, Science, Social Studies, ICT)
- 8 General Arts electives
- Programme-subject links
- **Total: 13 subjects for General Arts**

### Verify It Worked

1. Refresh the dashboard
2. Should now show "13 Subjects" instead of "0 Subjects"

### Troubleshooting

**Q: "Admin credentials required"**
A: Make sure you're using an admin account. Create one if needed:
```bash
railway run --service wacce python wacebackend/manage.py createsuperuser
```

**Q: "Module not found: requests"**
A: Install it:
```bash
pip install requests
```

**Q: "Connection error"**
A: Check your Railway URL is correct and the app is running

**Q: "Still showing 0 subjects"**
A: Clear browser cache and refresh, or check browser console (F12) for errors

## Files Changed

1. `wacebackend/students/views.py` - Added `populate_subjects_api` endpoint
2. `wacebackend/students/urls.py` - Added URL route
3. `populate_via_api.py` - Python script to call the API

## Next Steps

After populating:
1. Test the dashboard - should show all subjects
2. Students can now see their subjects
3. You can start adding topics and lessons
