# Quick Fix: Dashboard Shows "0 Subjects"

## The Issue
William Yarquah's dashboard shows "0 Subjects" but should show 13 subjects for General Arts.

## The Fix (Choose ONE method)

### ⭐ EASIEST: Railway Web Dashboard

1. Go to https://railway.app/
2. Open your project → Select your backend service
3. Click "Settings" or "Deployments"
4. Find "Run Command" or "One-Off Command"
5. Run this:
   ```
   python wacebackend/manage.py populate_subjects
   ```
6. Wait 30 seconds
7. Refresh dashboard - should now show 13 subjects!

### 🔧 ALTERNATIVE: Railway CLI

Open PowerShell in your project folder and run:

```powershell
railway run --service wacebackend python wacebackend/manage.py populate_subjects
```

### 📝 MANUAL: Django Admin

1. Go to your Railway app admin: `https://your-app.railway.app/admin/`
2. Create subjects manually (see `populate_via_admin.md`)

## That's It!

After running the command, the dashboard will show:
- ✅ 5 core subjects
- ✅ 8 elective subjects  
- ✅ Total: 13 subjects for General Arts

## Need Help?

Check these files:
- `RAILWAY_POPULATE_GUIDE.md` - Detailed instructions
- `populate_via_admin.md` - Manual creation steps
- `FIX_ZERO_SUBJECTS.md` - Troubleshooting guide
