"""
Django management command to populate topics for subjects
Usage: python manage.py populate_topics
"""
from django.core.management.base import BaseCommand
from courses.models import Subject, Topic


class Command(BaseCommand):
    help = 'Populate topics for all subjects'

    def handle(self, *args, **options):
        self.stdout.write("=" * 70)
        self.stdout.write("POPULATING TOPICS FOR ALL SUBJECTS")
        self.stdout.write("=" * 70)
        
        # Define topics for each subject
        topics_data = {
            'English Language': [
                {'title': 'Grammar and Syntax', 'description': 'Master the rules of English grammar, sentence structure, and proper syntax', 'duration': 8},
                {'title': 'Reading Comprehension', 'description': 'Develop skills in understanding and analyzing written texts', 'duration': 6},
                {'title': 'Essay Writing', 'description': 'Learn to write clear, coherent, and well-structured essays', 'duration': 10},
                {'title': 'Vocabulary Building', 'description': 'Expand your English vocabulary and word usage', 'duration': 5},
                {'title': 'Oral Communication', 'description': 'Improve speaking and listening skills', 'duration': 6},
                {'title': 'Literature Analysis', 'description': 'Analyze and interpret literary works', 'duration': 8},
            ],
            'Mathematics (Core)': [
                {'title': 'Number Systems', 'description': 'Understanding integers, fractions, decimals, and real numbers', 'duration': 6},
                {'title': 'Algebra Basics', 'description': 'Introduction to algebraic expressions and equations', 'duration': 8},
                {'title': 'Geometry', 'description': 'Study of shapes, angles, and spatial relationships', 'duration': 10},
                {'title': 'Statistics and Probability', 'description': 'Data analysis, graphs, and probability concepts', 'duration': 7},
                {'title': 'Trigonometry', 'description': 'Study of triangles and trigonometric functions', 'duration': 8},
            ],
            'Integrated Science': [
                {'title': 'Scientific Method', 'description': 'Understanding the scientific process and experimentation', 'duration': 4},
                {'title': 'Matter and Energy', 'description': 'Properties of matter and forms of energy', 'duration': 6},
                {'title': 'Living Organisms', 'description': 'Study of plants, animals, and microorganisms', 'duration': 8},
                {'title': 'Earth and Space', 'description': 'Understanding our planet and the solar system', 'duration': 6},
                {'title': 'Forces and Motion', 'description': 'Physics concepts of force, motion, and mechanics', 'duration': 7},
                {'title': 'Chemical Reactions', 'description': 'Introduction to chemistry and chemical processes', 'duration': 7},
            ],
            'Social Studies': [
                {'title': 'Geography of Ghana', 'description': 'Physical and human geography of Ghana', 'duration': 6},
                {'title': 'History of Ghana', 'description': 'Pre-colonial to modern Ghana', 'duration': 8},
                {'title': 'Government and Politics', 'description': 'Understanding governance systems and political structures', 'duration': 7},
                {'title': 'Economics Basics', 'description': 'Introduction to economic concepts and systems', 'duration': 6},
                {'title': 'Social Issues', 'description': 'Contemporary social challenges and solutions', 'duration': 5},
            ],
            'ICT/Computing': [
                {'title': 'Computer Basics', 'description': 'Introduction to computers and digital literacy', 'duration': 4},
                {'title': 'Microsoft Office Suite', 'description': 'Word processing, spreadsheets, and presentations', 'duration': 8},
                {'title': 'Internet and Email', 'description': 'Web browsing, online safety, and email communication', 'duration': 5},
                {'title': 'Programming Fundamentals', 'description': 'Introduction to coding and algorithms', 'duration': 10},
                {'title': 'Digital Media', 'description': 'Creating and editing digital content', 'duration': 6},
            ],
            'Economics': [
                {'title': 'Basic Economic Concepts', 'description': 'Scarcity, choice, and opportunity cost', 'duration': 6},
                {'title': 'Demand and Supply', 'description': 'Market forces and price determination', 'duration': 7},
                {'title': 'Production and Costs', 'description': 'Factors of production and cost analysis', 'duration': 8},
                {'title': 'Market Structures', 'description': 'Perfect competition, monopoly, and oligopoly', 'duration': 7},
                {'title': 'National Income', 'description': 'GDP, GNP, and economic indicators', 'duration': 6},
                {'title': 'Money and Banking', 'description': 'Financial systems and monetary policy', 'duration': 7},
            ],
            'Geography': [
                {'title': 'Physical Geography', 'description': 'Landforms, climate, and natural features', 'duration': 8},
                {'title': 'Human Geography', 'description': 'Population, settlement, and urbanization', 'duration': 7},
                {'title': 'Map Reading', 'description': 'Understanding maps, scales, and coordinates', 'duration': 6},
                {'title': 'Environmental Issues', 'description': 'Climate change, pollution, and conservation', 'duration': 7},
                {'title': 'Economic Geography', 'description': 'Agriculture, industry, and trade', 'duration': 6},
            ],
            'History': [
                {'title': 'Ancient Civilizations', 'description': 'Early human societies and empires', 'duration': 8},
                {'title': 'Medieval Period', 'description': 'Middle Ages and feudal systems', 'duration': 7},
                {'title': 'Age of Exploration', 'description': 'European exploration and colonization', 'duration': 6},
                {'title': 'World Wars', 'description': 'WWI and WWII causes and consequences', 'duration': 10},
                {'title': 'African Independence', 'description': 'Decolonization and independence movements', 'duration': 8},
                {'title': 'Modern History', 'description': 'Contemporary global events and trends', 'duration': 6},
            ],
            'Elective Mathematics': [
                {'title': 'Advanced Algebra', 'description': 'Quadratic equations, polynomials, and functions', 'duration': 10},
                {'title': 'Calculus', 'description': 'Differentiation and integration', 'duration': 12},
                {'title': 'Vectors and Matrices', 'description': 'Vector operations and matrix algebra', 'duration': 8},
                {'title': 'Complex Numbers', 'description': 'Imaginary and complex number systems', 'duration': 6},
                {'title': 'Statistics', 'description': 'Advanced statistical methods and analysis', 'duration': 8},
                {'title': 'Mechanics', 'description': 'Applied mathematics in physics', 'duration': 10},
            ],
            'Literature-in-English': [
                {'title': 'Poetry Analysis', 'description': 'Understanding and interpreting poems', 'duration': 8},
                {'title': 'Drama and Theatre', 'description': 'Study of plays and dramatic works', 'duration': 8},
                {'title': 'Prose Fiction', 'description': 'Novels and short stories analysis', 'duration': 10},
                {'title': 'African Literature', 'description': 'Works by African authors', 'duration': 8},
                {'title': 'Literary Criticism', 'description': 'Critical approaches to literature', 'duration': 6},
            ],
            'French': [
                {'title': 'French Basics', 'description': 'Alphabet, pronunciation, and greetings', 'duration': 6},
                {'title': 'Grammar Fundamentals', 'description': 'Verbs, tenses, and sentence structure', 'duration': 10},
                {'title': 'Vocabulary Building', 'description': 'Common words and phrases', 'duration': 8},
                {'title': 'Reading and Comprehension', 'description': 'Understanding French texts', 'duration': 8},
                {'title': 'Speaking and Listening', 'description': 'Conversational French skills', 'duration': 10},
                {'title': 'French Culture', 'description': 'Francophone culture and traditions', 'duration': 6},
            ],
            'Government': [
                {'title': 'Political Systems', 'description': 'Democracy, dictatorship, and governance', 'duration': 7},
                {'title': 'Constitution and Law', 'description': 'Constitutional principles and legal systems', 'duration': 8},
                {'title': 'Rights and Duties', 'description': 'Citizenship, rights, and responsibilities', 'duration': 6},
                {'title': 'International Relations', 'description': 'Global politics and diplomacy', 'duration': 7},
                {'title': 'Public Administration', 'description': 'Government operations and civil service', 'duration': 6},
            ],
            'Christian Religious Studies': [
                {'title': 'Old Testament', 'description': 'Study of the Hebrew Bible', 'duration': 10},
                {'title': 'New Testament', 'description': 'Life of Jesus and early Christianity', 'duration': 10},
                {'title': 'Christian Ethics', 'description': 'Moral teachings and values', 'duration': 6},
                {'title': 'Church History', 'description': 'Development of Christianity', 'duration': 8},
                {'title': 'Christian Living', 'description': 'Applying faith in daily life', 'duration': 6},
            ],
            'Physics': [
                {'title': 'Mechanics', 'description': 'Motion, forces, and energy', 'duration': 10},
                {'title': 'Electricity and Magnetism', 'description': 'Electric circuits and magnetic fields', 'duration': 10},
                {'title': 'Waves and Optics', 'description': 'Light, sound, and wave properties', 'duration': 8},
                {'title': 'Thermodynamics', 'description': 'Heat, temperature, and energy transfer', 'duration': 8},
                {'title': 'Modern Physics', 'description': 'Atomic structure and nuclear physics', 'duration': 8},
            ],
            'Chemistry': [
                {'title': 'Atomic Structure', 'description': 'Atoms, elements, and periodic table', 'duration': 8},
                {'title': 'Chemical Bonding', 'description': 'Ionic, covalent, and metallic bonds', 'duration': 8},
                {'title': 'Chemical Reactions', 'description': 'Types of reactions and equations', 'duration': 10},
                {'title': 'Acids and Bases', 'description': 'pH, neutralization, and salts', 'duration': 7},
                {'title': 'Organic Chemistry', 'description': 'Carbon compounds and hydrocarbons', 'duration': 10},
                {'title': 'Electrochemistry', 'description': 'Redox reactions and electrolysis', 'duration': 8},
            ],
            'Biology': [
                {'title': 'Cell Biology', 'description': 'Cell structure and functions', 'duration': 8},
                {'title': 'Genetics', 'description': 'Heredity, DNA, and inheritance', 'duration': 10},
                {'title': 'Evolution', 'description': 'Natural selection and adaptation', 'duration': 7},
                {'title': 'Human Biology', 'description': 'Body systems and physiology', 'duration': 10},
                {'title': 'Ecology', 'description': 'Ecosystems and environmental relationships', 'duration': 8},
                {'title': 'Plant Biology', 'description': 'Plant structure and photosynthesis', 'duration': 7},
            ],
        }
        
        total_created = 0
        total_existing = 0
        
        for subject_name, topics in topics_data.items():
            try:
                subject = Subject.objects.filter(name=subject_name).first()
                self.stdout.write(f"\n📚 Processing {subject.name}...")
                
                for order, topic_data in enumerate(topics, start=1):
                    topic, created = Topic.objects.get_or_create(
                        subject=subject,
                        title=topic_data['title'],
                        defaults={
                            'description': topic_data['description'],
                            'order': order,
                            'estimated_duration_hours': topic_data['duration'],
                            'is_published': True
                        }
                    )
                    
                    if created:
                        self.stdout.write(self.style.SUCCESS(f"  ✅ Created: {topic.title}"))
                        total_created += 1
                    else:
                        self.stdout.write(f"  ⏭️  Exists: {topic.title}")
                        total_existing += 1
                
                if not subject:
                    self.stdout.write(self.style.WARNING(f"  ⚠️  Subject not found: {subject_name}"))
                        
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"  ❌ Error processing {subject_name}: {str(e)}"))
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(self.style.SUCCESS("✅ DONE! Topic population complete"))
        self.stdout.write("=" * 70)
        self.stdout.write(f"\n📊 Summary:")
        self.stdout.write(f"   Topics Created: {total_created}")
        self.stdout.write(f"   Topics Already Existed: {total_existing}")
        self.stdout.write(f"   Total Topics: {total_created + total_existing}")
