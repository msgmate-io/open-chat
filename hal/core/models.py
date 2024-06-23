from django.db import models
from django.conf import settings
from uuid import uuid4

class ActiveTask(models.Model):
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    chat_id = models.CharField(max_length=255, unique=True)
    task_id = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class TaskTypes(models.TextChoices):
        TEXT_CHAT = "text_chat"
        AUDIO_CHAT = "audio_chat"
        
    task_type = models.CharField(max_length=255, choices=TaskTypes.choices, default=TaskTypes.TEXT_CHAT)