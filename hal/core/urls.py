from django.urls import path, include, re_path
from core.flower_view import FlowerProxyView

urlpatterns = [
    FlowerProxyView.as_view(),
]
