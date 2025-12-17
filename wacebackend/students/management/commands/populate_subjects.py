"""
Django management command to populate subjects
Usage: python manage.py populate_subjects
"""
from django.core.management.base import BaseCommand
from students.models import Programme
from courses.models import Subject, ProgrammeSubject


class Command(BaseCommand):
    help = 'Populate subjects for all programmes'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("POPULATING SUBJECTS FOR ALL PROGRAMMES")
        self.stdout.write("=" * 70)
        
        # Create core subjects
        self.stdout.write("\n📚 Step 1: Creating Core Subjects...")
        core_subjects = self.create_core_subjects()
        
        # Create elective subjects
        self.stdout.write("\n📖 Step 2: Creating Elective Subjects...")
        elective_subjects = self.create_elective_subjects()
        
        # Assign subjects to programmes
        self.stdout.write("\n🔗 Step 3: Assigning subjects to programmes...")
        self.assign_subjects_to_programmes()
        
        # Show summary
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS("✅ DONE! Subject population complete"))
        self.stdout.write("=" * 70)
        
        self.stdout.write(f"\n📊 Database Summary:")
        self.stdout.write(f"   Total Programmes: {Programme.objects.count()}")
        self.stdout.write(f"   Total Subjects: {Subject.objects.count()}")
        self.stdout.write(f"   Core Subjects: {Subject.objects.filter(subject_type='core').count()}")
        self.stdout.write(f"   Elective Subjects: {Subject.objects.filter(subject_type='elective').count()}")
        self.stdout.write(f"   Programme-Subject Links: {ProgrammeSubject.objects.count()}")
        
        self.stdout.write("\n📋 Subjects per Programme:")
        for programme in Programme.objects.all():
            core_count = programme.programme_subjects.filter(subject__subject_type='core').count()
            elective_count = programme.programme_subjects.filter(subject__subject_type='elective').count()
            self.stdout.write(f"   {programme.get_name_display()}: {core_count} core + {elective_count} electives = {core_count + elective_count} total")

    def create_core_subjects(self):
        """Create core subjects that ALL SHS students must take"""
        core_subjects_data = [
            {
                'name': 'English Language',
                'code': 'ENG',
                'description': 'Core English Language for all SHS students',
                'subject_type': 'core',
            },
            {
                'name': 'Mathematics (Core)',
                'code': 'MATH_CORE',
                'description': 'Core Mathematics for all SHS students',
                'subject_type': 'core',
            },
            {
                'name': 'Integrated Science',
                'code': 'INT_SCI',
                'description': 'Integrated Science for all SHS students',
                'subject_type': 'core',
            },
            {
                'name': 'Social Studies',
                'code': 'SOC_STD',
                'description': 'Social Studies for all SHS students',
                'subject_type': 'core',
            },
            {
                'name': 'ICT/Computing',
                'code': 'ICT',
                'description': 'Information and Communication Technology',
                'subject_type': 'core',
            },
        ]
        
        created_subjects = []
        for subj_data in core_subjects_data:
            subject, created = Subject.objects.get_or_create(
                code=subj_data['code'],
                defaults=subj_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created core subject: {subject.name}"))
            else:
                self.stdout.write(f"⏭️  Core subject exists: {subject.name}")
            created_subjects.append(subject)
        
        return created_subjects

    def create_elective_subjects(self):
        """Create elective subjects for each programme"""
        
        electives_by_programme = {
            'general_arts': [
                {'name': 'Economics', 'code': 'ECON', 'description': 'Economics for General Arts'},
                {'name': 'Geography', 'code': 'GEOG', 'description': 'Geography'},
                {'name': 'History', 'code': 'HIST', 'description': 'History'},
                {'name': 'Elective Mathematics', 'code': 'MATH_ELEC', 'description': 'Elective Mathematics'},
                {'name': 'Literature-in-English', 'code': 'LIT', 'description': 'Literature in English'},
                {'name': 'French', 'code': 'FRENCH', 'description': 'French Language'},
                {'name': 'Government', 'code': 'GOVT', 'description': 'Government'},
                {'name': 'Christian Religious Studies', 'code': 'CRS', 'description': 'Christian Religious Studies'},
            ],
            'general_science': [
                {'name': 'Physics', 'code': 'PHYS', 'description': 'Physics'},
                {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Chemistry'},
                {'name': 'Biology', 'code': 'BIO', 'description': 'Biology'},
                {'name': 'Elective Mathematics', 'code': 'MATH_ELEC', 'description': 'Elective Mathematics'},
                {'name': 'Geography', 'code': 'GEOG', 'description': 'Geography'},
                {'name': 'Elective ICT', 'code': 'ICT_ELEC', 'description': 'Elective ICT/Computing'},
            ],
            'business': [
                {'name': 'Financial Accounting', 'code': 'FIN_ACC', 'description': 'Financial Accounting'},
                {'name': 'Business Management', 'code': 'BUS_MGT', 'description': 'Business Management'},
                {'name': 'Economics', 'code': 'ECON', 'description': 'Economics'},
                {'name': 'Costing', 'code': 'COST', 'description': 'Costing'},
                {'name': 'Elective Mathematics', 'code': 'MATH_ELEC', 'description': 'Elective Mathematics'},
            ],
            'home_economics': [
                {'name': 'Management in Living', 'code': 'MGT_LIV', 'description': 'Management in Living'},
                {'name': 'Food and Nutrition', 'code': 'FOOD_NUT', 'description': 'Food and Nutrition'},
                {'name': 'Clothing and Textiles', 'code': 'CLOTH_TEX', 'description': 'Clothing and Textiles'},
                {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Chemistry'},
                {'name': 'Biology', 'code': 'BIO', 'description': 'Biology'},
            ],
            'visual_arts': [
                {'name': 'Graphic Design', 'code': 'GRAPH_DES', 'description': 'Graphic Design'},
                {'name': 'General Knowledge in Art', 'code': 'GEN_ART', 'description': 'General Knowledge in Art'},
                {'name': 'Textiles', 'code': 'TEXTILES', 'description': 'Textiles'},
                {'name': 'Ceramics', 'code': 'CERAMICS', 'description': 'Ceramics'},
                {'name': 'Leather Work', 'code': 'LEATHER', 'description': 'Leather Work'},
                {'name': 'Economics', 'code': 'ECON', 'description': 'Economics'},
            ],
            'agricultural_science': [
                {'name': 'General Agriculture', 'code': 'GEN_AGR', 'description': 'General Agriculture'},
                {'name': 'Animal Husbandry', 'code': 'ANIM_HUS', 'description': 'Animal Husbandry'},
                {'name': 'Crop Science', 'code': 'CROP_SCI', 'description': 'Crop Science'},
                {'name': 'Agricultural Economics', 'code': 'AGR_ECON', 'description': 'Agricultural Economics'},
                {'name': 'Elective Mathematics', 'code': 'MATH_ELEC', 'description': 'Elective Mathematics'},
                {'name': 'Chemistry', 'code': 'CHEM', 'description': 'Chemistry'},
            ],
        }
        
        created_subjects = {}
        for programme_name, electives in electives_by_programme.items():
            created_subjects[programme_name] = []
            for elec_data in electives:
                subject, created = Subject.objects.get_or_create(
                    code=elec_data['code'],
                    defaults={
                        'name': elec_data['name'],
                        'description': elec_data['description'],
                        'subject_type': 'elective',
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"✅ Created elective: {subject.name}"))
                else:
                    self.stdout.write(f"⏭️  Elective exists: {subject.name}")
                created_subjects[programme_name].append(subject)
        
        return created_subjects

    def assign_subjects_to_programmes(self):
        """Assign core subjects to ALL programmes and electives to specific programmes"""
        
        # Get all core subjects
        core_subjects = Subject.objects.filter(subject_type='core')
        
        # Get all programmes
        programmes = Programme.objects.all()
        
        self.stdout.write("\n📚 Assigning core subjects to ALL programmes...")
        for programme in programmes:
            for order, subject in enumerate(core_subjects, start=1):
                prog_subject, created = ProgrammeSubject.objects.get_or_create(
                    programme=programme,
                    subject=subject,
                    defaults={
                        'is_required': True,
                        'order': order
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"✅ Assigned {subject.name} to {programme.get_name_display()}"))
        
        # Assign elective subjects to specific programmes
        self.stdout.write("\n📖 Assigning elective subjects to programmes...")
        
        electives_mapping = {
            'general_arts': ['ECON', 'GEOG', 'HIST', 'MATH_ELEC', 'LIT', 'FRENCH', 'GOVT', 'CRS'],
            'general_science': ['PHYS', 'CHEM', 'BIO', 'MATH_ELEC', 'GEOG', 'ICT_ELEC'],
            'business': ['FIN_ACC', 'BUS_MGT', 'ECON', 'COST', 'MATH_ELEC'],
            'home_economics': ['MGT_LIV', 'FOOD_NUT', 'CLOTH_TEX', 'CHEM', 'BIO'],
            'visual_arts': ['GRAPH_DES', 'GEN_ART', 'TEXTILES', 'CERAMICS', 'LEATHER', 'ECON'],
            'agricultural_science': ['GEN_AGR', 'ANIM_HUS', 'CROP_SCI', 'AGR_ECON', 'MATH_ELEC', 'CHEM'],
        }
        
        for programme in programmes:
            if programme.name in electives_mapping:
                elective_codes = electives_mapping[programme.name]
                elective_subjects = Subject.objects.filter(code__in=elective_codes, subject_type='elective')
                
                for order, subject in enumerate(elective_subjects, start=len(core_subjects) + 1):
                    prog_subject, created = ProgrammeSubject.objects.get_or_create(
                        programme=programme,
                        subject=subject,
                        defaults={
                            'is_required': True,
                            'order': order
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f"✅ Assigned {subject.name} to {programme.get_name_display()}"))
