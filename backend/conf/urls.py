from django.contrib import admin
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.urls import path, include, re_path
from django.http import HttpResponse
from django_nextjs.render import render_nextjs_page_sync, render_nextjs_page_async
from django.conf.urls.static import static
from django.conf import settings
from django_nextjs.proxy import NextJSProxyView
from django_nextjs import urls

urlpatterns = [
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('', include('django_prometheus.urls')),

    path("", include("core.urls")),

    path("", include("chat.urls")),
]