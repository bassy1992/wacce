"""
Quick script to populate lesson notes
Run this on Railway: railway run python quick_populate_notes.py
Or in Railway shell: python quick_populate_notes.py
"""
import os
import sys

# Setup Django
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))
os.chdir(os.path.join(os.path.dirname(__file__), 'wacebackend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')

import django
django.setup()

from courses.models import Lesson

print("=" * 60)
print("POPULATING LESSON NOTES")
print("=" * 60)

notes_template = """# Key Learning Points

## Important Concepts
- Main ideas and principles covered in this lesson
- Key terminology and definitions
- Practical applications

## Study Strategies
1. Watch the video carefully and take notes
2. Pause and replay difficult sections
3. Practice with exercises
4. Review regularly before exams

## Exam Tips
- Understand concepts, don't just memorize
- Practice past questions
- Manage your time effectively
- Show all working in calculations
"""

try:
    lessons = Lesson.objects.all()
    total = lessons.count()
    updated = 0
    
    print(f"\nFound {total} lessons")
    print("Processing...\n")
    
    for i, lesson in enumerate(lessons, 1):
        if not lesson.notes:
            lesson.notes = f"""# {lesson.title}

{notes_template}

---
**Subject:** {lesson.topic.subject.name}
**Topic:** {lesson.topic.title}
**Duration:** {lesson.video_duration_minutes or 15} minutes
---
"""
            lesson.save()
            updated += 1
            
            if i % 20 == 0:
                print(f"  {i}/{total} processed...")
    
    print("\n" + "=" * 60)
    print(f"✓ SUCCESS!")
    print(f"Updated {updated} lessons")
    print(f"Skipped {total - updated} (already had notes)")
    print("=" * 60)
    print("\nNotes are now live on your website! 🎉")
    
except Exception as e:
    print(f"\n✗ ERROR: {e}")
    import traceback
    traceback.print_exc()
