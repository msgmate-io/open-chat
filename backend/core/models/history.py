from django.db import models
from uuid import uuid4
from django.conf import settings

class ChangeHistory(models.Model):
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="change_history_owner", null=True, blank=True)
    
    model = models.CharField(max_length=50)
    change_made = models.DateTimeField(auto_now_add=True)
    
    change = models.JSONField(default=dict)