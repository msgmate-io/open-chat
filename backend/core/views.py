from django.conf import settings
from bs4 import BeautifulSoup
import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from core.api.user_data import get_user_data
from django.shortcuts import redirect
from rest_framework.request import Request
from django.http import HttpResponseRedirect
from core import tools
from revproxy.views import ProxyView


PUBLIC_PAGES = ["/article", "articles"]


def proxy_page(request, data, path=""):
    url = f"{settings.NEXTJS_HOST_URL}/{path}"
    return ProxyView.as_view(upstream=url)(request, path=path)

@api_view(['GET'])
def index(request, path):
    # TODO: use authentication based redirect instead
    print("User requesting path", path)

    if request.user.is_authenticated and (not path in PUBLIC_PAGES):
        page = proxy_page(request, get_user_data(request.user, request), path=path)
    elif (not request.user.is_authenticated) and (path in PUBLIC_PAGES):
        page = proxy_page(request, {}, path=path)
    else:
        # User is not authentiacted and is trying to access a private page
        if not (path in ["/login", "login"]):
            return HttpResponseRedirect("/login")
        page = proxy_page(request, {
            "connection": {
                "state": "unauthenticated"
            }
        }, path=path)

    if page is None:
        return HttpResponse("Page not found", status=404)
    return page


def render_nextjs_page(data, path=""):
    url = settings.NEXTJS_HOST_URL
    url = f"{url}/{path}"
    print(f"TBS Routing to {url}")
    resp = requests.post(url, json=data)
    print("Response from nextjs", resp)
    
    if resp.status_code == 404:
        return None
    
    return HttpResponse(resp.text)