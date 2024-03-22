from core.models.user import User
from django.contrib.auth.models import Group, Permission
from dataclasses import dataclass

def get_or_create_user(username, email, password, user_permissions=[]):
    try:
        user = User.objects.create(
            username=username,
            email=email,
            password=password,
            user_permissions=user_permissions
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
        user_permissions=[
            
        ]
    )
    return user


FNAMES = ["Tim", "Siobhan", "Sean", "Oliver", "Julian", "Jimmy", "Andrea", "Sandra"]

def get_deterministic_test_user(id):
    
    name_id = id % len(FNAMES)
    sname_id = ((len(FNAMES) - id) % len(FNAMES))
    return {
        "username": f"testUser{id}",
        "email": f"test+{id}@msgmate.io",
        "password": "Test123!",
        "profile": {
            "first_name": FNAMES[name_id] + str(id),
            "second_name": FNAMES[sname_id] + str(id),
        }
    }

def create_random_users(amount=0):
    
    # 1 - create normal fully featured users
    for i in range(0, amount):
        user_info = get_deterministic_test_user(i)
        get_or_create_ffuser(
            email=user_info["email"],
            password=user_info["password"]
        )
        
    # 2 - create bot admin user
    
    Permission.objects.get()