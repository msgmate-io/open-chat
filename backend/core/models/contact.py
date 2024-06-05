from django.db import models
from django.conf import settings
from django.db.models import Q

class Contact(models.Model):
    
    created = models.DateTimeField(auto_now_add=True)

    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="contact_user1")
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="contact_user2")

    @classmethod
    def contact_exists(cls, user1, user2):
        return cls.objects.filter(Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1)).exists()