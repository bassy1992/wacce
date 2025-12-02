from django.core.management.base import BaseCommand
from students.models import Programme
from courses.models import Subject, ProgrammeSubject, Topic, Lesson


class Command(BaseCommand):
    help = 'Populate shared core subjects and programme-specific elective subjects'

    def handle(self, *args, **options):
        self.stdout.write('Creating shared core subjects...')
        
        # Create shared core subjects (these will be used by all programmes)
        core_subjects_data = [
            {
                'name': 'English Language',
                'code': 'ENG',
                'description': 'Core English language skills including grammar, composition, literature, and communication',
                'topics': [
                    {'title': 'Grammar and Syntax', 'description': 'Master fundamental grammar rules and sentence structure', 'hours': 8},
                    {'title': 'Reading Comprehension', 'description': 'Develop critical reading and analytical skills', 'hours': 6},
                    {'title': 'Essay Writing', 'description': 'Learn to write clear, structured, and persuasive essays', 'hours': 10},
                    {'title': 'Literature Analysis', 'description': 'Analyze literary works and understand literary devices', 'hours': 8},
                    {'title': 'Vocabulary Building', 'description': 'Expand vocabulary and improve word usage', 'hours': 4},
                    {'title': 'Oral Communication', 'description': 'Develop speaking and presentation skills', 'hours': 6},
                ]
            },
            {
                'name': 'Mathematics',
                'code': 'MATH',
                'description': 'Core mathematics skills covering algebra, geometry, trigonometry, and statistics',
                'topics': [
                    {'title': 'Algebra Fundamentals', 'description': 'Master algebraic expressions, equations, and inequalities', 'hours': 12},
                    {'title': 'Geometry', 'description': 'Study shapes, angles, areas, and geometric proofs', 'hours': 10},
                    {'title': 'Trigonometry', 'description': 'Learn trigonometric functions and their applications', 'hours': 8},
                    {'title': 'Statistics and Probability', 'description': 'Understand data analysis and probability concepts', 'hours': 8},
                    {'title': 'Functions and Graphs', 'description': 'Explore function properties and graphical representations', 'hours': 10},
                ]
            },
            {
                'name': 'Integrated Science',
                'code': 'ISCI',
                'description': 'Basic science concepts covering physics, chemistry, and biology',
                'topics': [
                    {'title': 'Matter and Energy', 'description': 'Understand the nature of matter and energy transformations', 'hours': 8},
                    {'title': 'Living Systems', 'description': 'Study biological processes and life systems', 'hours': 10},
                    {'title': 'Chemical Reactions', 'description': 'Learn about chemical processes and reactions', 'hours': 8},
                    {'title': 'Forces and Motion', 'description': 'Explore physical forces and motion principles', 'hours': 8},
                    {'title': 'Earth and Environment', 'description': 'Study earth systems and environmental science', 'hours': 6},
                ]
            },
            {
                'name': 'Social Studies',
                'code': 'SOST',
                'description': 'Understanding society, history, geography, and civic education',
                'topics': [
                    {'title': 'Ghanaian History', 'description': 'Learn about Ghana\'s historical development', 'hours': 8},
                    {'title': 'Geography of Ghana', 'description': 'Study Ghana\'s physical and human geography', 'hours': 6},
                    {'title': 'Government and Politics', 'description': 'Understand governmental systems and political processes', 'hours': 6},
                    {'title': 'Economics Basics', 'description': 'Learn fundamental economic principles', 'hours': 6},
                    {'title': 'Cultural Studies', 'description': 'Explore Ghanaian and world cultures', 'hours': 4},
                ]
            }
        ]

        # Create core subjects
        for subject_data in core_subjects_data:
            subject, created = Subject.objects.get_or_create(
                code=subject_data['code'],
                defaults={
                    'name': subject_data['name'],
                    'description': subject_data['description'],
                    'subject_type': 'core',
                    'is_active': True
                }
            )
            
            if created:
                self.stdout.write(f'Created core subject: {subject.name}')
                
                # Create topics for this subject
                for i, topic_data in enumerate(subject_data['topics'], 1):
                    topic, topic_created = Topic.objects.get_or_create(
                        subject=subject,
                        title=topic_data['title'],
                        defaults={
                            'description': topic_data['description'],
                            'order': i,
                            'estimated_duration_hours': topic_data['hours'],
                            'is_published': True
                        }
                    )
                    
                    if topic_created:
                        self.stdout.write(f'  Created topic: {topic.title}')
                        
                        # Create sample lessons for each topic
                        lesson_types = ['video', 'reading', 'quiz']
                        for j, lesson_type in enumerate(lesson_types, 1):
                            lesson_title = f"{topic.title} - {lesson_type.title()}"
                            if lesson_type == 'video':
                                lesson_title = f"Introduction to {topic.title}"
                            elif lesson_type == 'reading':
                                lesson_title = f"{topic.title} Study Material"
                            elif lesson_type == 'quiz':
                                lesson_title = f"{topic.title} Assessment"
                            
                            Lesson.objects.get_or_create(
                                topic=topic,
                                title=lesson_title,
                                defaults={
                                    'lesson_type': lesson_type,
                                    'order': j,
                                    'is_free': j == 1,  # First lesson is free
                                    'video_duration_minutes': 30 if lesson_type == 'video' else None
                                }
                            )
            else:
                self.stdout.write(f'Core subject already exists: {subject.name}')

        # Assign core subjects to all programmes
        self.stdout.write('\nAssigning core subjects to all programmes...')
        programmes = Programme.objects.all()
        core_subjects = Subject.objects.filter(subject_type='core')
        
        for programme in programmes:
            self.stdout.write(f'Processing programme: {programme.get_name_display()}')
            
            for i, subject in enumerate(core_subjects, 1):
                prog_subject, created = ProgrammeSubject.objects.get_or_create(
                    programme=programme,
                    subject=subject,
                    defaults={
                        'is_required': True,
                        'order': i
                    }
                )
                
                if created:
                    self.stdout.write(f'  Assigned: {subject.name}')

        # Create programme-specific elective subjects
        self.stdout.write('\nCreating programme-specific elective subjects...')
        
        elective_subjects_by_programme = {
            'general_science': [
                {'name': 'Physics', 'code': 'PHYS', 'description': 'Advanced physics concepts and applications'},
                {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Chemical principles and laboratory techniques'},
                {'name': 'Biology', 'code': 'BIOL', 'description': 'Biological systems and life processes'},
                {'name': 'Elective Mathematics', 'code': 'EMATH', 'description': 'Advanced mathematical concepts'},
            ],
            'general_arts': [
                {'name': 'Literature in English', 'code': 'LIT', 'description': 'Study of literary works and criticism'},
                {'name': 'History', 'code': 'HIST', 'description': 'World and African history'},
                {'name': 'Geography', 'code': 'GEOG', 'description': 'Physical and human geography'},
                {'name': 'Economics', 'code': 'ECON', 'description': 'Economic theory and applications'},
                {'name': 'Government', 'code': 'GOVT', 'description': 'Political systems and governance'},
            ],
            'business': [
                {'name': 'Business Management', 'code': 'BMGT', 'description': 'Principles of business management'},
                {'name': 'Accounting', 'code': 'ACCT', 'description': 'Financial accounting principles'},
                {'name': 'Economics', 'code': 'ECON', 'description': 'Economic theory and business applications'},
                {'name': 'Cost Accounting', 'code': 'COST', 'description': 'Cost analysis and management accounting'},
            ],
            'visual_arts': [
                {'name': 'Graphic Design', 'code': 'GRPH', 'description': 'Visual communication and design principles'},
                {'name': 'Sculpture', 'code': 'SCUL', 'description': 'Three-dimensional art and sculpture techniques'},
                {'name': 'Painting', 'code': 'PANT', 'description': 'Painting techniques and color theory'},
                {'name': 'Art History', 'code': 'ARTH', 'description': 'History and appreciation of visual arts'},
            ],
            'home_economics': [
                {'name': 'Food and Nutrition', 'code': 'FOOD', 'description': 'Nutrition science and food preparation'},
                {'name': 'Clothing and Textiles', 'code': 'TEXT', 'description': 'Textile science and garment construction'},
                {'name': 'Management in Living', 'code': 'MGMT', 'description': 'Home and resource management'},
                {'name': 'General Knowledge in Art', 'code': 'GKAR', 'description': 'Art appreciation and creativity'},
            ],
            'agricultural_science': [
                {'name': 'Animal Husbandry', 'code': 'ANIM', 'description': 'Livestock management and production'},
                {'name': 'Crop Husbandry', 'code': 'CROP', 'description': 'Crop production and management'},
                {'name': 'Agricultural Economics', 'code': 'AGEC', 'description': 'Economics of agricultural production'},
                {'name': 'General Agriculture', 'code': 'GAGR', 'description': 'General agricultural principles'},
            ]
        }

        for programme in programmes:
            programme_name = programme.name
            if programme_name in elective_subjects_by_programme:
                electives = elective_subjects_by_programme[programme_name]
                
                for i, elective_data in enumerate(electives, 1):
                    # Create or get the elective subject
                    subject, created = Subject.objects.get_or_create(
                        code=elective_data['code'],
                        defaults={
                            'name': elective_data['name'],
                            'description': elective_data['description'],
                            'subject_type': 'elective',
                            'is_active': True
                        }
                    )
                    
                    if created:
                        self.stdout.write(f'Created elective subject: {subject.name}')
                        
                        # Create basic topics for elective subjects
                        basic_topics = [
                            {'title': f'Introduction to {subject.name}', 'description': f'Basic concepts in {subject.name}', 'hours': 6},
                            {'title': f'Intermediate {subject.name}', 'description': f'Intermediate level concepts', 'hours': 8},
                            {'title': f'Advanced {subject.name}', 'description': f'Advanced applications and theory', 'hours': 10},
                        ]
                        
                        for j, topic_data in enumerate(basic_topics, 1):
                            topic, topic_created = Topic.objects.get_or_create(
                                subject=subject,
                                title=topic_data['title'],
                                defaults={
                                    'description': topic_data['description'],
                                    'order': j,
                                    'estimated_duration_hours': topic_data['hours'],
                                    'is_published': True
                                }
                            )
                            
                            if topic_created:
                                # Create sample lessons
                                for k, lesson_type in enumerate(['video', 'reading'], 1):
                                    lesson_title = f"{topic.title} - {lesson_type.title()}"
                                    Lesson.objects.get_or_create(
                                        topic=topic,
                                        title=lesson_title,
                                        defaults={
                                            'lesson_type': lesson_type,
                                            'order': k,
                                            'is_free': k == 1,
                                            'video_duration_minutes': 25 if lesson_type == 'video' else None
                                        }
                                    )
                    
                    # Assign elective to programme
                    prog_subject, created = ProgrammeSubject.objects.get_or_create(
                        programme=programme,
                        subject=subject,
                        defaults={
                            'is_required': False,
                            'order': len(core_subjects) + i
                        }
                    )
                    
                    if created:
                        self.stdout.write(f'  Assigned elective to {programme.get_name_display()}: {subject.name}')

        self.stdout.write(self.style.SUCCESS('\nSuccessfully populated shared subjects!'))
        
        # Print summary
        total_subjects = Subject.objects.count()
        core_count = Subject.objects.filter(subject_type='core').count()
        elective_count = Subject.objects.filter(subject_type='elective').count()
        
        self.stdout.write(f'\nSummary:')
        self.stdout.write(f'Total subjects: {total_subjects}')
        self.stdout.write(f'Core subjects: {core_count}')
        self.stdout.write(f'Elective subjects: {elective_count}')
        self.stdout.write(f'Total topics: {Topic.objects.count()}')
        self.stdout.write(f'Total lessons: {Lesson.objects.count()}')