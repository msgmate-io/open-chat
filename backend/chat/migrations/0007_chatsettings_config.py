# Generated by Django 4.1.2 on 2024-04-11 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_chatsettings_delete_chatextratitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatsettings',
            name='config',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
