from django.db import models

class UserSetting(models.Model):

    user = models.ForeignKey("core.User", on_delete=models.CASCADE, related_name="user_settings_user")
    show_second_name = models.BooleanField(default=False)
    