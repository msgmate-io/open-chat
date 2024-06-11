from channels.db import database_sync_to_async
from dataclasses import dataclass
from chat.models import Chat, ChatSerializer, MessageSerializer, Message
from django.db.models import Q
from chat.socket.utils import InMessageBase
from chat.socket.messages_out import NewMessage

@dataclass
class InSendMessageChatTitle(InMessageBase):
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