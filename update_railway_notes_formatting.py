"""
Update lesson notes with markdown formatting on Railway database
Run this on Railway to update all lesson notes with rich formatting
"""
import os
import sys
import django

# Add the wacebackend directory to the path
script_dir = os.path.dirname(os.path.abspath(__file__))
wacebackend_dir = os.path.join(script_dir, 'wacebackend')
sys.path.insert(0, wacebackend_dir)

# Change to wacebackend directory
os.chdir(wacebackend_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from courses.models import Lesson

# Sample notes templates with rich markdown formatting
ENGLISH_NOTES = """## 📚 Key Points to Remember

### Grammar Fundamentals
- **Parts of speech:** nouns, verbs, adjectives, adverbs
- **Sentence structure:** subject, predicate, object
- **Tenses:** past, present, future (*simple, continuous, perfect*)

### Writing Skills
- **Essay structure:** introduction, body paragraphs, conclusion
- **Paragraph development:** topic sentence, supporting details, concluding sentence
- **Transition words:** *however, therefore, moreover, consequently*

### Reading Comprehension
- Identify **main ideas** and supporting details
- Understand author's *purpose* and *tone*
- Make inferences from context clues
- Analyze literary devices

### 💡 Practice Tips
1. **Read widely** - newspapers, novels, academic texts
2. **Practice writing daily** to improve your skills
3. **Review grammar rules** regularly
4. **Build your vocabulary** systematically

> **Exam Strategy:** Read questions carefully, plan your essays, manage time effectively, and always proofread!
"""

MATH_NOTES = """## 🔢 Important Concepts

### Key Formulas
- **Quadratic formula:** `x = (-b ± √(b²-4ac)) / 2a`
- **Area of circle:** `πr²`
- **Pythagoras theorem:** `a² + b² = c²`
- **Distance formula:** `d = √[(x₂-x₁)² + (y₂-y₁)²]`

### Algebraic Expressions
- Simplifying expressions
- **Factorization** techniques
- Solving *linear* and *quadratic* equations
- Working with **polynomials**

### Geometry & Trigonometry
- Properties of shapes and angles
- **Pythagoras theorem** applications
- Basic ratios: *sin, cos, tan*
- Area, perimeter, volume calculations

### 💡 Study Tips
1. **Practice problems daily** - consistency is key
2. **Understand concepts**, don't just memorize formulas
3. **Show all working** in exams for partial credit
4. **Check your answers** by substituting back
5. **Review mistakes** to learn from them

> **Common Mistakes to Avoid:** Forgetting to simplify, sign errors, not showing working steps, rushing through problems
"""

SCIENCE_NOTES = """## 🔬 Scientific Concepts

### Key Principles
- **Observation** and experimentation
- **Scientific method:** hypothesis → test → analyze → conclude
- **Measurement** and units (SI units)
- **Data collection** and analysis

### Important Topics
- **Matter** and its properties (*solid, liquid, gas*)
- **Energy** and its forms (*kinetic, potential, thermal*)
- **Forces** and motion
- **Chemical reactions** and equations
- **Living systems** and biological processes

### Laboratory Skills
- Safe handling of equipment
- **Accurate measurements** and recordings
- Recording **observations** systematically
- Drawing **conclusions** from data

### 💡 Study Strategies
1. **Understand concepts** before memorizing facts
2. **Practice drawing diagrams** and labeling them
3. **Learn scientific terminology** and definitions
4. **Connect theory** to real-world examples
5. **Review practical experiments** and their results

> **Exam Tips:** Define terms clearly, use scientific vocabulary, draw labeled diagrams, show calculations step by step
"""

GENERAL_NOTES = """## 📖 Lesson Overview

### Learning Objectives
By the end of this lesson, you should be able to:
- ✅ **Understand** the key concepts presented
- ✅ **Apply** the knowledge to practical situations
- ✅ **Solve** related problems independently
- ✅ **Explain** concepts in your own words

### Important Points
- Pay attention to **definitions** and terminology
- Note **examples** and how they illustrate concepts
- Practice with **exercises** to reinforce learning
- **Review regularly** to retain information

### 💡 Study Strategies
1. **Take notes** while watching the video
2. **Pause and replay** difficult sections
3. **Complete practice exercises** after each lesson
4. **Ask questions** if anything is unclear
5. **Review notes** before exams
6. **Form study groups** for discussion

### Additional Resources
- 📚 Refer to your **textbook** for more examples
- 📝 Practice **past questions** on this topic
- 👥 Join **study groups** for discussion
- 👨‍🏫 Consult your **teacher** for clarification
- 🌐 Use **online resources** for extra practice

### ⏰ Time Management
- Set aside **regular study time** each day
- Break topics into **manageable chunks**
- Review **previous lessons** regularly
- Don't cram - **study consistently**
- Take **breaks** to avoid burnout

> **Exam Preparation:** Start revision early, create summary notes, practice past questions, time yourself during practice, and get adequate rest before exams
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

def update_notes():
    """Update notes for all lessons with markdown formatting"""
    print("=" * 70)
    print("UPDATING LESSON NOTES WITH MARKDOWN FORMATTING ON RAILWAY")
    print("=" * 70)
    
    lessons = Lesson.objects.all()
    total = lessons.count()
    updated = 0
    
    print(f"\nFound {total} lessons")
    print("\nUpdating with formatted notes...")
    
    for i, lesson in enumerate(lessons, 1):
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

*These notes supplement the video content. Watch the video for complete understanding.*
"""
        
        lesson.save()
        updated += 1
        
        # Progress indicator
        if i % 10 == 0:
            print(f"  Updated {i}/{total} lessons...")
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total lessons: {total}")
    print(f"Updated: {updated}")
    print("=" * 70)
    print("\n✓ Done! All lesson notes updated with markdown formatting.")
    print("\nThe notes now include bold, italic, emojis, and better structure!")

if __name__ == '__main__':
    try:
        update_notes()
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\nMake sure you're connected to the Railway database.")
        import traceback
        traceback.print_exc()
