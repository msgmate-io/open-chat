from django.contrib.auth.models import Group, Permission
from conf.utils import dataclass_as_dict
from core.permissions import (
    Permissions, Groups
)

def setup_base_permissions():
    
    # 1 - create default permissions
    create_bot_user_perm = Permission.objects.get_or_create(
        **dataclass_as_dict(Permissions.create_bot_user)
    )

    create_bot_bridges_perm = Permission.objects.get_or_create(
        **dataclass_as_dict(Permissions.create_bot_bridges)
    )

    # 2 - create permission groups ( bot admin )
    bot_admin_group, created = Group.objects.get_or_create(
        name=Groups.bot_admin
    )
    
    bot_admin_group.permissions.set([
        create_bot_user_perm,
        create_bot_bridges_perm
    ])

    # 3 - create permission groups ( full featured user )
    full_featured_user_group, created = Group.objects.get_or_create(
        name=Groups.ff_user
    )
    
    full_featured_user_group.permissions.set([
        create_bot_user_perm,
    ])