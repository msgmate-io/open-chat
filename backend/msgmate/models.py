from django.db import models
from django.conf import settings

# Create your models here.

class UserTokens(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_tokens_user")

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    tokens = models.IntegerField(default=0)

class TokenUsage(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="token_usage_user")

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class UsageTypes(models.TextChoices):
        OPENAI_COMPLETION = 'OPENAI_COMPLETION'
        DEEPINFRA_COMPLETION = 'DEEPINFRA_COMPLETION'
        GROQ_COMPLETION = 'GROQ_COMPLETION'
        CUSTOM = 'CUSTOM'
    
    usage_type = models.CharField(max_length=255, choices=UsageTypes.choices)
    
    tokens_used = models.IntegerField(default=0)
    
    request_data = models.JSONField()