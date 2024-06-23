from autobahn.asyncio.websocket import WebSocketClientProtocol
from open_chat_api_client.api.messages import messages_list
from open_chat_api_client.api.chats import chats_settings_retrieve
from dataclasses import dataclass
import os
import asyncio
import json
import msgmate.ai_backends as models
from autobahn.asyncio.websocket import WebSocketClientFactory
from open_chat_api_client.client import Client, AuthenticatedClient

@dataclass
class ChatConfig:
    model: str
    context: int = 5
    systemPrompt: str = "You are a helpful assistant."
    
    def to_dict(self):
        return {
            "model": self.model,
            "context": self.context,
            "systemPrompt": self.systemPrompt
        }

@dataclass
class OAiMessage:
    role: str
    content: str
    
    def to_dict(self):
        return {
            "role": self.role,
            "content": self.content
        }

def get_auth_client(csrftoken, sessionid) -> AuthenticatedClient:
    SERVER_HOST = os.getenv("HAL_SERVER_HOST", "backend")
    server_url = f"http://{SERVER_HOST}:8000"
    auth_client = Client(
        base_url=server_url,
        headers={
            "X-CSRFToken": csrftoken,
            "Cookie": f"sessionid={sessionid}; csrftoken={csrftoken}"
        }
    )
    return auth_client

class MessageResponder(WebSocketClientProtocol):
    
    chat_id = None
    recipient_id = None
    sessionid = None
    csrftoken = None
    shutdown_timeout = 60  # Default timeout in seconds
    currently_responding = False
    shutdown_task = None
    event_loop = None
    interrupt_flag = False
    token_buffer_size = 4
    
    def __init__(self, *args, **kwargs):
        self.chat_id = kwargs.pop('chat_id')
        self.recipient_id = kwargs.pop('recipient_id')
        self.sessionid = kwargs.pop('sessionid')
        self.csrftoken = kwargs.pop('csrftoken')
        self.shutdown_timeout = kwargs.pop('shutdown_timeout', 20)
        self.event_loop = kwargs.pop('event_loop')
        self.token_buffer_size = kwargs.pop('token_buffer_size', 4)
        
        super().__init__(*args, **kwargs)
    
    def reset_shutdown_timer(self):
        if self.shutdown_task:
            self.shutdown_task.cancel()
        self.shutdown_task = asyncio.create_task(self.shutdown_after_timeout())
        print(f"Shutdown timer reset to {self.shutdown_timeout} seconds.")

    async def shutdown_after_timeout(self):
        await asyncio.sleep(self.shutdown_timeout)
        await self.clean_shutdown()

    def onConnect(self, response):
        print("Server connected: {0}".format(response.peer))

    def onConnecting(self, transport_details):
        print("Connecting; transport details: {}".format(transport_details))
        return None  # ask for defaults
    
    async def sendChatMessage(self, chat_id, recipient_id, text):
        return await self.sendCustomMessage('send_message', {
            'chat_id': chat_id,
            'recipient_id': recipient_id,
            'text': text
        })

    async def sendPartialMessage(self, chat_id, recipient_id, text, tmp_id="tmp", data_message=None):
        return await self.sendCustomMessage('partial_message', {
            'chat_id': chat_id,
            'recipient_id': recipient_id,
            'tmp_id': tmp_id,
            'data_message': data_message,
            'text': text
        })

    def syncSendCustomMessage(self, action, payload):
        return self.sendMessage(json.dumps({
            'type': 'custom',
            'data': {
                'action': action,
                'payload': payload
            }
        }).encode('utf-8'), isBinary=False)
    
    async def sendCustomMessage(self, action, payload):
        return self.syncSendCustomMessage(action, payload)
    
    async def process_message(self, payload):
        data = json.loads(payload.decode('utf8'))
        data_type = data.get('type')
        data = data.get('data')
        if data_type == "custom":
            action = data.get('action')
            payload_data = data.get('payload')
            
            if action == "newMessage":

                self.reset_shutdown_timer() # keep the bot alive when the chat stays active

                sender_id = payload_data.get('senderId')
                chat_id = payload_data.get('chat').get('uuid')
                text = payload_data.get('message').get('text')
                
                if not chat_id == self.chat_id:
                    return
                
                data_message = payload_data.get('message').get('data_message', None)
                
                # await self.sendChatMessage(self.chat_id, self.recipient_id, text)
                
                if data_message is not None:
                    data_type = data_message.get('data_type')
                    
                    if data_type == "signal":
                        signal = data_message.get('data').get('signal')
                        
                        if signal == "stop-generating-response":
                            self.interrupt_flag = True
                            await self.got_interrupted()
                            return

                if text.startswith("/"):
                    if text.startswith("/chat"):
                        pretty_chat = json.dumps(payload_data.get('chat'), indent=4)
                        await self.sendChatMessage(self.chat_id, self.recipient_id, "```\n" + pretty_chat + "\n```")
                    if text.startswith("/model"):

                        await self.sendChatMessage(self.chat_id, self.recipient_id, "Current model: llama3-70b-8192")
                    else:
                        await self.sendChatMessage(self.chat_id, self.recipient_id, "Command not recognized.")
                    return

                await self.send_allive_message()
                if not self.currently_responding:
                    self.currently_responding = True
                    asyncio.create_task(self.responseGenerate())
            
    async def clean_shutdown(self):
        print("Initiating clean shutdown.")
        await self.shutting_down()
        if self.shutdown_task:
            self.shutdown_task.cancel()
        await self.sendClose()
        print("WebSocket connection closed.")
        self.event_loop.call_soon_threadsafe(self.event_loop.stop)

    def onMessage(self, payload, isBinary):
        if isBinary:
            raise Exception("NOT IMPLEMENTED! Binary message received: {0} bytes".format(len(payload)))
        asyncio.create_task(self.process_message(payload))

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))
        if self.shutdown_task:
            self.shutdown_task.cancel()
        self.event_loop.call_soon_threadsafe(self.event_loop.stop)

    async def responseGenerate(self):
        try:
            await self.sendPartialMessage(
                self.chat_id, 
                self.recipient_id, 
                f"Signal: Starting to generate response",
                data_message={
                    "hide_message": True,
                    "data_type": "signal",
                    "data": {
                        "signal": "start-generating-response",
                    }
                }
            )

            MODEL = "llama3-70b-8192"
            api_client = get_auth_client(self.csrftoken, self.sessionid)

            settings = await chats_settings_retrieve.asyncio(chat_uuid=self.chat_id, client=api_client)
            config = ChatConfig(**settings.config)
            
            # pretty_settings = json.dumps(settings.to_dict(), indent=4)
            # await self.sendChatMessage(self.chat_id, self.recipient_id, "```\n" + pretty_settings + "\n```")
            
            messages = await messages_list.asyncio(
                chat_uuid=self.chat_id,
                page_size=config.context,
                client=api_client,
            )

            oai_messages = [
                OAiMessage(
                    role="system",
                    content=config.systemPrompt
                ).to_dict(),
                *[
                    OAiMessage(
                        role="user" if message.sender == self.recipient_id else "assistant",
                        content=message.text
                    ).to_dict()
                    for message in reversed(messages.results)
                ]
            ]
            
            ai_client = models.get_client_for_model(config.model, async_client=True)
            tmp_id = self.chat_id
            
            response = await ai_client.chat.completions.create(
                model=config.model,
                stream=True,
                messages=oai_messages        
            )
            full_response = ""
            buffer = ""
            token_buffer_size = self.token_buffer_size
            c = 0
            async for chunk in response:
                delta = chunk.choices[0].delta.content
                finished = chunk.choices[0].finish_reason
                if finished or self.interrupt_flag:
                    await self.sendChatMessage(self.chat_id, self.recipient_id, full_response)
                    usage = getattr(chunk, 'usage', None)
                    if usage:
                        pass
                    break
                elif delta:
                    full_response += delta
                    buffer += delta
                    c += 1
                    if c >= token_buffer_size:
                        await self.sendPartialMessage(self.chat_id, self.recipient_id, buffer, tmp_id=tmp_id)
                        buffer = ""
                        c = 0
                    # await self.sendPartialMessage(self.chat_id, self.recipient_id, delta, tmp_id=tmp_id)
        finally:
            await self.sendPartialMessage(
                self.chat_id, 
                self.recipient_id, 
                f"Signal: Finished generating response",
                data_message={
                    "hide_message": True,
                    "data_type": "signal",
                    "data": {
                        "signal": "finished-generating-response",
                    }
                }
            )
            self.currently_responding = False
            self.reset_shutdown_timer()

    async def send_allive_message(self):
        await self.sendPartialMessage(
            self.chat_id, 
            self.recipient_id, 
            f"Signal: Client still active",
            data_message={
                "hide_message": True,
                "data_type": "signal",
                "data": {
                    "signal": "was-still-active",
                }
            }
        )

    async def send_just_started(self):
        await self.sendPartialMessage(
            self.chat_id, 
            self.recipient_id, 
            f"Signal: Just started",
            data_message={
                "hide_message": True,
                "data_type": "signal",
                "data": {
                    "signal": "just-started",
                }
            }
        )
        
    async def shutting_down(self):
        await self.sendPartialMessage(
            self.chat_id, 
            self.recipient_id, 
            f"Signal: Shutting down",
            data_message={
                "hide_message": True,
                "data_type": "signal",
                "data": {
                    "signal": "shutting-down",
                }
            }
        )
        
    async def got_interrupted(self):
        # await self.sendChatMessage(self.chat_id, self.recipient_id, "Got interrupted.")
        await self.sendPartialMessage(
            self.chat_id, 
            self.recipient_id, 
            f"Signal: Got interrupted",
            data_message={
                "hide_message": True,
                "data_type": "signal",
                "data": {
                    "signal": "got-interrupted",
                }
            }
        )

    def onOpen(self):
        print("Responder connection open!", flush=True)
        self.reset_shutdown_timer()
        asyncio.create_task(self.send_just_started())
        asyncio.create_task(self.responseGenerate())

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))
        if self.shutdown_task:
            self.shutdown_task.cancel()
        self.event_loop.call_soon_threadsafe(self.event_loop.stop)

def get_message_responder_factory():
    class CustomWebSocketClientFactory(WebSocketClientFactory):
        def __init__(self, *args, **kwargs):
            self._sessionid = kwargs.pop('_sessionid')
            self._csrftoken = kwargs.pop('_csrftoken')
            self.chat_id = kwargs.pop('chat_id')
            self.recipient_id = kwargs.pop('recipient_id')
            self.shutdown_timeout = kwargs.pop('shutdown_timeout', 20)
            self.event_loop = kwargs.pop('event_loop')
            self.token_buffer_size = kwargs.pop('token_buffer_size', 4)
            WebSocketClientFactory.__init__(self, *args, **kwargs)
            
        def __call__(self):
            proto = self.protocol(
                sessionid=self._sessionid,
                csrftoken=self._csrftoken,
                chat_id=self.chat_id,
                recipient_id=self.recipient_id,
                shutdown_timeout=self.shutdown_timeout,
                event_loop=self.event_loop,
                token_buffer_size=self.token_buffer_size
            )
            proto.factory = self
            return proto
    
    return CustomWebSocketClientFactory