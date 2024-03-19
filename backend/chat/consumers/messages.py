from enum import Enum
import json
from conf.utils import CoolerJson
from dataclasses import dataclass
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async, async_to_sync

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