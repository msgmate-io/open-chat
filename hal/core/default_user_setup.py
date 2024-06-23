from django.contrib.auth import get_user_model
from core.tools import get_or_create_base_admin

def get_or_create_user(username, email, password):
    user = get_user_model().objects.filter(
        username=username,
        email=email,
    )
    if not user.exists():
        print(f"Not existing creating user: {user}")
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user
    user = user.first()
    return user

def get_or_create_ffuser(email, password):
    # creates a so-called 'fully featured user'
    # from regular users we expect username == email
    user = get_or_create_user(
        email=email,
        username=email,
        password=password,
    )
    return user

def create_or_reset_admin_user():
    admin = get_or_create_base_admin()