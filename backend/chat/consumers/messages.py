from enum import Enum
from channels.db import database_sync_to_async
import json
from conf.utils import CoolerJson
from dataclasses import dataclass
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async, async_to_sync
from chat.models import Message, MessageSerializer, Chat, ChatSerializer, DataMessage
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth import get_user_model

class MessageTypes(Enum):
    no_type = "no_type"
    user_went_online = "user_went_online"
    user_went_offline = "user_went_offline"
    new_message = "new_message"
    new_partial_message = "new_partial_message"
    
def send_message(user_id, type: MessageTypes, data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(user_id, data)
    
def reduction_event(action, payload):
    return {
        "type": "reduction",
        "data": {
            "action": action,
            "payload": payload
        }
    }
    
def custom_event(action, payload):
    return {
        "type": "custom",
        "data": {
            "action": action,
            "payload": payload
        }
    }

# outgoing messages
@dataclass
class MessageBase:

    def dict(self):
        return self.__dict__.copy()
    
    def dict_valid(self):
        return json.loads(json.dumps(self.dict(), cls=CoolerJson))
    
    def json(self):
        return json.dumps(self.dict())
    
    def action_dict(self):
        # basicly 'send_message' requires dict that json serializable, 
        # so sadly dumping and parsing is required to assure that
        return json.loads(self.action_json())
    
    def action_json(self):
        return json.dumps(self.build_event(), cls=CoolerJson)
    
    def send(self, user_id):
        send_message(user_id, self.type, self.dict_valid())
        
    
@dataclass
class UserWentOnline(MessageBase):
    sender_id: str
    type: str = MessageTypes.user_went_online.value
    
    def build_event(self):
        return custom_event(
            "userWentOnline",
            {
                "userId": self.sender_id
            }
        )
    
@dataclass
class UserWentOffline(MessageBase):
    sender_id: str
    type: str = MessageTypes.user_went_offline.value

    def build_event(self):
        return custom_event(
            "userWentOffline",
            {
                "userId": self.sender_id
            }
        )
        
@dataclass
class NewMessage(MessageBase):
    sender_id: str
    message: dict
    chat: dict
    type: str = MessageTypes.new_message.value
    
    def build_event(self):
        return custom_event(
            "newMessage",
            {
                "senderId": self.sender_id,
                "message": self.message,
                "chat": self.chat
            }
        )
        
@dataclass
class NewPartialMessage(MessageBase):
    sender_id: str
    message: dict
    chat: dict
    type: str = MessageTypes.new_partial_message.value
    
    def build_event(self):
        return custom_event(
            "newPartialMessage",
            {
                "senderId": self.sender_id,
                "message": self.message,
                "chat": self.chat
            }
        )

# incoming messages ======================

@dataclass
class IncomingMessageBase:
    def dict(self):
        return self.__dict__.copy()
    
    def dict_valid(self):
        return json.loads(json.dumps(self.dict(), cls=CoolerJson))
    
    def json(self):
        return json.dumps(self.dict())

class IncomingMessageTypes(Enum):
    mark_chat_message_read = "mark_chat_message_read"
    send_message = "send_message"
    partial_message = "partial_message"
    send_message_chat_title = "send_message_chat_title"
    

from typing import Optional
    
@dataclass
class InPartialMessage(IncomingMessageBase):
    chat_id: str
    recipient_id: str
    text: str
    tmp_id: str = "tmp"
    type: str = "partial_message"
    data_message: Optional[dict] = None # check chat.models.DataMessage for more details
    
    @database_sync_to_async
    def perform_action(self, user):
        sender = user
        recipient = get_user_model().objects.get(uuid=self.recipient_id)
        chats = Chat.objects.filter(
            Q(u1=sender, u2=recipient) | Q(u1=recipient, u2=sender),
            uuid=self.chat_id
        )
        if not chats.exists():
            return {"status": "error", "data": "Chat not found"}
        chat = chats.first()
        
        partner = chat.get_partner(user) 
        tmp_message = {
            "chat": chat.uuid,
            "created": timezone.now().isoformat(),
            "sender": str(sender.uuid),
            "recipient": str(partner.uuid),
            "text": self.text,
            "uuid": self.tmp_id
        }
        
        if self.data_message:
            tmp_message["data_message"] = self.data_message
            if self.data_message.get("hide_message", False):
                tmp_message["hidden"] = True

        chat_serialized = ChatSerializer(chat, context={
            "user": user
        }).data
        
        NewPartialMessage(
            sender_id=str(user.uuid),
            message=tmp_message,
            chat=chat_serialized
        ).send(str(partner.uuid))
        
        return {"status": "ok", "data": tmp_message}

@dataclass
class InSendMessage(IncomingMessageBase):
    chat_id: str
    recipient_id: str
    text: str
    type: str = "send_message"
    data_message: Optional[dict] = None # check chat.models.DataMessage for more details
    
    @database_sync_to_async
    def perform_action(self, user):
        sender = user
        recipient = get_user_model().objects.get(uuid=self.recipient_id)
        
        chats = Chat.objects.filter(
            Q(u1=sender, u2=recipient) | Q(u1=recipient, u2=sender),
            uuid=self.chat_id
        )
        if not chats.exists():
            return {"status": "error", "data": "Chat not found"}
        chat = chats.first()
        partner = chat.get_partner(user) 
        
        if self.data_message:
            print("Data message", self.data_message, flush=True)
            data_message = DataMessage.objects.create(
                **self.data_message
            )
            message = Message.objects.create(
                chat=chat,
                sender=user,
                recipient=partner,
                text=self.text,
                data_message=data_message
            )
            data_message.message = message
            data_message.save()
        else:
            message = Message.objects.create(
                chat=chat,
                sender=user,
                recipient=partner,
                text=self.text
            )
        
        serialized_message = MessageSerializer(message).data
        
        chat_serialized = ChatSerializer(chat, context={
            "user": user
        }).data
        
        print(f"Serialized message: {serialized_message}", flush=True)
        
        NewMessage(
            sender_id=str(user.uuid),
            message=serialized_message,
            chat=chat_serialized
        ).send(str(partner.uuid))
        
        return {"status": "ok", "data": MessageSerializer(message).data}
    
@dataclass
class InSendMessageChatTitle(IncomingMessageBase):
    text: str
    chat_title: str
    type: str = "send_message_chat_title"
    
    @database_sync_to_async
    def perform_action(self, user):
        # user = sender
        chat = Chat.objects.filter(
            Q(u1=user) | Q(u2=user),            
            chat_settings__title=self.chat_title
        )
        
        if not chat.exists():
            return {"status": "error", "data": "Chat not found"}
        chat = chat.first()

        
        chat_serialized = ChatSerializer(chat, context={
            "user": user
        }).data
        
        partner = chat.get_partner(user)
        message = Message.objects.create(
            chat=chat,
            sender=user,
            recipient=partner,
            text=self.text
        )

        serialized_message = MessageSerializer(message).data

        NewMessage(
            sender_id=str(user.uuid),
            message=serialized_message,
            chat=chat_serialized
        ).send(str(partner.uuid))

        return {"status": "ok", "data": MessageSerializer(message).data}

@dataclass
class InMarkMessageRead(IncomingMessageBase):
    chat_id: str
    sender_id: str
    message_id: str
    type: str = "mark_chat_message_read"
    
    @database_sync_to_async
    def perform_action(self, user):
        sender = get_user_model().objects.get(uuid=self.sender_id)
        print(f"Marking messages read from {sender} to {user}", flush=True)

        message = Message.objects.filter(
            sender=sender,
            recipient=user,
            read=False
        )
        message.update(read=True)
        message = message.first()

        return {"status": "ok", "data": MessageSerializer(message).data}