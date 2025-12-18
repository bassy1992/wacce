# Generated migration for LessonCompletion model

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courses', '0002_alter_subject_options_alter_subject_unique_together_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='LessonCompletion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed_at', models.DateTimeField(auto_now_add=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completions', to='courses.lesson')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_completions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-completed_at'],
                'unique_together': {('student', 'lesson')},
            },
        ),
    ]
