from chat.consumers.messages import (
    IncomingMessageBase, 
    custom_event, 
    NewPartialMessage
)
from enum import Enum
from dataclasses import dataclass


class BotMessageTypes(Enum):
    ai_response_v1 = "ai_response_v1"
    

@dataclass
class InAiResponseRequested(IncomingMessageBase):
    chat_id: str
    type: str = BotMessageTypes.ai_response_v1.value
    
    async def perform_action(self, user):
        from msgmate.async_ai import get_ai_response
        return await get_ai_response(user, self.chat_id)
    