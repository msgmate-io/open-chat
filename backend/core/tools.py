import json
from django.conf import settings
from random import randint
from itertools import combinations
import random
from core.models.user import User
from chat.models import Chat, Message
from core.random_init import MESSAGES

def base_admin_exists():
    return User.objects.filter(username=settings.BASE_ADMIN_USERNAME).exists()

def get_or_create_base_admin():
    user = User.objects.filter(username=settings.BASE_ADMIN_USERNAME)
    if not user.exists():
        user = User.objects.create_superuser(
            username=settings.BASE_ADMIN_USERNAME,
            password=settings.BASE_ADMIN_USER_PASSWORD
        )
    else:
        user = user.first()
    return user

first_names = ["John", "Emma", "Jake", "Sophia", "Alexander", "Olivia", "George", "Ella", "Leo", "Isabella", "Carlos", "Madison", "Samuel", "Grace", "Daniel", "Aubrey", "Gabriel", "Melanie", "Julian", "Vivian"]
last_names = ["Smith", "Johnson", "Wilson", "Brown", "Jones", "Davis", "Miller", "Thomas", "Garcia", "Rodriguez", "Martin", "Thompson", "Taylor", "Harris", "Jackson", "White", "Young", "Turner", "Perez", "Morris"]

test_users = [{"first_name": f, "second_name": l} for f, l in zip(first_names, last_names)]
test_users = test_users[:5]

base_user_name = "testUser"

def _get_or_create_test_users(user_spec):
    user = User.objects.filter(username=user_spec["username"])
    if not user.exists():
        user = User.objects.create(
            username=user_spec["username"],
            password="Test123!"
        )
        up = user.profile
        for key in ["first_name", "second_name"]:
            if key in user_spec:
                setattr(up, key, user_spec[key])
        up.save()
    else:
        user = user.first()
    return user


def get_or_create_test_users():
    users = test_users
    out = []
    for i, user in enumerate(users):
        u = _get_or_create_test_users({**user, "username": base_user_name + str(i)})
        out.append(u)
    return out

def get_or_create_test_users_and_chats():
    users = get_or_create_test_users()
    chats_to_create = list(combinations(list(range(len(users))), 2))
    for uid1, uid2 in chats_to_create:
        u1 = users[uid1]
        u2 = users[uid2]
        example_chat = Chat.get_or_create_chat(u1, u2)
        if(example_chat.get_messages().count() == 0):
            amnt_messages = randint(5, 15)
            for i in range(amnt_messages):
                sender = ([u1, u2])[randint(0, 1)]
                receiver = u2 if sender == u1 else u1
                text = random.choice(MESSAGES)
                names_sender = [sender.profile.first_name , sender.profile.second_name]
                names_receiver = [receiver.profile.first_name , receiver.profile.second_name]
                try:
                    text = text.format(first_name=names_sender[randint(0,1)], second_name=names_receiver[randint(0,1)])
                except:
                    pass
                message = Message.objects.create(
                    chat=example_chat,
                    sender=sender,
                    recipient=receiver,
                    text=text
                )
        

