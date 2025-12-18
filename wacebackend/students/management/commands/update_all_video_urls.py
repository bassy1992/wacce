"""
Django management command to update ALL video lessons with video URLs
Usage: python manage.py update_all_video_urls
"""
from django.core.management.base import BaseCommand
from courses.models import Subject, Lesson

# Sample video URL - you can use different videos for different subjects
DEFAULT_VIDEO_URL = "https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4"

# Subject-specific video URLs (optional - customize as needed)
SUBJECT_VIDEO_URLS = {
    'English Language': "https://tailsandtrailsmedia.sfo3.cdn.digitaloceanspaces.com/videos/Confusing%20English%20Grammar_%20%E2%80%9CIS%E2%80%9D%20or%20%E2%80%9CARE%E2%80%9D_%20(1080p).mp4",
    'Mathematics (Core)': DEFAULT_VIDEO_URL,
    'Integrated Science': DEFAULT_VIDEO_URL,
    'Social Studies': DEFAULT_VIDEO_URL,
    'ICT/Computing': DEFAULT_VIDEO_URL,
    'Economics': DEFAULT_VIDEO_URL,
    'Geography': DEFAULT_VIDEO_URL,
    'History': DEFAULT_VIDEO_URL,
    'Elective Mathematics': DEFAULT_VIDEO_URL,
    'French': DEFAULT_VIDEO_URL,
    'Government': DEFAULT_VIDEO_URL,
    'Christian Religious Studies': DEFAULT_VIDEO_URL,
}


class Command(BaseCommand):
    help = 'Update ALL video lessons with video URLs across all subjects'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("UPDATING VIDEO URLs FOR ALL LESSONS")
        self.stdout.write("=" * 70)
        
        total_updated = 0
        total_skipped = 0
        
        # Get all subjects
        subjects = Subject.objects.all()
        
        for subject in subjects:
            self.stdout.write(f"\n📚 Processing: {subject.name}")
            
            # Get video URL for this subject
            video_url = SUBJECT_VIDEO_URLS.get(subject.name, DEFAULT_VIDEO_URL)
            
            # Get all video lessons for this subject
            video_lessons = Lesson.objects.filter(
                topic__subject=subject,
                lesson_type='video'
            )
            
            if not video_lessons.exists():
                self.stdout.write(f"  ⚠️  No video lessons found")
                continue
            
            updated_count = 0
            for lesson in video_lessons:
                if not lesson.video_url:  # Only update if empty
                    lesson.video_url = video_url
                    lesson.save()
                    updated_count += 1
                    total_updated += 1
                else:
                    total_skipped += 1
            
            if updated_count > 0:
                self.stdout.write(f"  ✅ Updated {updated_count} video lessons")
            else:
                self.stdout.write(f"  ℹ️  All video lessons already have URLs")
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write("✅ VIDEO URL UPDATE COMPLETE")
        self.stdout.write("=" * 70)
        self.stdout.write(f"\n📊 Summary:")
        self.stdout.write(f"  • Lessons updated: {total_updated}")
        self.stdout.write(f"  • Lessons skipped (already have URLs): {total_skipped}")
        self.stdout.write(f"  • Total subjects processed: {subjects.count()}")
        self.stdout.write("")
