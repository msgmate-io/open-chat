from django.db import models
from django.db.models import Q
from rest_framework import serializers
from django.core.paginator import Paginator
from core import models as management_models
from django.conf import settings
from uuid import uuid4

class Chat(models.Model):
    
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    u1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="u1")
    u2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="u2")
    
    created = models.DateTimeField(auto_now_add=True)
    
    def get_partner(self, user):
        return self.u1 if self.u2 == user else self.u2
    
    def is_participant(self, user):
        return self.u1 == user or self.u2 == user
    
    @classmethod
    def get(cls, uuid):
        return cls.objects.filter(uuid=uuid).first()

    @classmethod
    def get_chats(cls, user):
        return Chat.objects.filter(Q(u1=user) | Q(u2=user)).order_by("-created")

    def get_messages(self):
        return Message.objects.filter(chat=self).order_by("-created")
    
    @classmethod
    def get_chat(cls, user1, user2):
        chat = Chat.objects.filter(Q(u1=user1, u2=user2) | Q(u1=user2, u2=user1))
        if chat.exists():
            return chat.first()
        return None
    
    def get_unread_count(self, user):
        return self.get_messages().filter(read=False, recipient=user).count()
    
    def get_newest_message(self):
        return self.get_messages().order_by("-created").first()
    
    @classmethod
    def get_or_create_chat(cls, user1, user2):
        chat = cls.get_chat(user1=user1, user2=user2)
        if chat:
            return chat
        else:
            return cls.objects.create(u1=user1, u2=user2)

class ChatSettings(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_extra_title")
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="chat_settings")
    title = models.CharField(max_length=255, blank=True, null=True)
    config = models.JSONField(blank=True, null=True)

class ChatInModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Chat
        fields = ['uuid']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.uuid
        del representation['uuid']

        representation['unread_count'] = instance.get_unread_count(self.context['user'])
        representation['newest_message'] = MessageSerializer(instance.get_newest_message()).data

        return representation
    

class ChatSerializer(serializers.ModelSerializer):
    u1 = serializers.UUIDField()
    u2 = serializers.UUIDField()
    
    class Meta:
        model = Chat
        fields = ['uuid', 'u1', 'u2', 'created']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = None
        if 'user' in self.context:
            user = self.context['user']
        elif 'request' in self.context:
            user = self.context['request'].user
        
        if user:
            partner = instance.get_partner(user)
            if not 'request' in self.context:
                profile = management_models.profile.UserProfileSerializer(partner.profile).data
            else:
                profile = management_models.profile.UserProfileSerializer(partner.profile, context={'request': self.context['request']}).data
            username = partner.username
            profile['uuid'] = str(partner.uuid)
            representation['partner'] = profile
            representation['partner']['username'] = username
            
            chat_settings = ChatSettings.objects.filter(user=user, chat=instance)
            representation['settings'] = ChatSettingsSerializer(chat_settings.first()).data if chat_settings.exists() else None
            
            if partner.profile.is_bot:
                chat_settings_bot = ChatSettings.objects.filter(user=partner, chat=instance)
                representation['bot_settings'] = ChatSettingsSerializer(chat_settings_bot.first()).data if chat_settings_bot.exists() else None

            representation['unread_count'] = instance.get_unread_count(user)
            representation['newest_message'] = MessageSerializer(instance.get_newest_message()).data
            # no need for the user refs
            del representation['u1']
            del representation['u2']
        else:
            representation['u1'] = str(instance.u1.uuid)
            representation['u2'] = str(instance.u2.uuid)
        
        return representation


class ChatSettingsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ChatSettings
        fields = ['title', 'config']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
    

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="message_sender")
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="message_recipient")
    
    text = models.TextField()
    
    read = models.BooleanField(default=False)
    
    created = models.DateTimeField(auto_now_add=True)
    
    data_message = models.OneToOneField('DataMessage', on_delete=models.CASCADE, null=True, blank=True, related_name="message_data_message")
    
class DataMessage(models.Model):
    
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    hide_message = models.BooleanField(default=False)

    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="data_message_message", null=True, blank=True)

    class DataMessageTypes(models.TextChoices):
        CUSTOM = "custom"
        AUDIO_B64 = "audio_b64"
        SIGNAL = "signal"
    
    data_type = models.CharField(max_length=255, choices=DataMessageTypes.choices, default=DataMessageTypes.CUSTOM)
    
    data = models.JSONField(default=dict)
    
class DataMessageSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = DataMessage
        fields = ['data_type', 'data', 'uuid']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        return representation


    
class MessageSerializer(serializers.ModelSerializer):
    
    sender = serializers.UUIDField()
    
    class Meta:
        model = Message
        fields = ['uuid', 'sender', 'created', 'text', 'read']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['sender'] = str(instance.sender.uuid)
        
        if instance.data_message:
            representation['data_message'] = DataMessageSerializer(instance.data_message).data
            
            if instance.data_message.hide_message:
                representation['hidden'] = True
        else:
            representation['data_message'] = None
        
        return representation
    
    
class ChatSessions(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ChatConnections(models.Model):
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(auto_now=True)
    time_created = models.DateTimeField(auto_now_add=True)
    connection_counter = models.IntegerField(default=0)
    
    @classmethod
    def is_user_online(cls, user):
        return cls.objects.filter(user=user, is_online=True).exists()
    
