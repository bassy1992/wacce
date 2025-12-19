"""
Django management command to update lesson notes with markdown formatting
Usage: python manage.py update_lesson_notes_formatting
"""
from django.core.management.base import BaseCommand
from courses.models import Lesson


class Command(BaseCommand):
    help = 'Update lesson notes with rich markdown formatting'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write(self.style.SUCCESS("UPDATING LESSON NOTES WITH MARKDOWN FORMATTING"))
        self.stdout.write("=" * 70)
        
        # Notes templates with rich markdown formatting
        english_notes = """## 📚 Key Points to Remember

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

        math_notes = """## 🔢 Important Concepts

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

        science_notes = """## 🔬 Scientific Concepts

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

        general_notes = """## 📖 Lesson Overview

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

        # Process lessons
        lessons = Lesson.objects.all()
        total = lessons.count()
        updated = 0
        
        self.stdout.write(f"\nFound {total} lessons\n")
        self.stdout.write("Updating with formatted notes...\n")
        
        for i, lesson in enumerate(lessons, 1):
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
                self.stdout.write(f"  Updated {i}/{total} lessons...")
        
        # Summary
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS("SUMMARY"))
        self.stdout.write("=" * 70)
        self.stdout.write(f"Total lessons: {total}")
        self.stdout.write(self.style.SUCCESS(f"Updated: {updated}"))
        self.stdout.write("=" * 70)
        self.stdout.write(self.style.SUCCESS("\n✓ Done! All lesson notes updated with markdown formatting."))
        self.stdout.write("\nThe notes now include bold, italic, emojis, and better structure!\n")
