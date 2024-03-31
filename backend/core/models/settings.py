from django.db import models
from django.conf import settings

class UserSetting(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_settings_user")
    show_second_name = models.BooleanField(default=False)
    