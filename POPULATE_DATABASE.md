# 📊 Populate Railway Database

Your Railway database is empty and needs initial data (programmes). Here's how to populate it:

## Option 1: Via Railway Dashboard (Easiest)

1. Go to https://railway.app/dashboard
2. Open your project: **dynamic-harmony**
3. Click on your **wacce** service
4. Click **Settings** tab
5. Scroll down to **Service Settings**
6. Click **One-Click Deploy** or go to **Deployments**
7. Once deployed, click on the deployment
8. Click **View Logs**
9. In the logs view, there's usually a **Shell** or **Terminal** button
10. Run this command:
    ```bash
    python manage.py load_programmes
    ```

## Option 2: Via Railway CLI with Public URL

Since the internal database URL doesn't work from your local machine, we need to use a workaround:

1. **Temporarily set DATABASE_URL to use public URL:**
   ```bash
   railway variables --set "DATABASE_URL=postgresql://postgres:UisPBdeTEAChdrXLDyAQyqWYQhSzsjUO@shuttle.proxy.rlwy.net:40249/railway"
   ```

2. **Wait for redeploy (30 seconds)**

3. **Run the command:**
   ```bash
   cd wacebackend
   railway run python manage.py load_programmes
   ```

4. **Restore internal DATABASE_URL:**
   ```bash
   railway variables --set "DATABASE_URL=postgresql://postgres:UisPBdeTEAChdrXLDyAQyqWYQhSzsjUO@postgres.railway.internal:5432/railway"
   ```

## Option 3: Add to Startup Script (Automatic)

Add this to your `start.sh` to automatically load data on deployment:

```bash
# Load initial data if database is empty
python manage.py load_programmes
```

This will run every time the app starts, but the command is idempotent (won't create duplicates).

## What Gets Created

The command creates:

### 6 Programmes:
1. Science Programme (GHS 500/year)
2. Business Programme (GHS 500/year)
3. General Arts Programme (GHS 500/year)
4. Visual Arts Programme (GHS 500/year)
5. Home Economics Programme (GHS 500/year)
6. Agriculture Programme (GHS 500/year)

### 4 Core Subjects:
1. English Language
2. Mathematics (Core)
3. Integrated Science
4. Social Studies

## Verify It Worked

After running the command, test your signup page:
1. Go to https://wacefront.vercel.app/signup
2. The Programme dropdown should now show all 6 programmes
3. Try creating an account!

## Troubleshooting

**Command not found?**
- Make sure the latest code is deployed to Railway
- Check that the file exists: `wacebackend/students/management/commands/load_programmes.py`

**Database connection error?**
- Verify DATABASE_URL is set correctly in Railway variables
- Check that PostgreSQL service is running

**Already exists messages?**
- This is normal! The command won't create duplicates
- It means the data is already in the database

---

**Quick Command:**
```bash
railway run python manage.py load_programmes
```
