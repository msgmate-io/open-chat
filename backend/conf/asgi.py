if True:
    import os
    from django.core.asgi import get_asgi_application
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')
    django_asgi_app = get_asgi_application()
from django.urls import re_path, path
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf import settings
from channels.auth import AuthMiddlewareStack
websocket_routers = []


http_routes = [re_path(r"", django_asgi_app)]



def get_urls_patterns():
    from chat.socket.consumer import CoreConsumer

    websocket_routers.insert(1, re_path(
        rf'^api/core/ws$', CoreConsumer.as_asgi()))

    return websocket_routers


application = ProtocolTypeRouter(
    {
        "http": URLRouter(http_routes),
        "websocket": AuthMiddlewareStack(URLRouter(get_urls_patterns())),
    }
)
