from django.db import models
from django.db.models import Q
from rest_framework import serializers
from django.core.paginator import Paginator
from core import models as management_models
from uuid import uuid4

class Chat(models.Model):
    
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    u1 = models.ForeignKey("core.User", on_delete=models.CASCADE, related_name="u1")
    u2 = models.ForeignKey("core.User", on_delete=models.CASCADE, related_name="u2")
    
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
    def get_chat(cls, users):
        chat = Chat.objects.filter(u1__in=users, u2__in=users).order_by("-created")
        if chat.exists():
            return chat.first()
        return None
    
    def get_unread_count(self, user):
        return self.get_messages().filter(read=False, recipient=user).count()
    
    def get_newest_message(self):
        return self.get_messages().order_by("-created").first()
    
    @classmethod
    def get_or_create_chat(cls, user1, user2):
        chat = cls.get_chat([user1, user2])
        if chat:
            return chat
        else:
            return cls.objects.create(u1=user1, u2=user2)
        
    def get_past_messages_openai(self, message_depth):
        return OpenAiChatSerializer(self, message_depth=message_depth).data

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
    
    class Meta:
        model = Chat
        fields = ['uuid', 'u1', 'u2', 'created']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if 'request' in self.context:
            user = self.context['request'].user
            partner = instance.get_partner(user)
            profile = management_models.profile.UserProfileSerializer(partner.profile).data
            username = partner.username
            profile['uuid'] = str(partner.uuid)
            representation['partner'] = profile
            representation['partner']['username'] = username

            representation['unread_count'] = instance.get_unread_count(user)
            representation['newest_message'] = MessageSerializer(instance.get_newest_message()).data
            del representation['u1']
            del representation['u2']
        else:
            representation['u1'] = str(instance.u1.uuid)
            representation['u2'] = str(instance.u2.uuid)
            
        
        return representation
    

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    
    sender = models.ForeignKey("core.User", on_delete=models.CASCADE, related_name="message_sender")
    recipient = models.ForeignKey("core.User", on_delete=models.CASCADE, related_name="message_recipient")
    
    text = models.TextField()
    
    read = models.BooleanField(default=False)
    
    created = models.DateTimeField(auto_now_add=True)
    
    
class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = ['uuid', 'sender', 'created', 'text', 'read']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['sender'] = str(instance.sender.uuid)
        
        return representation
    
    
class OpenAiMessageSerializer(serializers.ModelSerializer): 
    
    class Meta:
        model = Message
        fields = ['uuid']
        
    def to_representation(self, instance):
        
        representation = super().to_representation(instance)
        
        representation['role'] = "assistant" if instance.sender.automated else "user"
        representation['content'] = instance.text
        del representation['uuid']
        
        return representation

class OpenAiChatSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Chat
        fields = ['uuid', 'u1', 'u2', 'created']
        
    def __init__(self, *args, message_depth=5, **kwargs):
        super().__init__(*args, **kwargs)
        self.message_depth = message_depth
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        messages = instance.get_messages()
        representation['messages'] = OpenAiMessageSerializer(Paginator(messages, self.message_depth).page(1), many=True).data
        
        
class ChatSessions(models.Model):
    user = models.ForeignKey("core.User", on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ChatConnections(models.Model):
    
    user = models.ForeignKey("core.User", on_delete=models.CASCADE)
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(auto_now=True)
    time_created = models.DateTimeField(auto_now_add=True)
    
    @classmethod
    def is_user_online(cls, user):
        return cls.objects.filter(user=user, is_online=True).exists()