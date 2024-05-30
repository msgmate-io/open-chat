from django.conf import settings
from django.contrib.auth import get_user_model
from chat.models import ChatConnections
from django.db.models import Q

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

def reset_all_chat_connections():
    ChatConnections.objects.filter(
        Q(is_online=True) | Q(connection_counter__gt=0) | Q(connection_counter__lt=0)
    ).update(
        is_online=False,
        connection_counter=0
    )

def before_backend_startup():
    from core.default_user_setup import create_or_reset_test_users, create_or_reset_admin_user, create_or_reset_base_bot_users
    from core.setup_base_permissions import setup_base_permissions

    # 1 - Setup all server permission models
    setup_base_permissions()

    # 2 - Create or reset the base admin user
    create_or_reset_admin_user()
    
    # 3 - Create default bot users ( atm only hal9003 )
    create_or_reset_base_bot_users()
    
    # 4 - Reset all chat connections
    reset_all_chat_connections()