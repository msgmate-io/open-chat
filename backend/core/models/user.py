from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from core.models.profile import UserProfile
from core.models.settings import UserSetting
from rest_framework import serializers

class UserManager(BaseUserManager):
    def create(self, password, **kwargs):
        user = self.model(
            **kwargs,
        )

        user.set_password(password)
        user.save(using=self._db)
        profile = UserProfile.objects.create(user=user)
        settings = UserSetting.objects.create(user=user)
        user.profile = profile
        user.settings = settings
        user.save()
        return user
    
    def create_user(self, password, **kwargs):
        user = self.model(
            **kwargs,
        )

        user.set_password(password)
        user.save(using=self._db)
        profile = UserProfile.objects.create(user=user)
        settings = UserSetting.objects.create(user=user)
        user.profile = profile
        user.settings = settings
        user.save()
        return user, profile, settings
    
    def create_user_profile_settings(self, password, **kwargs):
        user = self.model(
            **kwargs,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        profile = UserProfile.objects.create(user=user)
        settings = UserSetting.objects.create(user=user)
        user.profile = profile
        user.settings = settings
        user.save()
        return user, profile, settings


    def create_superuser(self, password, **kwargs):
        kwargs["is_staff"] = True
        kwargs["is_superuser"] = True

        user = self.create(password, **kwargs)
        return user
    

class User(AbstractUser):
    objects = UserManager()

    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    automated = models.BooleanField(default=False)

    profile = models.OneToOneField(
        'UserProfile', on_delete=models.CASCADE, related_name="user_profile", null=True)
    settings = models.OneToOneField(
        'UserSetting', on_delete=models.CASCADE, related_name="user_settings", null=True)
    
class UserSelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'uuid', 'email',  'is_staff', 'username', 'is_superuser', 'date_joined', 'last_login', 'automated']
        

class UserFieldsSeralizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'uuid', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'date_joined', 'last_login', 'automated']
