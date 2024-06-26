from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

static_patterns = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

main_patterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('', include('core.urls')),
    # Uncomment and add if needed
    # *[path("", include(f"{app}.urls")) for app in settings.EXTRA_APPS],
]

urlpatterns = main_patterns + static_patterns 