#!/usr/bin/env python3
"""
Update English language lessons with video URL
"""
import requests

# Railway backend URL
BASE_URL = "https://wacce-production.up.railway.app/api"

# Admin credentials
ADMIN_USERNAME = "railwayadmin"
ADMIN_PASSWORD = "Willfynn1992@"

# Video URL
VIDEO_URL = "https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4"

print("=" * 70)
print("UPDATING ENGLISH LESSONS WITH VIDEO URL")
print("=" * 70)

# Step 1: Get CSRF token
print("\n1. Getting CSRF token...")
session = requests.Session()
csrf_url = f"{BASE_URL}/auth/profile/"
response = session.get(csrf_url)
csrf_token = session.cookies.get('csrftoken', '')

# Step 2: Login as admin
print("\n2. Logging in as admin...")
login_url = f"{BASE_URL}/auth/signin/"
login_data = {
    "username": ADMIN_USERNAME,
    "password": ADMIN_PASSWORD
}

headers = {
    'X-CSRFToken': csrf_token,
    'Referer': BASE_URL
}

response = session.post(login_url, json=login_data, headers=headers)

if response.status_code == 200:
    print("✅ Login successful!")
else:
    print(f"❌ Login failed: {response.status_code}")
    exit(1)

# Update CSRF token
csrf_token = session.cookies.get('csrftoken', csrf_token)

print("\n3. Updating English lessons...")
print(f"   Video URL: {VIDEO_URL[:60]}...")

# We'll need to create a Django management command for this
# For now, let's create the command file

print("\n" + "=" * 70)
print("Creating Django management command...")
print("=" * 70)

command_content = '''"""
Django management command to update English lessons with video URL
Usage: python manage.py update_english_videos
"""
from django.core.management.base import BaseCommand
from courses.models import Subject, Lesson

VIDEO_URL = "https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4"

class Command(BaseCommand):
    help = 'Update English language lessons with video URL'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("UPDATING ENGLISH LESSONS WITH VIDEO URL")
        self.stdout.write("=" * 70)
        
        # Get English Language subject
        try:
            subject = Subject.objects.get(name="English Language")
        except Subject.DoesNotExist:
            self.stdout.write(self.style.ERROR("English Language subject not found"))
            return
        
        # Get all topics for English Language
        topics = subject.topics.all()
        
        total_updated = 0
        
        for topic in topics:
            self.stdout.write(f"\\n📚 Processing: {topic.title}")
            
            # Get all video lessons for this topic
            lessons = Lesson.objects.filter(topic=topic, lesson_type='video')
            
            for lesson in lessons:
                lesson.video_url = VIDEO_URL
                lesson.save()
                self.stdout.write(self.style.SUCCESS(f"  ✅ Updated: {lesson.title}"))
                total_updated += 1
        
        self.stdout.write("\\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS(f"✅ DONE! Updated {total_updated} lessons"))
        self.stdout.write("=" * 70)
'''

# Save the command
with open('wacebackend/students/management/commands/update_english_videos.py', 'w') as f:
    f.write(command_content)

print("✅ Command file created!")
print("\nNow run: git add, commit, push, then run the command on Railway")
