import os
import sys
import django

# Add the wacebackend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from courses.models import Lesson, Subject

# Sample notes for different subjects
sample_notes = {
    'English Language': """
# Key Points to Remember

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
""",
    'Mathematics': """
# Important Concepts

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

## Study Tips
- Practice problems daily
- Understand concepts, don't just memorize
- Show all working in exams
- Check your answers
""",
    'General': """
# Lesson Overview

## Learning Objectives
By the end of this lesson, you should be able to:
- Understand the key concepts presented
- Apply the knowledge to practical situations
- Solve related problems independently

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

## Additional Resources
- Refer to your textbook for more examples
- Practice past questions on this topic
- Join study groups for discussion
- Consult your teacher for clarification
"""
}

def add_notes_to_lessons():
    """Add sample notes to lessons that don't have notes yet"""
    
    lessons_updated = 0
    
    # Get all lessons without notes
    lessons = Lesson.objects.filter(notes='')
    
    print(f"Found {lessons.count()} lessons without notes")
    
    for lesson in lessons:
        subject_name = lesson.topic.subject.name
        
        # Choose appropriate notes based on subject
        if 'English' in subject_name:
            notes = sample_notes['English Language']
        elif 'Math' in subject_name:
            notes = sample_notes['Mathematics']
        else:
            notes = sample_notes['General']
        
        # Customize notes with lesson-specific information
        customized_notes = f"""# {lesson.title}

{notes}

## About This Lesson
This lesson is part of the **{lesson.topic.title}** topic in {subject_name}.

Duration: {lesson.video_duration_minutes or 15} minutes

---
*These notes are meant to supplement the video content. Make sure to watch the video for complete understanding.*
"""
        
        lesson.notes = customized_notes
        lesson.save()
        lessons_updated += 1
        
        print(f"✓ Added notes to: {subject_name} - {lesson.topic.title} - {lesson.title}")
    
    print(f"\n{'='*60}")
    print(f"Total lessons updated: {lessons_updated}")
    print(f"{'='*60}")

if __name__ == '__main__':
    print("Adding Sample Lesson Notes")
    print("=" * 60)
    add_notes_to_lessons()
