from dataclasses import dataclass
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from conf.utils import CoolerJson
from chat.socket.enums import OutMessageTypes
from django.contrib.auth import get_user_model
import importlib
import json

def send_message(user_id, type: OutMessageTypes, data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(user_id, data)
    
    print(f"Sent message to {user_id} with type {type} and data", flush=True)

    if type == "new_message":
        # TODO: in the future add webhook that can be consumed from here!
        if get_user_model().objects.filter(uuid=user_id, automated=True, profile__is_bot=True).exists():
            # user.automated = True -> A bot build into the backend
            function_lookup = "msgmate.automatic_response.coordinate_response"
            function_lookup = function_lookup.split(".")
            module = importlib.import_module(".".join(function_lookup[:-1]))
            task = getattr(module, function_lookup[-1])
            task(user_id, data)

@dataclass
class OutMessageBase:

    def dict(self):
        return self.__dict__.copy()
    
    def dict_valid(self):
        return json.loads(json.dumps(self.dict(), cls=CoolerJson))
    
    def json(self):
        return json.dumps(self.dict())
    
    def action_dict(self):
        return json.loads(self.action_json())
    
    def action_json(self):
        return json.dumps(self.build_event(), cls=CoolerJson)
    
    def send(self, user_id):
        send_message(user_id, self.type, self.dict_valid())

@dataclass
class InMessageBase:
    def dict(self):
        return self.__dict__.copy()
    
    def dict_valid(self):
        return json.loads(json.dumps(self.dict(), cls=CoolerJson))
    
    def json(self):
        return json.dumps(self.dict())


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