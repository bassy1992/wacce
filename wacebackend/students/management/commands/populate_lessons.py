"""
Django management command to populate lessons for topics
Usage: python manage.py populate_lessons
"""
from django.core.management.base import BaseCommand
from courses.models import Topic, Lesson


class Command(BaseCommand):
    help = 'Populate lessons for all topics'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("POPULATING LESSONS FOR ALL TOPICS")
        self.stdout.write("=" * 70)
        
        # Get all topics
        topics = Topic.objects.all()
        
        if not topics.exists():
            self.stdout.write(self.style.WARNING("No topics found. Please run populate_topics first."))
            return
        
        total_created = 0
        total_existing = 0
        
        for topic in topics:
            self.stdout.write(f"\n📚 Processing: {topic.title}")
            
            # Create 5-8 lessons per topic
            lessons_data = self.get_lessons_for_topic(topic)
            
            for order, lesson_data in enumerate(lessons_data, start=1):
                try:
                    lesson, created = Lesson.objects.get_or_create(
                        topic=topic,
                        order=order,
                        defaults={
                            'title': lesson_data['title'],
                            'lesson_type': lesson_data['type'],
                            'content': lesson_data['content'],
                            'video_url': lesson_data.get('video_url', ''),
                            'video_duration_minutes': lesson_data.get('duration', 15),
                            'is_free': lesson_data.get('is_free', False)
                        }
                    )
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"  ❌ Error creating lesson: {str(e)}"))
                    continue
                
                if created:
                    self.stdout.write(self.style.SUCCESS(f"  ✅ Created: {lesson.title}"))
                    total_created += 1
                else:
                    self.stdout.write(f"  ⏭️  Exists: {lesson.title}")
                    total_existing += 1
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS("✅ DONE! Lesson population complete"))
        self.stdout.write("=" * 70)
        self.stdout.write(f"\n📊 Summary:")
        self.stdout.write(f"   Lessons Created: {total_created}")
        self.stdout.write(f"   Lessons Already Existed: {total_existing}")
        self.stdout.write(f"   Total Lessons: {total_created + total_existing}")
    
    def get_lessons_for_topic(self, topic):
        """Generate appropriate lessons based on topic title"""
        topic_title = topic.title.lower()
        
        # Grammar and Syntax
        if 'grammar' in topic_title:
            return [
                {'title': 'Introduction to Grammar', 'type': 'video', 'content': 'Overview of English grammar basics', 'duration': 20, 'is_free': True},
                {'title': 'Parts of Speech', 'type': 'video', 'content': 'Nouns, verbs, adjectives, and more', 'duration': 25},
                {'title': 'Sentence Structure', 'type': 'video', 'content': 'Building proper sentences', 'duration': 30},
                {'title': 'Tenses and Time', 'type': 'video', 'content': 'Past, present, and future tenses', 'duration': 35},
                {'title': 'Subject-Verb Agreement', 'type': 'video', 'content': 'Making subjects and verbs agree', 'duration': 20},
                {'title': 'Grammar Practice Exercises', 'type': 'exercise', 'content': 'Practice what you learned', 'duration': 30},
            ]
        
        # Reading Comprehension
        elif 'reading' in topic_title or 'comprehension' in topic_title:
            return [
                {'title': 'Reading Strategies', 'type': 'video', 'content': 'Effective reading techniques', 'duration': 15, 'is_free': True},
                {'title': 'Understanding Main Ideas', 'type': 'video', 'content': 'Identifying key concepts', 'duration': 20},
                {'title': 'Making Inferences', 'type': 'video', 'content': 'Reading between the lines', 'duration': 25},
                {'title': 'Analyzing Text Structure', 'type': 'video', 'content': 'How texts are organized', 'duration': 20},
                {'title': 'Practice Passage 1', 'type': 'reading', 'content': 'Read and answer questions', 'duration': 30},
                {'title': 'Practice Passage 2', 'type': 'reading', 'content': 'Advanced comprehension', 'duration': 30},
            ]
        
        # Essay Writing
        elif 'essay' in topic_title or 'writing' in topic_title:
            return [
                {'title': 'Essay Structure', 'type': 'video', 'content': 'Introduction, body, conclusion', 'duration': 20, 'is_free': True},
                {'title': 'Writing Strong Introductions', 'type': 'video', 'content': 'Hook your readers', 'duration': 15},
                {'title': 'Developing Body Paragraphs', 'type': 'video', 'content': 'Supporting your arguments', 'duration': 25},
                {'title': 'Writing Conclusions', 'type': 'video', 'content': 'Ending with impact', 'duration': 15},
                {'title': 'Editing and Proofreading', 'type': 'video', 'content': 'Polishing your work', 'duration': 20},
                {'title': 'Essay Writing Practice', 'type': 'assignment', 'content': 'Write your own essay', 'duration': 60},
            ]
        
        # Vocabulary
        elif 'vocabulary' in topic_title:
            return [
                {'title': 'Word Roots and Prefixes', 'type': 'video', 'content': 'Understanding word parts', 'duration': 20, 'is_free': True},
                {'title': 'Context Clues', 'type': 'video', 'content': 'Learning words from context', 'duration': 15},
                {'title': 'Synonyms and Antonyms', 'type': 'video', 'content': 'Similar and opposite words', 'duration': 20},
                {'title': 'Academic Vocabulary', 'type': 'video', 'content': 'Words for school success', 'duration': 25},
                {'title': 'Vocabulary Practice Quiz', 'type': 'quiz', 'content': 'Test your knowledge', 'duration': 20},
            ]
        
        # Mathematics topics
        elif 'algebra' in topic_title:
            return [
                {'title': 'Introduction to Algebra', 'type': 'video', 'content': 'What is algebra?', 'duration': 15, 'is_free': True},
                {'title': 'Variables and Expressions', 'type': 'video', 'content': 'Working with variables', 'duration': 20},
                {'title': 'Solving Linear Equations', 'type': 'video', 'content': 'Finding x', 'duration': 30},
                {'title': 'Word Problems', 'type': 'video', 'content': 'Applying algebra to real life', 'duration': 25},
                {'title': 'Practice Problems', 'type': 'exercise', 'content': 'Solve equations', 'duration': 40},
            ]
        
        elif 'geometry' in topic_title:
            return [
                {'title': 'Basic Shapes and Angles', 'type': 'video', 'content': 'Understanding geometry basics', 'duration': 20, 'is_free': True},
                {'title': 'Triangles and Properties', 'type': 'video', 'content': 'Types of triangles', 'duration': 25},
                {'title': 'Circles and Pi', 'type': 'video', 'content': 'Working with circles', 'duration': 20},
                {'title': 'Area and Perimeter', 'type': 'video', 'content': 'Calculating measurements', 'duration': 30},
                {'title': 'Geometry Practice', 'type': 'exercise', 'content': 'Solve geometry problems', 'duration': 35},
            ]
        
        # Science topics
        elif 'cell' in topic_title or 'biology' in topic_title:
            return [
                {'title': 'Introduction to Cells', 'type': 'video', 'content': 'The building blocks of life', 'duration': 20, 'is_free': True},
                {'title': 'Cell Structure', 'type': 'video', 'content': 'Parts of a cell', 'duration': 25},
                {'title': 'Cell Functions', 'type': 'video', 'content': 'What cells do', 'duration': 20},
                {'title': 'Cell Division', 'type': 'video', 'content': 'Mitosis and meiosis', 'duration': 30},
                {'title': 'Lab Activity', 'type': 'exercise', 'content': 'Virtual cell lab', 'duration': 40},
            ]
        
        elif 'chemistry' in topic_title or 'chemical' in topic_title:
            return [
                {'title': 'Introduction to Chemistry', 'type': 'video', 'content': 'What is chemistry?', 'duration': 15, 'is_free': True},
                {'title': 'Atoms and Molecules', 'type': 'video', 'content': 'Building blocks of matter', 'duration': 25},
                {'title': 'Chemical Reactions', 'type': 'video', 'content': 'How substances change', 'duration': 30},
                {'title': 'Balancing Equations', 'type': 'video', 'content': 'Chemical equation practice', 'duration': 25},
                {'title': 'Lab Safety and Experiments', 'type': 'video', 'content': 'Safe chemistry practices', 'duration': 20},
            ]
        
        # Default lessons for any topic
        else:
            topic_name = topic.title
            return [
                {'title': f'Introduction to {topic_name}', 'type': 'video', 'content': f'Overview of {topic_name}', 'duration': 15, 'is_free': True},
                {'title': f'{topic_name} - Part 1', 'type': 'video', 'content': f'First lesson on {topic_name}', 'duration': 20},
                {'title': f'{topic_name} - Part 2', 'type': 'video', 'content': f'Continuing {topic_name}', 'duration': 25},
                {'title': f'{topic_name} - Part 3', 'type': 'video', 'content': f'Advanced {topic_name}', 'duration': 20},
                {'title': f'Practice Exercises', 'type': 'exercise', 'content': f'Practice {topic_name}', 'duration': 30},
                {'title': f'Quiz: {topic_name}', 'type': 'quiz', 'content': f'Test your knowledge', 'duration': 20},
            ]
