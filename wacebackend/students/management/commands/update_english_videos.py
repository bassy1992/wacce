"""
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
            self.stdout.write(f"\nProcessing: {topic.title}")
            
            # Get all video lessons for this topic
            lessons = Lesson.objects.filter(topic=topic, lesson_type='video')
            
            for lesson in lessons:
                lesson.video_url = VIDEO_URL
                lesson.save()
                self.stdout.write(self.style.SUCCESS(f"  Updated: {lesson.title}"))
                total_updated += 1
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS(f"DONE! Updated {total_updated} lessons"))
        self.stdout.write("=" * 70)
