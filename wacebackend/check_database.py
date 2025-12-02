#!/usr/bin/env python
"""
Script to check database connection and setup
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line

def check_database():
    """Check database connection and status"""
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print("✅ Database connection successful!")
            print(f"Database engine: {connection.settings_dict['ENGINE']}")
            print(f"Database name: {connection.settings_dict['NAME']}")
            
        # Check if migrations are needed
        from django.core.management.commands.migrate import Command
        print("\n📋 Checking migrations...")
        
        # Show migration status
        execute_from_command_line(['manage.py', 'showmigrations'])
        
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n🔧 Troubleshooting:")
        print("1. Ensure PostgreSQL service is running in Railway")
        print("2. Check DATABASE_URL environment variable")
        print("3. Verify database credentials")
        return False

def setup_database():
    """Run initial database setup"""
    try:
        print("\n🔄 Running database migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        print("\n📊 Creating initial data...")
        # You can add initial data creation here
        
        print("✅ Database setup complete!")
        return True
        
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        return False

if __name__ == "__main__":
    print("🐘 Railway PostgreSQL Database Check")
    print("=" * 40)
    
    # Check environment
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        print(f"✅ DATABASE_URL found: {database_url[:50]}...")
    else:
        print("❌ DATABASE_URL not found!")
        print("Make sure PostgreSQL service is added to Railway project")
        sys.exit(1)
    
    # Check database connection
    if check_database():
        print("\n🎉 Database is ready!")
    else:
        print("\n🔧 Setting up database...")
        if setup_database():
            print("\n🎉 Database setup successful!")
        else:
            print("\n❌ Database setup failed!")
            sys.exit(1)