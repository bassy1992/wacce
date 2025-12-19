import os
import sys
import django
from datetime import timedelta

# Add the wacebackend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.utils import timezone
from courses.models import Announcement

# Create sample announcements
announcements = [
    {
        'title': 'New WASSCE Past Questions Added',
        'message': '2023 past questions now available in your study materials',
        'priority': 'high',
        'created_at': timezone.now() - timedelta(days=1)
    },
    {
        'title': 'Mock Exam Schedule Released',
        'message': 'Check your calendar for upcoming mock examination dates',
        'priority': 'normal',
        'created_at': timezone.now() - timedelta(days=3)
    },
]

for announcement_data in announcements:
    created_at = announcement_data.pop('created_at')
    announcement, created = Announcement.objects.get_or_create(
        title=announcement_data['title'],
        defaults=announcement_data
    )
    if created:
        # Update created_at manually
        announcement.created_at = created_at
        announcement.save()
        print(f"✓ Created: {announcement.title}")
    else:
        print(f"- Already exists: {announcement.title}")

print(f"\nTotal announcements: {Announcement.objects.count()}")
