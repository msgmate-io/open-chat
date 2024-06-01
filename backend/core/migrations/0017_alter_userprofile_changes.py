# Generated by Django 4.1.2 on 2024-06-01 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_botcontroller'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='changes',
            field=models.ManyToManyField(blank=True, related_name='user_profile_changes', to='core.changehistory'),
        ),
    ]