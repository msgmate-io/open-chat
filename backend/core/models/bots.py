from django.db import models
from django.conf import settings
from uuid import uuid4
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from core.models.profile import UserProfileSerializer

class BotController(models.Model):

    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bot_controller_user")

    bot = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bot_controller_bot")

    created = models.DateTimeField(auto_now_add=True)
    
    @classmethod
    def get_bots(cls, user):
        return BotController.objects.filter(user=user).order_by("-created") 
    

class BotsControlSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BotController
        fields = ['uuid']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        representation['controller_id'] = representation['uuid']
        del representation['uuid']
        
        representation['bot'] = {
            "profile" : UserProfileSerializer(instance.bot.profile).data,
            "uuid" : str(instance.bot.uuid)
        }
        return representation