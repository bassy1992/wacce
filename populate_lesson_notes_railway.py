"""
Populate lesson notes on Railway database
Run this script to add notes to all lessons
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from courses.models import Lesson

# Sample notes templates
ENGLISH_NOTES = """# Key Points to Remember

## Grammar Fundamentals
- Parts of speech: nouns, verbs, adjectives, adverbs
- Sentence structure: subject, predicate, object
- Tenses: past, present, future (simple, continuous, perfect)

## Writing Skills
- Essay structure: introduction, body paragraphs, conclusion
- Paragraph development: topic sentence, supporting details, concluding sentence
- Transition words: however, therefore, moreover, consequently

## Reading Comprehension
- Identify main ideas and supporting details
- Understand author's purpose and tone
- Make inferences from context clues
- Analyze literary devices

## Practice Tips
1. Read widely - newspapers, novels, academic texts
2. Practice writing daily
3. Review grammar rules regularly
4. Build your vocabulary systematically

## Exam Strategy
- Read questions carefully before answering
- Plan your essays before writing
- Manage your time effectively
- Proofread your work
"""

MATH_NOTES = """# Important Concepts

## Algebraic Expressions
- Simplifying expressions
- Factorization techniques
- Solving linear equations
- Quadratic equations and formulas

## Geometry
- Properties of shapes and angles
- Pythagoras theorem
- Area and perimeter calculations
- Volume and surface area

## Trigonometry
- Basic ratios: sin, cos, tan
- Trigonometric identities
- Solving triangles
- Applications in real-world problems

## Key Formulas
- Quadratic formula: x = (-b ± √(b²-4ac)) / 2a
- Area of circle: πr²
- Pythagoras: a² + b² = c²
- Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]

## Study Tips
- Practice problems daily
- Understand concepts, don't just memorize
- Show all working in exams
- Check your answers
- Review mistakes to learn from them

## Common Mistakes to Avoid
- Forgetting to simplify final answers
- Sign errors in calculations
- Not showing working steps
- Rushing through problems
"""

SCIENCE_NOTES = """# Scientific Concepts

## Key Principles
- Observation and experimentation
- Scientific method: hypothesis, test, analyze, conclude
- Measurement and units
- Data collection and analysis

## Important Topics
- Matter and its properties
- Energy and its forms
- Forces and motion
- Chemical reactions
- Living systems

## Laboratory Skills
- Safe handling of equipment
- Accurate measurements
- Recording observations
- Drawing conclusions from data

## Study Strategies
1. Understand concepts before memorizing
2. Practice drawing diagrams
3. Learn scientific terminology
4. Connect theory to real-world examples
5. Review practical experiments

## Exam Tips
- Define terms clearly
- Use scientific vocabulary
- Draw labeled diagrams
- Show calculations step by step
- Relate answers to the question
"""

GENERAL_NOTES = """# Lesson Overview

## Learning Objectives
By the end of this lesson, you should be able to:
- Understand the key concepts presented
- Apply the knowledge to practical situations
- Solve related problems independently
- Explain concepts in your own words

## Important Points
- Pay attention to definitions and terminology
- Note examples and how they illustrate concepts
- Practice with exercises to reinforce learning
- Review regularly to retain information

## Study Strategies
1. Take notes while watching the video
2. Pause and replay difficult sections
3. Complete practice exercises
4. Ask questions if anything is unclear
5. Review notes before exams
6. Form study groups for discussion

## Additional Resources
- Refer to your textbook for more examples
- Practice past questions on this topic
- Join study groups for discussion
- Consult your teacher for clarification
- Use online resources for extra practice

## Time Management
- Set aside regular study time
- Break topics into manageable chunks
- Review previous lessons regularly
- Don't cram - study consistently
- Take breaks to avoid burnout

## Exam Preparation
- Start revision early
- Create summary notes
- Practice past questions
- Time yourself during practice
- Get adequate rest before exams
"""

def get_notes_for_subject(subject_name):
    """Return appropriate notes based on subject"""
    if 'English' in subject_name or 'Literature' in subject_name:
        return ENGLISH_NOTES
    elif 'Math' in subject_name:
        return MATH_NOTES
    elif 'Science' in subject_name or 'Physics' in subject_name or 'Chemistry' in subject_name or 'Biology' in subject_name:
        return SCIENCE_NOTES
    else:
        return GENERAL_NOTES

def populate_notes():
    """Add notes to all lessons"""
    print("=" * 70)
    print("POPULATING LESSON NOTES ON RAILWAY")
    print("=" * 70)
    
    lessons = Lesson.objects.all()
    total = lessons.count()
    updated = 0
    skipped = 0
    
    print(f"\nFound {total} lessons")
    print("\nProcessing...")
    
    for i, lesson in enumerate(lessons, 1):
        # Skip if already has notes
        if lesson.notes:
            skipped += 1
            continue
        
        subject_name = lesson.topic.subject.name
        base_notes = get_notes_for_subject(subject_name)
        
        # Customize notes with lesson-specific information
        lesson.notes = f"""# {lesson.title}

{base_notes}

---

## About This Lesson
- **Subject:** {subject_name}
- **Topic:** {lesson.topic.title}
- **Duration:** {lesson.video_duration_minutes or 15} minutes
- **Type:** {lesson.get_lesson_type_display()}

---

*These notes are meant to supplement the video content. Make sure to watch the video for complete understanding.*
"""
        
        lesson.save()
        updated += 1
        
        # Progress indicator
        if i % 10 == 0:
            print(f"  Processed {i}/{total} lessons...")
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total lessons: {total}")
    print(f"Updated: {updated}")
    print(f"Skipped (already had notes): {skipped}")
    print("=" * 70)
    print("\n✓ Done! All lessons now have notes.")
    print("\nYou can now see lesson notes on the topic pages!")

if __name__ == '__main__':
    try:
        populate_notes()
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\nMake sure you're connected to the Railway database.")
        import traceback
        traceback.print_exc()
