from channels.db import database_sync_to_async
from dataclasses import dataclass
from chat.models import Chat, ChatSerializer
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth import get_user_model
from chat.socket.utils import InMessageBase
from chat.socket.messages_out import OutNewPartialMessage
from typing import Optional

@dataclass
class InPartialMessage(InMessageBase):
    chat_id: str
    recipient_id: str
    text: str
    tmp_id: str = "tmp"
    type: str = "partial_message"
    send_as_user: bool = False
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
        
        if self.send_as_user:
            if not sender.profile.is_bot:
                return {"status": "error", "data": "Only bots can send messages as a user"}
            sender = recipient
        
        partner = chat.get_partner(sender) 
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
            "user": sender
        }).data
        
        OutNewPartialMessage(
            sender_id=str(sender.uuid),
            message=tmp_message,
            chat=chat_serialized
        ).send(str(partner.uuid) if not self.send_as_user else str(sender.uuid))
        
        return {"status": "ok", "data": tmp_message}
