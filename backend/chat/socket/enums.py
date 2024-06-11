from enum import Enum

class OutMessageTypes(Enum):
    no_type = "no_type"
    user_went_online = "user_went_online"
    user_went_offline = "user_went_offline"
    new_message = "new_message"
    new_partial_message = "new_partial_message"
    
class InMessageTypes(Enum):
    mark_chat_message_read = "mark_chat_message_read"
    send_message = "send_message"
    partial_message = "partial_message"
    send_message_chat_title = "send_message_chat_title"
