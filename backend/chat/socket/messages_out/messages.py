from chat.socket.utils import custom_event, OutMessageBase
from chat.socket.enums import OutMessageTypes
from dataclasses import dataclass

@dataclass
class OutUserWentOnline(OutMessageBase):
    sender_id: str
    type: str = OutMessageTypes.user_went_online.value
    
    def build_event(self):
        return custom_event(
            "userWentOnline",
            {
                "userId": self.sender_id
            }
        )
    
@dataclass
class OutUserWentOffline(OutMessageBase):
    sender_id: str
    type: str = OutMessageTypes.user_went_offline.value

    def build_event(self):
        return custom_event(
            "userWentOffline",
            {
                "userId": self.sender_id
            }
        )
        
@dataclass
class OutNewMessage(OutMessageBase):
    sender_id: str
    message: dict
    chat: dict
    type: str = OutMessageTypes.new_message.value
    
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
class OutNewPartialMessage(OutMessageBase):
    sender_id: str
    message: dict
    chat: dict
    type: str = OutMessageTypes.new_partial_message.value
    
    def build_event(self):
        return custom_event(
            "newPartialMessage",
            {
                "senderId": self.sender_id,
                "message": self.message,
                "chat": self.chat
            }
        )

