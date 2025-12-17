from django.core.management.base import BaseCommand
from students.models import Programme
from courses.models import Subject


class Command(BaseCommand):
    help = 'Load initial programmes and core subjects into the database'

    def handle(self, *args, **options):
        self.stdout.write("=" * 60)
        self.stdout.write("Loading Initial Data")
        self.stdout.write("=" * 60)
        
        # Create programmes
        self.stdout.write("\n📚 Creating Programmes...")
        programmes_data = [
            {
                'name': 'general_science',
                'description': 'Comprehensive science education covering Physics, Chemistry, Biology, and Mathematics',
                'price': 500.00,
                'duration_months': 12,
            },
            {
                'name': 'business',
                'description': 'Business studies including Economics, Accounting, and Business Management',
                'price': 500.00,
                'duration_months': 12,
            },
            {
                'name': 'general_arts',
                'description': 'Arts and humanities including Literature, History, and Government',
                'price': 500.00,
                'duration_months': 12,
            },
            {
                'name': 'visual_arts',
                'description': 'Creative arts including Graphic Design, Painting, and Sculpture',
                'price': 500.00,
                'duration_months': 12,
            },
            {
                'name': 'home_economics',
                'description': 'Home Economics including Food and Nutrition, Clothing and Textiles',
                'price': 500.00,
                'duration_months': 12,
            },
            {
                'name': 'agricultural_science',
                'description': 'Agricultural science and practices',
                'price': 500.00,
                'duration_months': 12,
            },
        ]
        
        prog_created = 0
        for prog_data in programmes_data:
            programme, created = Programme.objects.get_or_create(
                name=prog_data['name'],
                defaults=prog_data
            )
            if created:
                prog_created += 1
                self.stdout.write(self.style.SUCCESS(f"✅ Created: {programme.get_name_display()}"))
            else:
                self.stdout.write(f"⏭️  Already exists: {programme.get_name_display()}")
        
        # Create core subjects
        self.stdout.write("\n📖 Creating Core Subjects...")
        core_subjects = [
            {
                'name': 'English Language',
                'code': 'ENG',
                'description': 'Core English Language',
                'subject_type': 'core',
            },
            {
                'name': 'Mathematics (Core)',
                'code': 'MATH_CORE',
                'description': 'Core Mathematics',
                'subject_type': 'core',
            },
            {
                'name': 'Integrated Science',
                'code': 'INT_SCI',
                'description': 'Integrated Science',
                'subject_type': 'core',
            },
            {
                'name': 'Social Studies',
                'code': 'SOC_STD',
                'description': 'Social Studies',
                'subject_type': 'core',
            },
        ]
        
        subj_created = 0
        for subj_data in core_subjects:
            subject, created = Subject.objects.get_or_create(
                code=subj_data['code'],
                defaults=subj_data
            )
            if created:
                subj_created += 1
                self.stdout.write(self.style.SUCCESS(f"✅ Created: {subject.name}"))
            else:
                self.stdout.write(f"⏭️  Already exists: {subject.name}")
        
        # Summary
        self.stdout.write("\n" + "=" * 60)
        self.stdout.write(self.style.SUCCESS(f"✅ Done! Created {prog_created} programmes and {subj_created} subjects"))
        self.stdout.write("=" * 60)
        
        self.stdout.write(f"\n📊 Database Summary:")
        self.stdout.write(f"   Total Programmes: {Programme.objects.count()}")
        self.stdout.write(f"   Total Subjects: {Subject.objects.count()}")
