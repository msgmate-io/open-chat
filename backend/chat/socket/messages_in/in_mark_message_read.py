from channels.db import database_sync_to_async
from dataclasses import dataclass
from chat.models import Message, MessageSerializer
from django.contrib.auth import get_user_model
from chat.socket.utils import InMessageBase

@dataclass
class InMarkMessageRead(InMessageBase):
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