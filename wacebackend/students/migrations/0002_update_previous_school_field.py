# Generated migration for updating previous_school field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='previous_school',
            field=models.CharField(max_length=200, help_text='Select your previous high school'),
        ),
    ]
