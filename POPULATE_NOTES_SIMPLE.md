# Simple Way to Populate Lesson Notes on Railway

## The Problem
`railway run` tries to run locally with Railway variables, but can't connect to the database.

## The Solution
Run the script directly on Railway's server using their shell.

## Step-by-Step Instructions

### Method 1: Using Railway Dashboard (Easiest)

1. **Go to Railway Dashboard**
   - Visit: https://railway.app
   - Login with your account
   - Select your "dynamic-harmony" project

2. **Open the Service**
   - Click on "wacce" service (your backend)

3. **Open Terminal/Shell**
   - Look for "Shell" or "Terminal" tab
   - Click on it to open a command line

4. **Run the Migration (if not done)**
   ```bash
   python manage.py migrate courses
   ```

5. **Run the Populate Script**
   ```bash
   python manage.py shell
   ```
   
   Then paste this code:
   ```python
   from courses.models import Lesson
   
   # English notes
   english_notes = """# Key Points to Remember
   
   ## Grammar Fundamentals
   - Parts of speech: nouns, verbs, adjectives, adverbs
   - Sentence structure: subject, predicate, object
   - Tenses: past, present, future
   
   ## Writing Skills
   - Essay structure: introduction, body, conclusion
   - Paragraph development
   - Transition words
   
   ## Practice Tips
   1. Read widely
   2. Practice writing daily
   3. Review grammar rules
   4. Build vocabulary
   """
   
   # Math notes
   math_notes = """# Important Concepts
   
   ## Key Formulas
   - Quadratic: x = (-b ± √(b²-4ac)) / 2a
   - Area of circle: πr²
   - Pythagoras: a² + b² = c²
   
   ## Study Tips
   - Practice problems daily
   - Show all working
   - Check your answers
   """
   
   # General notes
   general_notes = """# Lesson Overview
   
   ## Learning Objectives
   - Understand key concepts
   - Apply knowledge practically
   - Solve problems independently
   
   ## Study Strategies
   1. Take notes while watching
   2. Practice exercises
   3. Review regularly
   """
   
   # Update all lessons
   count = 0
   for lesson in Lesson.objects.all():
       if not lesson.notes:
           subject = lesson.topic.subject.name
           if 'English' in subject or 'Literature' in subject:
               lesson.notes = f"# {lesson.title}\n\n{english_notes}"
           elif 'Math' in subject:
               lesson.notes = f"# {lesson.title}\n\n{math_notes}"
           else:
               lesson.notes = f"# {lesson.title}\n\n{general_notes}"
           lesson.save()
           count += 1
   
   print(f"Updated {count} lessons!")
   ```

6. **Press Enter** and wait for it to complete

7. **Exit the shell**
   ```python
   exit()
   ```

### Method 2: Using Railway CLI with Shell

```bash
# Open Railway shell (connects you to the server)
railway shell

# Once inside, run:
python manage.py shell

# Then paste the code from Method 1
```

### Method 3: Create a Django Management Command

This is the most professional way. I'll create it for you:

1. The command file is already in your repo
2. On Railway shell, run:
   ```bash
   python manage.py populate_lesson_notes
   ```

Let me create that command now...
