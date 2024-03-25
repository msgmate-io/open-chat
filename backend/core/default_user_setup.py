from core.models.user import User
from django.contrib.auth.models import Group, Permission
from core.permissions import Permissions, Groups
from core.tools import get_or_create_base_admin
from dataclasses import dataclass
from django.db import transaction

def get_or_create_user(username, email, password):
    try:
        user = User.objects.create(
            username=username,
            email=email,
            password=password,
        )
        return user
    except Exception as e:
        print(e)
    return None

def get_or_create_ffuser(email, password):
    # creates a so-called 'fully featured user'
    # from regular users we expect username == email
    user = get_or_create_user(
        email=email,
        username=email,
        password=password,
    )
    return user

def set_user_profile(user, profile):
    user.profile.first_name = profile["first_name"]
    user.profile.second_name = profile["second_name"]
    user.save()
    return user


FNAMES = ["Tim", "Siobhan", "Sean", "Oliver", "Julian", "Jimmy", "Andrea", "Sandra"]

def get_deterministic_test_user(id):
    
    name_id = id % len(FNAMES)
    sname_id = ((len(FNAMES) - id) % len(FNAMES))
    return {
        "username": f"testUser{id}",
        "email": f"test+msgmate{id}@msgmate.io",
        "password": "Test123!",
        "profile": {
            "first_name": FNAMES[name_id] + str(id),
            "second_name": FNAMES[sname_id] + str(id),
        }
    }
    
def create_or_reset_admin_user():

    bot_admin_permission_group = Group.objects.get(name=Groups.bot_admin) 
    admin = get_or_create_base_admin()
    bot_admin_permission_group.user_set.add(admin)

def create_or_reset_test_users(amount=20):

    ffuser_permission_group = Group.objects.get(name=Groups.ff_user) 
    for i in range(0, amount):
        print(f"Creating test user {i}")
        user_info = get_deterministic_test_user(i)
        user = get_or_create_ffuser(
            email=user_info["email"],
            password=user_info["password"]
        )
        ffuser_permission_group.user_set.add(user)

    def setup_profiles():
        for i in range(0, amount):
            print(f"Creating test user profile {i}")
            set_user_profile(user, user_info["profile"])
        
    transaction.on_commit(setup_profiles)