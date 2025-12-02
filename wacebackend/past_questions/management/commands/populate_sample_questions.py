from django.core.management.base import BaseCommand
from courses.models import Subject
from past_questions.models import (
    QuestionTopic, PastQuestionPaper, MultipleChoiceQuestion, EssayQuestion
)


class Command(BaseCommand):
    help = 'Populate sample past questions with topics for demonstration'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample past questions with topics...')
        
        # Get English Language subject
        try:
            english = Subject.objects.get(code='ENG')
        except Subject.DoesNotExist:
            self.stdout.write(self.style.ERROR('English Language subject not found. Run populate_shared_subjects first.'))
            return
        
        # Create Question Topics for English Language
        topics_data = [
            {
                'name': 'Grammar and Syntax',
                'description': 'Questions on sentence structure, parts of speech, and grammatical rules',
                'order': 1
            },
            {
                'name': 'Vocabulary and Word Usage',
                'description': 'Synonyms, antonyms, word meanings, and contextual usage',
                'order': 2
            },
            {
                'name': 'Reading Comprehension',
                'description': 'Understanding passages, inference, and critical analysis',
                'order': 3
            },
            {
                'name': 'Literature and Poetry',
                'description': 'Literary devices, themes, and analysis of texts',
                'order': 4
            },
            {
                'name': 'Essay Writing',
                'description': 'Composition, argumentation, and creative writing',
                'order': 5
            },
            {
                'name': 'Oral Communication',
                'description': 'Speech, presentation, and verbal expression',
                'order': 6
            },
        ]
        
        topics = {}
        for topic_data in topics_data:
            topic, created = QuestionTopic.objects.get_or_create(
                subject=english,
                name=topic_data['name'],
                defaults={
                    'description': topic_data['description'],
                    'order': topic_data['order']
                }
            )
            topics[topic_data['name']] = topic
            if created:
                self.stdout.write(f'  Created topic: {topic.name}')
        
        # Create sample papers for recent years
        years = [2024, 2023, 2022]
        
        for year in years:
            # Paper 1 - Objective (MCQ)
            paper1, created = PastQuestionPaper.objects.get_or_create(
                subject=english,
                year=year,
                paper_number=1,
                defaults={
                    'paper_type': 'objective',
                    'title': f'WASSCE {year} English Language Paper 1',
                    'instructions': 'Answer all questions. Each question carries 1 mark.',
                    'duration_minutes': 90,
                    'total_marks': 60,
                    'is_published': True
                }
            )
            
            if created:
                self.stdout.write(f'Created paper: {paper1.title}')
                
                # Add MCQ questions with topics
                mcq_questions = [
                    # Grammar questions
                    {
                        'topic': 'Grammar and Syntax',
                        'question_text': 'Choose the correct form: She _____ to the market yesterday.',
                        'option_a': 'go',
                        'option_b': 'goes',
                        'option_c': 'went',
                        'option_d': 'going',
                        'correct_answer': 'C',
                        'explanation': 'The past tense "went" is correct for an action that happened yesterday.'
                    },
                    {
                        'topic': 'Grammar and Syntax',
                        'question_text': 'Identify the part of speech: The *beautiful* flowers bloomed.',
                        'option_a': 'Noun',
                        'option_b': 'Verb',
                        'option_c': 'Adjective',
                        'option_d': 'Adverb',
                        'correct_answer': 'C',
                        'explanation': '"Beautiful" describes the noun "flowers", making it an adjective.'
                    },
                    # Vocabulary questions
                    {
                        'topic': 'Vocabulary and Word Usage',
                        'question_text': 'Which word is a synonym for "abundant"?',
                        'option_a': 'scarce',
                        'option_b': 'plentiful',
                        'option_c': 'limited',
                        'option_d': 'rare',
                        'correct_answer': 'B',
                        'explanation': '"Plentiful" means existing in large quantities, same as "abundant".'
                    },
                    {
                        'topic': 'Vocabulary and Word Usage',
                        'question_text': 'The student was _____ for his outstanding performance.',
                        'option_a': 'rewarded',
                        'option_b': 'punished',
                        'option_c': 'ignored',
                        'option_d': 'forgotten',
                        'correct_answer': 'A',
                        'explanation': '"Rewarded" indicates positive recognition for good performance.'
                    },
                    # Reading Comprehension
                    {
                        'topic': 'Reading Comprehension',
                        'question_text': 'In the sentence "The early bird catches the worm", what is implied?',
                        'option_a': 'Birds wake up early',
                        'option_b': 'Success comes to those who act promptly',
                        'option_c': 'Worms are easy to catch',
                        'option_d': 'Birds eat worms',
                        'correct_answer': 'B',
                        'explanation': 'This is a proverb meaning those who act early have an advantage.'
                    },
                ]
                
                for i, q_data in enumerate(mcq_questions, 1):
                    topic = topics.get(q_data['topic'])
                    MultipleChoiceQuestion.objects.create(
                        paper=paper1,
                        topic=topic,
                        question_number=i,
                        question_text=q_data['question_text'],
                        option_a=q_data['option_a'],
                        option_b=q_data['option_b'],
                        option_c=q_data['option_c'],
                        option_d=q_data['option_d'],
                        correct_answer=q_data['correct_answer'],
                        explanation=q_data['explanation'],
                        marks=1,
                        difficulty='medium'
                    )
                
                self.stdout.write(f'  Added {len(mcq_questions)} MCQ questions')
            
            # Paper 2 - Essay
            paper2, created = PastQuestionPaper.objects.get_or_create(
                subject=english,
                year=year,
                paper_number=2,
                defaults={
                    'paper_type': 'essay',
                    'title': f'WASSCE {year} English Language Paper 2',
                    'instructions': 'Answer all questions in Section A and any two questions from Section B.',
                    'duration_minutes': 180,
                    'total_marks': 100,
                    'is_published': True
                }
            )
            
            if created:
                self.stdout.write(f'Created paper: {paper2.title}')
                
                # Add Essay questions with topics
                essay_questions = [
                    {
                        'topic': 'Essay Writing',
                        'section': 'A',
                        'question_text': 'Write a letter to your friend describing your recent school excursion.',
                        'marks': 20,
                        'marking_scheme': '''
                        - Format and structure (5 marks)
                        - Content and details (8 marks)
                        - Language and expression (5 marks)
                        - Mechanics (spelling, punctuation) (2 marks)
                        ''',
                        'sample_answer': 'A well-structured informal letter with proper greeting, body paragraphs describing the excursion, and appropriate closing.'
                    },
                    {
                        'topic': 'Literature and Poetry',
                        'section': 'B',
                        'question_text': 'Discuss the theme of courage in the novel you have studied.',
                        'marks': 25,
                        'marking_scheme': '''
                        - Introduction and thesis (5 marks)
                        - Analysis with examples (12 marks)
                        - Critical thinking (5 marks)
                        - Conclusion (3 marks)
                        ''',
                        'sample_answer': 'A structured essay analyzing how courage is portrayed through characters and events in the novel.'
                    },
                    {
                        'topic': 'Reading Comprehension',
                        'section': 'A',
                        'question_text': 'Read the passage and answer the questions that follow.',
                        'marks': 15,
                        'marking_scheme': '''
                        - Literal comprehension (5 marks)
                        - Inferential understanding (6 marks)
                        - Critical analysis (4 marks)
                        ''',
                        'sample_answer': 'Answers should demonstrate understanding of explicit and implicit meanings in the passage.'
                    },
                ]
                
                for i, q_data in enumerate(essay_questions, 1):
                    topic = topics.get(q_data['topic'])
                    EssayQuestion.objects.create(
                        paper=paper2,
                        topic=topic,
                        question_number=i,
                        section=q_data['section'],
                        question_text=q_data['question_text'],
                        marks=q_data['marks'],
                        marking_scheme=q_data['marking_scheme'],
                        sample_answer=q_data['sample_answer'],
                        difficulty='medium'
                    )
                
                self.stdout.write(f'  Added {len(essay_questions)} essay questions')
        
        self.stdout.write(self.style.SUCCESS('\nSample past questions created successfully!'))
        self.stdout.write(f'\nSummary:')
        self.stdout.write(f'Topics created: {QuestionTopic.objects.count()}')
        self.stdout.write(f'Papers created: {PastQuestionPaper.objects.count()}')
        self.stdout.write(f'MCQ questions: {MultipleChoiceQuestion.objects.count()}')
        self.stdout.write(f'Essay questions: {EssayQuestion.objects.count()}')
