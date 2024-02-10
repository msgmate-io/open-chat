from django.urls import path, include, re_path
from .views import index
from core.api import profile, register, user_data, login, automation

profile_api_user = profile.UpdateProfileViewset.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

profile_api_admin = profile.UpdateProfileViewset.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

profile_api_admin_list = profile.UpdateProfileViewset.as_view({
    'get': 'list',
})

urlpatterns = [
    path("api/register", register.register_user),
    path("api/user_data", user_data.request_user_data),
    path("api/user_data/<str:chat_uuid>/", user_data.request_user_data),
    path("api/login", login.login_user),
    path("api/profile", profile_api_user),
    path("api/profiles/", profile_api_admin_list),
    path("api/profiles/<str:pk>/", profile_api_admin),
]
