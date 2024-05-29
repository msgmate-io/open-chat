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
    sender_id: str
    type: str = BotMessageTypes.ai_response_v1.value
    
    async def perform_action(self, user):
        pass
    