from django.core.management.base import BaseCommand
from students.models import Programme
from courses.models import Subject, Topic, Lesson


class Command(BaseCommand):
    help = 'Populate database with WACE programmes, subjects, and sample topics'

    def handle(self, *args, **options):
        # Create programmes
        programmes_data = [
            {
                'name': 'general_science',
                'description': 'Focuses on developing analytical and scientific thinking skills.',
                'price': 2500.00,
                'duration_months': 12
            },
            {
                'name': 'general_arts',
                'description': 'Develops strong communication and analytical abilities.',
                'price': 2500.00,
                'duration_months': 12
            },
            {
                'name': 'business',
                'description': 'Equips students with financial, managerial, and entrepreneurial knowledge.',
                'price': 2500.00,
                'duration_months': 12
            },
            {
                'name': 'visual_arts',
                'description': 'Encourages creativity, design thinking, and self-expression.',
                'price': 2500.00,
                'duration_months': 12
            },
            {
                'name': 'home_economics',
                'description': 'Focuses on family welfare, nutrition, and practical life skills.',
                'price': 2500.00,
                'duration_months': 12
            },
            {
                'name': 'agricultural_science',
                'description': 'Builds knowledge in modern agriculture, environmental science, and agribusiness.',
                'price': 2500.00,
                'duration_months': 12
            }
        ]

        # Programme-subject mappings with sample topics
        programme_subjects = {
            'general_science': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'Physics', 'code': 'PHY', 'description': 'Advanced physics concepts'},
                    {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Advanced chemistry concepts'},
                    {'name': 'Biology', 'code': 'BIO', 'description': 'Advanced biology concepts'},
                    {'name': 'Elective Mathematics', 'code': 'EMATH', 'description': 'Advanced mathematics'},
                ]
            },
            'general_arts': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'Literature in English', 'code': 'LIT', 'description': 'English literature studies'},
                    {'name': 'History', 'code': 'HIST', 'description': 'Historical studies'},
                    {'name': 'Government', 'code': 'GOV', 'description': 'Government and politics'},
                    {'name': 'Christian Religious Studies', 'code': 'CRS', 'description': 'Christian religious education'},
                    {'name': 'Geography', 'code': 'GEO', 'description': 'Physical and human geography'},
                    {'name': 'Economics', 'code': 'ECON', 'description': 'Economic principles and theory'},
                ]
            },
            'business': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'Accounting', 'code': 'ACC', 'description': 'Financial accounting principles'},
                    {'name': 'Business Management', 'code': 'BMGT', 'description': 'Business management principles'},
                    {'name': 'Economics', 'code': 'ECON', 'description': 'Economic principles and theory'},
                    {'name': 'Cost Accounting', 'code': 'CACC', 'description': 'Cost accounting methods'},
                    {'name': 'Elective Mathematics', 'code': 'EMATH', 'description': 'Advanced mathematics'},
                ]
            },
            'visual_arts': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'Graphic Design', 'code': 'GD', 'description': 'Digital and print design'},
                    {'name': 'Sculpture', 'code': 'SCUL', 'description': '3D art and sculpture'},
                    {'name': 'Textiles', 'code': 'TEXT', 'description': 'Textile design and production'},
                    {'name': 'Picture Making', 'code': 'PM', 'description': 'Drawing and painting'},
                    {'name': 'Ceramics', 'code': 'CER', 'description': 'Pottery and ceramics'},
                    {'name': 'Leatherwork', 'code': 'LW', 'description': 'Leather crafting'},
                ]
            },
            'home_economics': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'Food and Nutrition', 'code': 'FN', 'description': 'Nutrition science and food preparation'},
                    {'name': 'Management in Living', 'code': 'ML', 'description': 'Home and family management'},
                    {'name': 'Textiles', 'code': 'TEXT', 'description': 'Textile design and production'},
                    {'name': 'General Knowledge in Art', 'code': 'GKA', 'description': 'Basic art appreciation'},
                ]
            },
            'agricultural_science': {
                'core': [
                    {'name': 'English Language', 'code': 'ENG', 'description': 'Core English language skills'},
                    {'name': 'Mathematics', 'code': 'MATH', 'description': 'Core mathematics skills'},
                    {'name': 'Integrated Science', 'code': 'ISCI', 'description': 'Basic science concepts'},
                    {'name': 'Social Studies', 'code': 'SSCI', 'description': 'Social and civic education'},
                ],
                'electives': [
                    {'name': 'General Agriculture', 'code': 'AGRI', 'description': 'General agricultural practices'},
                    {'name': 'Animal Husbandry', 'code': 'AH', 'description': 'Livestock management'},
                    {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Advanced chemistry concepts'},
                    {'name': 'Physics', 'code': 'PHY', 'description': 'Advanced physics concepts'},
                    {'name': 'Elective Mathematics', 'code': 'EMATH', 'description': 'Advanced mathematics'},
                ]
            }
        }

        # Sample topics for different subjects
        sample_topics = {
            'ENG': ['Grammar and Usage', 'Essay Writing', 'Comprehension Skills', 'Literature Analysis'],
            'MATH': ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
            'ISCI': ['Matter and Energy', 'Living Things', 'Earth Science', 'Scientific Method'],
            'SSCI': ['Citizenship', 'Government', 'Economics', 'Geography'],
            'PHY': ['Mechanics', 'Waves and Sound', 'Electricity', 'Modern Physics'],
            'CHEM': ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases', 'Organic Chemistry'],
            'BIO': ['Cell Biology', 'Genetics', 'Ecology', 'Human Biology'],
            'EMATH': ['Calculus', 'Complex Numbers', 'Matrices', 'Probability'],
            'LIT': ['Poetry Analysis', 'Drama Studies', 'Prose Fiction', 'African Literature'],
            'HIST': ['Ancient Civilizations', 'Colonial Period', 'Independence Movements', 'Modern History'],
            'GOV': ['Constitution', 'Political Systems', 'Democracy', 'Human Rights'],
            'CRS': ['Biblical Studies', 'Christian Ethics', 'Church History', 'Theology'],
            'GEO': ['Physical Geography', 'Human Geography', 'Map Reading', 'Environmental Issues'],
            'ECON': ['Microeconomics', 'Macroeconomics', 'Development Economics', 'International Trade'],
            'ACC': ['Financial Accounting', 'Management Accounting', 'Auditing', 'Taxation'],
            'BMGT': ['Business Planning', 'Marketing', 'Human Resources', 'Operations Management'],
            'CACC': ['Cost Analysis', 'Budgeting', 'Variance Analysis', 'Decision Making'],
            'GD': ['Design Principles', 'Digital Tools', 'Typography', 'Brand Identity'],
            'SCUL': ['Clay Modeling', 'Stone Carving', 'Metal Work', 'Installation Art'],
            'TEXT': ['Fabric Design', 'Weaving', 'Dyeing Techniques', 'Fashion Design'],
            'PM': ['Drawing Techniques', 'Painting Methods', 'Color Theory', 'Composition'],
            'CER': ['Pottery Basics', 'Glazing', 'Firing Techniques', 'Decorative Methods'],
            'LW': ['Leather Preparation', 'Cutting and Stitching', 'Tooling', 'Finishing'],
            'FN': ['Nutrition Basics', 'Food Safety', 'Meal Planning', 'Special Diets'],
            'ML': ['Home Management', 'Family Relations', 'Resource Management', 'Child Development'],
            'GKA': ['Art History', 'Art Appreciation', 'Cultural Arts', 'Art Criticism'],
            'AGRI': ['Crop Production', 'Soil Management', 'Plant Breeding', 'Agricultural Economics'],
            'AH': ['Livestock Breeding', 'Animal Nutrition', 'Disease Management', 'Farm Management'],
        }

        # Create programmes
        for prog_data in programmes_data:
            programme, created = Programme.objects.get_or_create(
                name=prog_data['name'],
                defaults=prog_data
            )
            if created:
                self.stdout.write(f"Created programme: {programme.get_name_display()}")
            else:
                self.stdout.write(f"Programme already exists: {programme.get_name_display()}")

        # Create subjects and topics for each programme
        for prog_name, subject_types in programme_subjects.items():
            try:
                programme = Programme.objects.get(name=prog_name)
                
                # Add core subjects
                for order, subject_data in enumerate(subject_types['core']):
                    subject, created = Subject.objects.get_or_create(
                        programme=programme,
                        code=subject_data['code'],
                        defaults={
                            'name': subject_data['name'],
                            'description': subject_data['description'],
                            'subject_type': 'core',
                            'order': order
                        }
                    )
                    if created:
                        self.stdout.write(f"Created core subject: {subject.name}")
                        
                        # Add sample topics
                        if subject_data['code'] in sample_topics:
                            for topic_order, topic_title in enumerate(sample_topics[subject_data['code']]):
                                topic, topic_created = Topic.objects.get_or_create(
                                    subject=subject,
                                    title=topic_title,
                                    defaults={
                                        'description': f'Learn about {topic_title.lower()}',
                                        'order': topic_order,
                                        'estimated_duration_hours': 8,
                                        'is_published': True
                                    }
                                )
                                if topic_created:
                                    self.stdout.write(f"  Added topic: {topic_title}")
                
                # Add elective subjects
                for order, subject_data in enumerate(subject_types['electives']):
                    subject, created = Subject.objects.get_or_create(
                        programme=programme,
                        code=subject_data['code'],
                        defaults={
                            'name': subject_data['name'],
                            'description': subject_data['description'],
                            'subject_type': 'elective',
                            'order': order
                        }
                    )
                    if created:
                        self.stdout.write(f"Created elective subject: {subject.name}")
                        
                        # Add sample topics
                        if subject_data['code'] in sample_topics:
                            for topic_order, topic_title in enumerate(sample_topics[subject_data['code']]):
                                topic, topic_created = Topic.objects.get_or_create(
                                    subject=subject,
                                    title=topic_title,
                                    defaults={
                                        'description': f'Learn about {topic_title.lower()}',
                                        'order': topic_order,
                                        'estimated_duration_hours': 8,
                                        'is_published': True
                                    }
                                )
                                if topic_created:
                                    self.stdout.write(f"  Added topic: {topic_title}")
                
                self.stdout.write(f"Completed {programme.get_name_display()}")
                
            except Programme.DoesNotExist:
                self.stdout.write(f"Programme {prog_name} not found")

        self.stdout.write(
            self.style.SUCCESS('Successfully populated programmes, subjects, and topics!')
        )