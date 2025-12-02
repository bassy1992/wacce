from django.core.management.base import BaseCommand
from students.models import Programme
from courses.models import Subject

class Command(BaseCommand):
    help = 'Populate initial data for WACE application'

    def handle(self, *args, **options):
        # Create programmes
        programmes_data = [
            {
                'name': 'general_science',
                'description': 'General Science programme covering Mathematics, Physics, Chemistry, and Biology',
                'price': 500.00,
                'duration_months': 12
            },
            {
                'name': 'general_arts',
                'description': 'General Arts programme covering Literature, History, Geography, and Government',
                'price': 500.00,
                'duration_months': 12
            },
            {
                'name': 'business',
                'description': 'Business programme covering Economics, Accounting, Business Management, and Mathematics',
                'price': 500.00,
                'duration_months': 12
            },
            {
                'name': 'visual_arts',
                'description': 'Visual Arts programme covering Graphic Design, Painting, Sculpture, and Art History',
                'price': 500.00,
                'duration_months': 12
            },
            {
                'name': 'home_economics',
                'description': 'Home Economics programme covering Food and Nutrition, Clothing and Textiles, and Management',
                'price': 500.00,
                'duration_months': 12
            },
            {
                'name': 'agricultural_science',
                'description': 'Agricultural Science programme covering Crop Production, Animal Husbandry, and Agricultural Economics',
                'price': 500.00,
                'duration_months': 12
            }
        ]

        for prog_data in programmes_data:
            programme, created = Programme.objects.get_or_create(
                name=prog_data['name'],
                defaults=prog_data
            )
            if created:
                self.stdout.write(f"Created programme: {programme.get_name_display()}")

        # Create subjects
        subjects_data = [
            # Core subjects
            {'name': 'English Language', 'code': 'ENG', 'is_core': True},
            {'name': 'Mathematics', 'code': 'MATH', 'is_core': True},
            {'name': 'Integrated Science', 'code': 'INT_SCI', 'is_core': True},
            {'name': 'Social Studies', 'code': 'SOC_STU', 'is_core': True},
            
            # Science subjects
            {'name': 'Physics', 'code': 'PHY', 'is_core': False},
            {'name': 'Chemistry', 'code': 'CHEM', 'is_core': False},
            {'name': 'Biology', 'code': 'BIO', 'is_core': False},
            {'name': 'Further Mathematics', 'code': 'F_MATH', 'is_core': False},
            
            # Arts subjects
            {'name': 'Literature in English', 'code': 'LIT', 'is_core': False},
            {'name': 'History', 'code': 'HIST', 'is_core': False},
            {'name': 'Geography', 'code': 'GEO', 'is_core': False},
            {'name': 'Government', 'code': 'GOV', 'is_core': False},
            
            # Business subjects
            {'name': 'Economics', 'code': 'ECON', 'is_core': False},
            {'name': 'Accounting', 'code': 'ACC', 'is_core': False},
            {'name': 'Business Management', 'code': 'BUS_MGT', 'is_core': False},
        ]

        for subj_data in subjects_data:
            subject, created = Subject.objects.get_or_create(
                code=subj_data['code'],
                defaults={
                    'name': subj_data['name'],
                    'description': f"WASSCE {subj_data['name']} curriculum",
                    'is_core': subj_data['is_core']
                }
            )
            if created:
                self.stdout.write(f"Created subject: {subject.name}")

        # Assign subjects to programmes
        general_science = Programme.objects.get(name='general_science')
        general_arts = Programme.objects.get(name='general_arts')
        business = Programme.objects.get(name='business')

        # Core subjects for all programmes
        core_subjects = Subject.objects.filter(is_core=True)
        for programme in Programme.objects.all():
            programme.subjects.add(*core_subjects)

        # Science programme subjects
        science_subjects = Subject.objects.filter(code__in=['PHY', 'CHEM', 'BIO', 'F_MATH'])
        general_science.subjects.add(*science_subjects)

        # Arts programme subjects
        arts_subjects = Subject.objects.filter(code__in=['LIT', 'HIST', 'GEO', 'GOV'])
        general_arts.subjects.add(*arts_subjects)

        # Business programme subjects
        business_subjects = Subject.objects.filter(code__in=['ECON', 'ACC', 'BUS_MGT'])
        business.subjects.add(*business_subjects)

        self.stdout.write(self.style.SUCCESS('Successfully populated initial data!'))