from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from conf.utils import dataclass_as_dict
from core.permissions import (
    Permissions, Groups, CreateBotBridges, CreateBotUser
)

def setup_base_permissions():
    
    any_content_type, created = ContentType.objects.get_or_create(
        app_label='any',
        model='any'
    )
    
    # 1 - create default permissions
    create_bot_user_perm, created = Permission.objects.get_or_create(
        **dataclass_as_dict(CreateBotBridges),
        content_type=any_content_type,
    )

    create_bot_bridges_perm, created = Permission.objects.get_or_create(
        **dataclass_as_dict(CreateBotUser),
        content_type=any_content_type,
    )

    # 2 - create permission groups ( bot admin )
    bot_admin_group, created = Group.objects.get_or_create(
        name=Groups.bot_admin,
    )
    
    bot_admin_group.permissions.set([
        create_bot_user_perm,
        create_bot_bridges_perm
    ])

    # 3 - create permission groups ( full featured user )
    full_featured_user_group, created = Group.objects.get_or_create(
        name=Groups.ff_user,
    )
    
    full_featured_user_group.permissions.set([
        create_bot_user_perm,
    ])
    
    # 4 - bot user group
    bot_user_group, created = Group.objects.get_or_create(
        name=Groups.bot_user,
    )
    
    # base bot don't have any special permissions
    bot_user_group.permissions.set([])