# How to Populate Lesson Notes on Railway

Since `railway run` doesn't work from your local machine (network restrictions), use one of these methods:

## Method 1: Railway Dashboard (Easiest)

1. Go to https://railway.app/dashboard
2. Select your project and the `wacce` service
3. Click the three dots menu (⋮) → "Run Command"
4. Enter this command:
   ```
   python wacebackend/manage.py populate_lesson_notes
   ```
5. Click "Run"

## Method 2: Via Django Shell in Railway

1. In Railway dashboard, click "Run Command"
2. Enter:
   ```
   python wacebackend/manage.py shell
   ```
3. Once in the shell, paste the contents of `wacebackend/populate_notes_via_admin.py`

## Method 3: SSH into Railway (if available)

If Railway provides SSH access:
```bash
railway ssh --service wacce
cd /app
python wacebackend/manage.py populate_lesson_notes
```

## Verification

After running, check your application to see if lesson notes appear on topic pages.

The command will show output like:
```
Found 207 lessons
Updated: X
Skipped: Y
```
