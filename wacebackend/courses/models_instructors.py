"""
Instructor/Team models for the courses app
Add these to your courses/models.py file
"""
from django.db import models


class Instructor(models.Model):
    """Expert instructors/teachers"""
    TITLE_CHOICES = [
        ('dr', 'Dr.'),
        ('prof', 'Prof.'),
        ('mr', 'Mr.'),
        ('mrs', 'Mrs.'),
        ('ms', 'Ms.'),
    ]
    
    ROLE_CHOICES = [
        ('principal', 'Principal'),
        ('director', 'Academic Director'),
        ('head', 'Department Head'),
        ('coordinator', 'Coordinator'),
        ('lecturer', 'Lecturer'),
        ('tutor', 'Tutor'),
    ]
    
    # Basic Info
    title = models.CharField(max_length=10, choices=TITLE_CHOICES)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    position_title = models.CharField(max_length=200, help_text="e.g., Principal & Mathematics Specialist")
    
    # Qualifications
    highest_degree = models.CharField(max_length=100, help_text="e.g., PhD Mathematics Education")
    institution = models.CharField(max_length=200, help_text="e.g., University of Ghana")
    years_experience = models.IntegerField(help_text="Years of teaching experience")
    
    # Profile
    bio = models.TextField(blank=True, help_text="Brief biography")
    photo = models.URLField(blank=True, help_text="URL to instructor photo")
    email = models.EmailField(blank=True)
    
    # Display
    display_order = models.IntegerField(default=0, help_text="Order to display on team page")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'last_name']
    
    def __str__(self):
        return f"{self.get_title_display()} {self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        return f"{self.get_title_display()} {self.first_name} {self.last_name}"
    
    @property
    def experience_text(self):
        return f"{self.years_experience}+ years"


class InstructorSpecialty(models.Model):
    """Subjects/specialties that instructors teach"""
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='specialties')
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, related_name='instructors')
    is_primary = models.BooleanField(default=False, help_text="Primary specialty")
    
    class Meta:
        verbose_name_plural = "Instructor Specialties"
        unique_together = ['instructor', 'subject']
        ordering = ['-is_primary', 'subject__name']
    
    def __str__(self):
        return f"{self.instructor.full_name} - {self.subject.name}"
