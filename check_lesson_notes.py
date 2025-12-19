import os
import sys
import django

# Add the wacebackend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from courses.models import Lesson, Subject

# Check if lessons have notes
print("Checking Lesson Notes")
print("=" * 60)

# Get English Language subject
try:
    english = Subject.objects.get(name='English Language')
    print(f"Subject: {english.name}")
    print(f"Topics: {english.topics.count()}")
    
    # Get first topic
    first_topic = english.topics.first()
    if first_topic:
        print(f"\nFirst Topic: {first_topic.title}")
        print(f"Lessons: {first_topic.lessons.count()}")
        
        # Check first lesson
        first_lesson = first_topic.lessons.first()
        if first_lesson:
            print(f"\nFirst Lesson: {first_lesson.title}")
            print(f"Has notes: {bool(first_lesson.notes)}")
            print(f"Notes length: {len(first_lesson.notes)} characters")
            if first_lesson.notes:
                print(f"\nFirst 200 characters of notes:")
                print("-" * 60)
                print(first_lesson.notes[:200])
                print("-" * 60)
        else:
            print("No lessons found in first topic")
    else:
        print("No topics found for English Language")
        
except Subject.DoesNotExist:
    print("English Language subject not found")

# Check total lessons with notes
total_lessons = Lesson.objects.count()
lessons_with_notes = Lesson.objects.exclude(notes='').count()
print(f"\n{'='*60}")
print(f"Total lessons: {total_lessons}")
print(f"Lessons with notes: {lessons_with_notes}")
print(f"Percentage: {(lessons_with_notes/total_lessons*100):.1f}%")
print(f"{'='*60}")
