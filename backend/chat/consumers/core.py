from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .messages import (
    MessageTypes, UserWentOffline, 
    UserWentOnline, NewMessage,
    InMarkMessageRead,
    NewPartialMessage,
    InSendMessage,
    IncomingMessageTypes,
    InPartialMessage,
    InSendMessageChatTitle
)
from .db_ops import is_staff_or_matching, get_all_chat_user_ids, connect_user, disconnect_user
from .control import get_user_channel_name

UNAUTH_REJECT_CODE: int = 4001

PERFORMANCE_RESTRICTON_STAFF = False


class CoreConsumer(AsyncWebsocketConsumer):
    """
Every user that connects joins:
- `<user_pk>` group: used to deliver general user related update like: new match / incoming call
    """

    async def connect(self, **kwargs):
        """
        Handle all connections, generally we only permit authenticated users! 
        """

        if self.scope["user"].is_anonymous:
            await self.close(code=UNAUTH_REJECT_CODE)
        else:

            self.user = self.scope["user"]
            self.group_name = str(self.user.uuid)

            # Join 'user self' group
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
            print(f"User {self.user} connected to {self.channel_name} ({self.group_name})")
            
            if PERFORMANCE_RESTRICTON_STAFF:
                # For efficiency, matching users are not connected to **all** groups, 
                # as they are matched to Thousands of users
                # For the matching / staff users to still be able to join channls of specific matches, 
                # they can join the socket from a channel route e.g.: `/ws/core/<int:match_id>/`
                matching_or_staff = await is_staff_or_matching(self.user)
                if matching_or_staff:
                    # check if a specific group to join was specified
                    self.scope["url_route"]["kwargs"].get("user_id", None)
                    
                    # TODO: this assumes that only matching / staff users have a huge amount of matches & other users cannot cause issues
                    # there should also be a way to connect to the subset of users chats that are rendered on the first page
                    return
            
            # we mark this user as 'online' in the database
            await connect_user(self.user)
            print(f"User {self.user} connected to {self.channel_name} ({self.group_name})", flush=True)
            
            # For regular users, join all matches groups
            user_ids = await get_all_chat_user_ids(self.user)
            print(f"User {self.user} joined {len(user_ids)} groups {user_ids}", flush=True)
            for user_id in user_ids:
                if user_id != self.group_name:
                    await self.channel_layer.group_send(
                        user_id, UserWentOnline(sender_id=self.group_name).dict())
                    
    async def disconnect(self, close_code):
        if (close_code != UNAUTH_REJECT_CODE) and (getattr(self, 'user', None) is not None):
            print(f"User {self.user} disconnected from {self.channel_name} ({self.group_name})", flush=True)
            user = getattr(self, 'user', None)
            print(f"{user} disconnected, with code {close_code}", flush=True)
            # we mark the user as 'offline' in the database
            await disconnect_user(self.user)

            # then we notify all the other users that this user went offline
            user_ids = await get_all_chat_user_ids(self.user)
            print(f"Sending offline to {len(user_ids)} users, {user_ids}", flush=True)
            for user_id in user_ids:
                if user_id != self.group_name:
                    await self.channel_layer.group_send(
                        user_id, UserWentOffline(sender_id=self.group_name).dict())

            # a user has disconnected, we can safly discard that users group ( stored in self.group_name )
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
                    
    async def websocket_disconnect(self, event):
        await super().websocket_disconnect(event)

    async def receive(self, text_data=None, bytes_data=None):
        print(f"User {self.user} received message: {text_data}", flush=True)
        _data = json.loads(text_data)
        message_type = _data.get("type", None)
        assert message_type is not None, "Message type is required!"
        if message_type == "custom":
            message_data = _data.get("data", {})
            message_action = message_data.get("action", None)
            message_payload = message_data.get("payload", {})
            if message_action == IncomingMessageTypes.mark_chat_message_read.value:
                await InMarkMessageRead(**message_payload).perform_action(self.user)
            elif message_action == IncomingMessageTypes.send_message.value:
                await InSendMessage(**message_payload).perform_action(self.user)
            elif message_action == IncomingMessageTypes.partial_message.value:
                await InPartialMessage(**message_payload).perform_action(self.user)
            elif message_action == IncomingMessageTypes.send_message_chat_title.value:
                await InSendMessageChatTitle(**message_payload).perform_action(self.user)
                
    async def new_partial_message(self, event):
        assert event['type'] == MessageTypes.new_partial_message.value
        await self.send(text_data=NewPartialMessage(**event).action_json())
                    
    async def user_went_online(self, event):
        assert event['type'] == MessageTypes.user_went_online.value
        await self.send(text_data=UserWentOnline(**event).action_json())
        
    async def new_message(self, event):
        assert event['type'] == MessageTypes.new_message.value
        await self.send(text_data=NewMessage(**event).action_json())
        
    async def user_went_offline(self, event):
        assert event['type'] == MessageTypes.user_went_offline.value
        await self.send(text_data=UserWentOffline(**event).action_json())