# 🐘 Railway PostgreSQL Database Setup

## Step 1: Add PostgreSQL Service

1. **In your Railway project dashboard:**
   - Click "New Service"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create a PostgreSQL instance

2. **Database will be automatically configured with:**
   - `DATABASE_URL` environment variable
   - Connection details (host, port, user, password, database name)

## Step 2: Environment Variables

Railway automatically provides these variables when you add PostgreSQL:

```bash
# Automatically provided by Railway PostgreSQL service
DATABASE_URL=postgresql://user:password@host:port/database
PGHOST=host
PGPORT=5432
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=railway
```

## Step 3: Connect Services

1. **Link Database to Your App:**
   - In Railway dashboard, go to your Django service
   - Click "Variables" tab
   - You should see `DATABASE_URL` automatically available
   - If not, click "New Variable" → "Reference" → Select your PostgreSQL service → `DATABASE_URL`

## Step 4: Verify Database Connection

Your Django app will automatically use the `DATABASE_URL` because of this code in `settings_production.py`:

```python
# Railway provides DATABASE_URL automatically for PostgreSQL
if 'DATABASE_URL' in os.environ:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }
```

## Step 5: Run Migrations

After deployment, run migrations to create your database tables:

### Option 1: Railway CLI
```bash
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

### Option 2: Railway Dashboard
1. Go to your Django service
2. Click "Deploy" → "View Logs"
3. Use the web terminal feature
4. Run: `python manage.py migrate`

## Step 6: Test Database Connection

Test your database connection:

```bash
# Test database connection
railway run python manage.py dbshell

# Check migrations
railway run python manage.py showmigrations

# Create test data
railway run python manage.py shell
```

## Troubleshooting Database Issues

### Common Problems:

**1. DATABASE_URL not found**
```bash
# Check if PostgreSQL service is running
railway status

# Verify environment variables
railway variables
```

**2. Connection refused**
```bash
# Ensure PostgreSQL service is healthy
# Check Railway dashboard for service status
```

**3. Migration errors**
```bash
# Reset migrations if needed (CAREFUL - this deletes data)
railway run python manage.py migrate --fake-initial

# Or run specific app migrations
railway run python manage.py migrate courses
railway run python manage.py migrate students
```

## Database Management

### Backup Database
```bash
# Create database backup
railway run pg_dump $DATABASE_URL > backup.sql

# Restore from backup
railway run psql $DATABASE_URL < backup.sql
```

### Access Database Directly
```bash
# Connect to PostgreSQL directly
railway run psql $DATABASE_URL

# Or use Railway's web interface
# Go to PostgreSQL service → "Data" tab
```

## Production Best Practices

1. **Regular Backups**: Railway provides automatic backups
2. **Connection Pooling**: Consider using connection pooling for high traffic
3. **Monitoring**: Monitor database performance in Railway dashboard
4. **Migrations**: Always test migrations in staging first

## Environment Variables Summary

Set these in your Railway Django service:

```bash
# Required
DEBUG=False
SECRET_KEY=your-super-secret-key-here
DJANGO_SETTINGS_MODULE=wace_api.settings_production

# Database (automatically provided by PostgreSQL service)
DATABASE_URL=${{ Postgres.DATABASE_URL }}

# Optional
FRONTEND_URL=https://wacefront.vercel.app
USE_HTTPS=False
RAILWAY_ENVIRONMENT=production
```

## Next Steps

1. ✅ Add PostgreSQL service to Railway project
2. ✅ Verify `DATABASE_URL` is available in your Django service
3. ✅ Deploy your Django app
4. ✅ Run migrations: `railway run python manage.py migrate`
5. ✅ Create superuser: `railway run python manage.py createsuperuser`
6. ✅ Test API endpoints

Your Django app should now connect to PostgreSQL automatically! 🎉