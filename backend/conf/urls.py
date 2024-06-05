from django.contrib import admin
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('', include('django_prometheus.urls')),

    path("", include("core.urls")),

    path("", include("chat.urls")),
    *[path("", include(f"{app}.urls")) for app in settings.EXTRA_APPS],
]