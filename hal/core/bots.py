import asyncio
import os
from open_chat_api_client.models import LoginInfo, AugmentedBotUser, UserSelf
from open_chat_api_client.client import AuthenticatedClient, Client
from open_chat_api_client.api.bot import bot_login_create
from open_chat_api_client.api.user import user_self_retrieve
from core.hal9008_text_chat import MessageResponder, get_message_responder_factory

def prepare_client(
    bot_username: str,
    bot_password: str,
    server_url: str
) -> tuple[AuthenticatedClient, str, str]:
    client = Client(
        base_url=server_url
    )
    res = bot_login_create.sync_detailed(
        client=client,
        body=LoginInfo(
            username=bot_username,
            password=bot_password
        )
    )
    try:
        print("res", res, flush=True)
        print("status", res.status, flush=True)
        print("Logged in as bot", res.parsed, flush=True)
    except Exception as e:
        print("error", e, flush=True)
    res: AugmentedBotUser = res.parsed
    csrftoken = res.additional_properties['csrftoken']
    sessionid = res.additional_properties['sessionid']
    auth_client = Client(
        base_url=server_url,
        headers={
            "X-CSRFToken": csrftoken,
            "Cookie": f"sessionid={sessionid}; csrftoken={csrftoken}"
        }
    )
    return auth_client, csrftoken, sessionid

def start_bot(
    username="hal",
    password=os.getenv("HAL_PASSWORD", "Test123!"),
    chat_id=None,
    recipient_id=None
):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    SERVER_HOST = os.getenv("HAL_SERVER_HOST", "backend")

    auth_client, csrftoken, sessionid = prepare_client(
        bot_username=username,
        bot_password=password,
        server_url=f"http://{SERVER_HOST}:8000"
    )
    user: UserSelf = user_self_retrieve.sync(client=auth_client)

    CustomFactory = get_message_responder_factory()
    factory = CustomFactory(
        url=f"ws://{SERVER_HOST}:8000/api/core/ws",
        chat_id=chat_id,
        recipient_id=recipient_id,
        event_loop=loop,
        token_buffer_size=int(os.getenv("HAL_TOKEN_BUFFER_SIZE", "10")),
        _sessionid=sessionid,
        _csrftoken=csrftoken
    )
    factory.protocol = MessageResponder
    factory.headers = {
        "X-CSRFToken": csrftoken,
        "Cookie": f"sessionid={sessionid}; csrftoken={csrftoken}"
    }

    factory.setProtocolOptions(autoPingInterval=100, autoPingTimeout=100)

    print("Starting WebSocket connection...")
    coro = loop.create_connection(factory, SERVER_HOST, ssl=False, port=8000)
    loop.run_until_complete(coro)
    print("WebSocket connection established, running loop forever.")

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        print("Cleaning up event loop.")
        pending = asyncio.all_tasks(loop)
        for task in pending:
            task.cancel()
            try:
                loop.run_until_complete(task)
            except asyncio.CancelledError:
                pass
        loop.run_until_complete(loop.shutdown_asyncgens())
        loop.close()
        
    return {"test": "data"}