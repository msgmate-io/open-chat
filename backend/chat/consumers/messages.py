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
    match_proposal_added = "match_proposal_added"
    unconfirmed_match_added = "unconfirmed_match_added" # A new match but hasn't been viewed yet
    block_incoming_call = "block_incoming_call"
    new_incoming_call = "new_incoming_call"
    new_message = "new_message"
    new_partial_message = "new_partial_message"
    
def send_message(user_id, type: MessageTypes, data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(user_id, data)

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
        assert hasattr(self, "build_redux_action"), "Message must have a build_redux_action method"
        return json.dumps(self.build_redux_action(), cls=CoolerJson)
    
    def send(self, user_id):
        send_message(user_id, self.type, self.dict_valid())
    
@dataclass
class OutUserWentOnline(MessageBase):
    sender_id: str
    type: str = MessageTypes.user_went_online.value
    
    def build_redux_action(self):
        return {
            "action": "updateMatchProfile", 
            "payload": {
                "partnerId": self.sender_id,
                "profile": {
                    "is_online": True
                }
            }
        }
    
@dataclass
class OutUserWentOffline(MessageBase):
    sender_id: str
    type: str = MessageTypes.user_went_offline.value
    
    def build_redux_action(self):
        return {
            "action": "updateMatchProfile", 
            "payload": {
                "partnerId": self.sender_id,
                "profile": {
                    "is_online": False
                }
            }
        }
        
@dataclass 
class InMatchProposalAdded(MessageBase):
    match: dict
    category: str = "proposed"
    type: str = MessageTypes.match_proposal_added.value
    
    def build_redux_action(self):
        return {
            "action": "addMatch", 
            "payload": {
                "category": self.category,
                "match": self.match
            }
        }
        
@dataclass
class InUnconfirmedMatchAdded(MessageBase):
    match: dict
    category: str = "unconfirmed"
    type: str = MessageTypes.unconfirmed_match_added.value
    
    def build_redux_action(self):
        return {
            "action": "addMatch", 
            "payload": {
                "category": self.category,
                "match": self.match
            }
        }
        
@dataclass
class InBlockIncomingCall(MessageBase):
    sender_id: str
    type: str = MessageTypes.block_incoming_call.value
    
    def build_redux_action(self):
        return {
            "action": "blockIncomingCall", 
            "payload": {
                "userId": self.sender_id
            }
        }
        
@dataclass
class InNewIncomingCall(MessageBase):
    sender_id: str
    type: str = MessageTypes.new_incoming_call.value
    
    def build_redux_action(self):
        return {
            "action": "addIncomingCall", 
            "payload": {
                "userId": self.sender_id
            }
        }

@dataclass
class InPartialMessage(MessageBase):
    sender_id: str
    tmp_uuid: str
    sender: str
    created: str
    read: bool
    type: str = MessageTypes.new_partial_message.value
    
    def build_redux_action(self):
        return {
            "action": "partialMessage", 
            "payload": self.dict()
        }
        