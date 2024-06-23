from django.urls import path, include, re_path
from core.flower_view import FlowerProxyView
from core.api.webhook import webhook

urlpatterns = [
    FlowerProxyView.as_url(),
    path('api/webhook/', webhook)
]
