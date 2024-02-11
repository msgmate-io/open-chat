from django.urls import path, include, re_path
from core.api import profile, register, login, automation, user

profile_api_user = profile.UpdateProfileViewset.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})


user_api_user = user.UpdateUserViewset.as_view({
    'get': 'retrieve',
})


user_api_admin = user.UpdateUserViewset.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

user_api_admin_list = user.UpdateUserViewset.as_view({
    'get': 'list',
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
    path("api/login", login.login_user),
    path("api/profile", profile_api_user),
    path("api/user", user_api_user),

    # Admin
    path("api/users/", user_api_admin_list),
    path("api/users/<str:pk>/", user_api_admin),
    path("api/profiles/", profile_api_admin_list),
    path("api/profiles/<str:pk>/", profile_api_admin),
]
