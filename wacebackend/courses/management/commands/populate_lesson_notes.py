"""
Django management command to populate lesson notes
Usage: python manage.py populate_lesson_notes
"""
from django.core.management.base import BaseCommand
from courses.models import Lesson


class Command(BaseCommand):
    help = 'Populate lesson notes for all lessons'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write(self.style.SUCCESS("POPULATING LESSON NOTES"))
        self.stdout.write("=" * 70)
        
        # Notes templates
        english_notes = """# Key Points to Remember

## Grammar Fundamentals
- Parts of speech: nouns, verbs, adjectives, adverbs
- Sentence structure: subject, predicate, object
- Tenses: past, present, future (simple, continuous, perfect)

## Writing Skills
- Essay structure: introduction, body paragraphs, conclusion
- Paragraph development: topic sentence, supporting details
- Transition words: however, therefore, moreover

## Reading Comprehension
- Identify main ideas and supporting details
- Understand author's purpose and tone
- Make inferences from context clues

## Practice Tips
1. Read widely - newspapers, novels, academic texts
2. Practice writing daily
3. Review grammar rules regularly
4. Build your vocabulary systematically
"""

        math_notes = """# Important Concepts

## Key Formulas
- Quadratic formula: x = (-b ± √(b²-4ac)) / 2a
- Area of circle: πr²
- Pythagoras: a² + b² = c²
- Distance: d = √[(x₂-x₁)² + (y₂-y₁)²]

## Algebraic Expressions
- Simplifying expressions
- Factorization techniques
- Solving equations

## Study Tips
- Practice problems daily
- Understand concepts, don't just memorize
- Show all working in exams
- Check your answers
"""

        science_notes = """# Scientific Concepts

## Key Principles
- Observation and experimentation
- Scientific method
- Measurement and units
- Data analysis

## Study Strategies
1. Understand before memorizing
2. Practice drawing diagrams
3. Learn scientific terminology
4. Connect theory to real-world examples

## Exam Tips
- Define terms clearly
- Use scientific vocabulary
- Draw labeled diagrams
- Show calculations
"""

        general_notes = """# Lesson Overview

## Learning Objectives
By the end of this lesson, you should be able to:
- Understand the key concepts presented
- Apply knowledge to practical situations
- Solve related problems independently

## Study Strategies
1. Take notes while watching the video
2. Pause and replay difficult sections
3. Complete practice exercises
4. Review regularly

## Additional Resources
- Refer to your textbook for more examples
- Practice past questions on this topic
- Join study groups for discussion
"""

        # Process lessons
        lessons = Lesson.objects.all()
        total = lessons.count()
        updated = 0
        skipped = 0
        
        self.stdout.write(f"\nFound {total} lessons\n")
        self.stdout.write("Processing...\n")
        
        for i, lesson in enumerate(lessons, 1):
            # Skip if already has notes
            if lesson.notes:
                skipped += 1
                continue
            
            subject_name = lesson.topic.subject.name
            
            # Choose appropriate notes
            if 'English' in subject_name or 'Literature' in subject_name:
                base_notes = english_notes
            elif 'Math' in subject_name:
                base_notes = math_notes
            elif 'Science' in subject_name or 'Physics' in subject_name or 'Chemistry' in subject_name or 'Biology' in subject_name:
                base_notes = science_notes
            else:
                base_notes = general_notes
            
            # Customize with lesson info
            lesson.notes = f"""# {lesson.title}

{base_notes}

---

## About This Lesson
- **Subject:** {subject_name}
- **Topic:** {lesson.topic.title}
- **Duration:** {lesson.video_duration_minutes or 15} minutes
- **Type:** {lesson.get_lesson_type_display()}

---

*These notes supplement the video content. Watch the video for complete understanding.*
"""
            
            lesson.save()
            updated += 1
            
            # Progress indicator
            if i % 10 == 0:
                self.stdout.write(f"  Processed {i}/{total} lessons...")
        
        # Summary
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS("SUMMARY"))
        self.stdout.write("=" * 70)
        self.stdout.write(f"Total lessons: {total}")
        self.stdout.write(self.style.SUCCESS(f"Updated: {updated}"))
        self.stdout.write(f"Skipped (already had notes): {skipped}")
        self.stdout.write("=" * 70)
        self.stdout.write(self.style.SUCCESS("\n✓ Done! All lessons now have notes."))
        self.stdout.write("\nYou can now see lesson notes on the topic pages!\n")
