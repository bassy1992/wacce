# Generated migration for adding Instructor models

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_lesson_notes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(choices=[('dr', 'Dr.'), ('prof', 'Prof.'), ('mr', 'Mr.'), ('mrs', 'Mrs.'), ('ms', 'Ms.')], max_length=10)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('role', models.CharField(choices=[('principal', 'Principal'), ('director', 'Academic Director'), ('head', 'Department Head'), ('coordinator', 'Coordinator'), ('lecturer', 'Lecturer'), ('tutor', 'Tutor')], max_length=50)),
                ('position_title', models.CharField(help_text='e.g., Principal & Mathematics Specialist', max_length=200)),
                ('highest_degree', models.CharField(help_text='e.g., PhD Mathematics Education', max_length=100)),
                ('institution', models.CharField(help_text='e.g., University of Ghana', max_length=200)),
                ('years_experience', models.IntegerField(help_text='Years of teaching experience')),
                ('bio', models.TextField(blank=True, help_text='Brief biography')),
                ('photo', models.URLField(blank=True, help_text='URL to instructor photo')),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('display_order', models.IntegerField(default=0, help_text='Order to display on team page')),
                ('is_active', models.BooleanField(default=True)),
                ('is_featured', models.BooleanField(default=False, help_text='Show on homepage')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['display_order', 'last_name'],
            },
        ),
        migrations.CreateModel(
            name='InstructorSpecialty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_primary', models.BooleanField(default=False, help_text='Primary specialty')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialties', to='courses.instructor')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructors', to='courses.subject')),
            ],
            options={
                'verbose_name_plural': 'Instructor Specialties',
                'ordering': ['-is_primary', 'subject__name'],
                'unique_together': {('instructor', 'subject')},
            },
        ),
    ]
