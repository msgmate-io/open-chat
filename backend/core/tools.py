from django.conf import settings
from django.contrib.auth import get_user_model

def base_admin_exists():
    return get_user_model().objects.filter(username=settings.BASE_ADMIN_USERNAME).exists()

def get_or_create_base_admin():
    user = get_user_model().objects.filter(username=settings.BASE_ADMIN_USERNAME)
    if not user.exists():
        user = get_user_model().objects.create_superuser(
            username=settings.BASE_ADMIN_USERNAME,
            password=settings.BASE_ADMIN_USER_PASSWORD
        )
    else:
        user = user.first()
    return user

def before_backend_startup():
    from core.default_user_setup import create_or_reset_test_users, create_or_reset_admin_user
    from core.setup_base_permissions import setup_base_permissions

    # 1 - Setup all server permission models
    setup_base_permissions()

    # 2 - Create or reset the base admin user
    create_or_reset_admin_user()
    
    # 3 - Create or reset test users
    create_or_reset_test_users(20)