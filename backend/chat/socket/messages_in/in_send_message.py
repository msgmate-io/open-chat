from channels.db import database_sync_to_async
from dataclasses import dataclass
from chat.models import Chat, ChatSerializer, DataMessage, MessageSerializer, Message
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth import get_user_model
from chat.socket.utils import InMessageBase
from chat.socket.messages_out import OutNewMessage
from typing import Optional

@dataclass
class InSendMessage(InMessageBase):
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
        
        OutNewMessage(
            sender_id=str(user.uuid),
            message=serialized_message,
            chat=chat_serialized
        ).send(str(partner.uuid))
        
        return {"status": "ok", "data": MessageSerializer(message).data}
