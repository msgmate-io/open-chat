if True:
    import os
    from django.core.asgi import get_asgi_application
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')
    django_asgi_app = get_asgi_application()
from django.urls import re_path, path
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf import settings
from channels.auth import AuthMiddlewareStack
from django_nextjs.proxy import NextJSProxyHttpConsumer, NextJSProxyWebsocketConsumer
websocket_routers = []


http_routes = [re_path(r"", django_asgi_app)]

if settings.USE_NEXTJS_PROXY_ROUTES:
    http_routes.insert(0, re_path(r"^(?:_next|__next|next).*",
                       NextJSProxyHttpConsumer.as_asgi()))
    websocket_routers.insert(
        0, path("_next/webpack-hmr", NextJSProxyWebsocketConsumer.as_asgi()))


def get_urls_patterns():
    from chat.consumers.core import CoreConsumer
    websocket_routers.insert(
        0, path("_next/webpack-hmr", NextJSProxyWebsocketConsumer.as_asgi()))

    websocket_routers.insert(1, re_path(
        rf'^api/core/ws$', CoreConsumer.as_asgi()))
    return websocket_routers


application = ProtocolTypeRouter(
    {
        "http": URLRouter(http_routes),
        "websocket": AuthMiddlewareStack(URLRouter(get_urls_patterns())),
    }
)
