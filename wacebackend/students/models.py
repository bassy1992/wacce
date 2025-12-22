from django.db import models
from django.contrib.auth.models import User

# Ghana High Schools List
GHANA_HIGH_SCHOOLS = [
    "Accra Academy", "Achimota School", "Armed Forces SHS", "Labone SHS",
    "Accra Girls' SHS", "Wesley Girls' High School", "Holy Trinity Cathedral SHS",
    "Kaneshie SHS", "Accra High School", "St. Thomas Aquinas SHS", "Tema SHS",
    "Tema Methodist Day SHS", "Tema Technical Institute", "Presbyterian Boys' SHS (PRESEC)",
    "Aburi Girls' SHS", "Pope John SHS and Minor Seminary", "St. John's Grammar School",
    "Madina SHS", "Kpone SHS", "Nungua SHS", "Teshie SHS", "Odorgonno SHS",
    "Dansoman SHS", "Gbawe Community SHS", "Haatso SHS",
    # Ashanti Region
    "Prempeh College", "Opoku Ware School", "Yaa Asantewaa Girls' SHS",
    "St. Louis SHS", "T.I. Ahmadiyya SHS", "Kumasi High School", "Kumasi Academy",
    "Kumasi Girls' SHS", "Kumasi SHS", "Osei Kyeretwie SHS", "Simms SHS",
    "Kumasi Anglican SHS", "Adventist SHS, Agona", "Konongo Odumase SHS",
    "Juaben SHS", "Bekwai SHS", "Offinso SHS", "Ejisu SHS",
    "Mampong Technical College", "Agogo State College", "Asante Mampong Methodist Girls' SHS",
    # Eastern Region
    "Koforidua SHS", "Koforidua SHTS", "Okuapeman SHS", "Akim Oda SHS",
    "Akim Tafo SHS", "Kibi Presbyterian SHS", "Mpraeso SHS", "Nkawkaw SHS",
    "Akro SHS", "Asuom SHS", "Nsutam Catholic SHS", "Akwatia SHS",
    "Suhum SHS", "Somanya SHS", "Krobo Girls' SHS", "Anum SHS",
    # Western Region
    "Mfantsipim School", "St. Augustine's College", "Holy Child School",
    "Ghana SHS", "Fijai SHS", "Sekondi College", "Takoradi SHS",
    "Takoradi Technical Institute", "Tarkwa SHS", "Prestea SHS",
    "Sefwi Wiawso SHS", "Bibiani SHS", "Asankragwa SHS", "Ahantaman Girls' SHS",
    "Shama SHS", "Effia-Kuma SHS",
    # Central Region
    "Adisadel College", "Ghana National College", "Aggrey Memorial SHS",
    "Swedru SHS", "Apam SHS", "Mankessim SHS", "Saltpond Methodist SHS",
    "Winneba SHS", "Komenda SHS", "Biriwa SHS", "Assin State College",
    "Assin Manso SHS",
    # Volta Region
    "Mawuli School", "Keta SHTS", "Kpando SHS", "Ho SHS",
    "Ho Technical Institute", "Hohoe E.P. SHS", "Hohoe Municipal Assembly SHS",
    "Anlo SHS", "Avenor SHS", "Sogakope SHS", "Tongu SHS",
    "Denu SHS", "Dzodze SHS", "Peki SHS", "Ve SHS",
    # Northern Region
    "Tamale SHS", "Tamale Girls' SHS", "Ghana SHS, Tamale",
    "Savelugu SHS", "Yendi SHS", "Bimbilla SHS", "Salaga SHS",
    "Tolon SHS", "Gushegu SHS", "Karaga SHS", "Zabzugu SHS",
    # Upper East Region
    "Bolgatanga SHS", "Bolgatanga Girls' SHS", "Navrongo SHS",
    "Zuarungu SHS", "Bongo SHS", "Paga SHS", "Sandema SHS", "Zebilla SHS",
    # Upper West Region
    "Wa SHS", "Wa T.I. Ahmadiyya SHS", "Jirapa SHS", "Lawra SHS",
    "Nadowli SHS", "Tumu SHS",
    # Brong Ahafo Region
    "Sunyani SHS", "Sunyani SHTS", "Bechem Presbyterian SHS", "Berekum SHS",
    "Dormaa SHS", "Wenchi Methodist SHS", "Techiman SHS", "Atebubu SHS",
    "Kintampo SHS", "Nkoranza SHS", "Drobo SHS", "Duayaw Nkwanta SHS",
    # Other
    "Other (Not Listed)",
]

class Programme(models.Model):
    PROGRAMME_CHOICES = [
        ('general_science', 'General Science'),
        ('general_arts', 'General Arts'),
        ('business', 'Business'),
        ('visual_arts', 'Visual Arts'),
        ('home_economics', 'Home Economics'),
        ('agricultural_science', 'Agricultural Science'),
    ]
    
    name = models.CharField(max_length=100, choices=PROGRAMME_CHOICES, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_months = models.IntegerField(default=12)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.get_name_display()

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    programme = models.ForeignKey(Programme, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    # Academic info
    previous_school = models.CharField(max_length=200)
    wassce_year = models.IntegerField()
    index_number = models.CharField(max_length=20, unique=True)
    
    # Email notification preferences
    email_course_updates = models.BooleanField(default=True)
    email_assignment_reminders = models.BooleanField(default=True)
    email_announcements = models.BooleanField(default=True)
    email_weekly_summary = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.programme.name}"

class StudentProgress(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='progress')
    subject = models.CharField(max_length=100)
    current_grade = models.CharField(max_length=2, blank=True)
    target_grade = models.CharField(max_length=2)
    progress_percentage = models.IntegerField(default=0)
    lessons_completed = models.IntegerField(default=0)
    total_lessons = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['student', 'subject']
    
    def __str__(self):
        return f"{self.student.user.username} - {self.subject}: {self.progress_percentage}%"