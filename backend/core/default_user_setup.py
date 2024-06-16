from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from core.permissions import Permissions, Groups
from core.tools import get_or_create_base_admin
from dataclasses import dataclass
from django.db import transaction
from chat.models import Chat, Message, ChatSettings
from django.conf import settings
import os
import base64
import json

def get_or_create_user(username, email, password):
    user = get_user_model().objects.filter(
        username=username,
        email=email,
    )
    if not user.exists():
        print(f"Not existing creating user: {user}")
        user, profile, _ = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user, profile
    user = user.first()
    return user, user.profile

def get_or_create_ffuser(email, password):
    # creates a so-called 'fully featured user'
    # from regular users we expect username == email
    user, profile = get_or_create_user(
        email=email,
        username=email,
        password=password,
    )
    return user, profile

def set_bot_profile(user, profile):
    user.profile.public = profile.get("public", False)
    user.profile.contact_secret = profile.get("contact_secret", None)
    user.profile.reveal_secret = profile.get("reveal_secret", "password")
    user.profile.is_bot = profile.get("is_bot", False)
    user.profile.description_title = profile.get("description_title", "About Me:")
    user.profile.description = profile.get("description", "Hello there I'm using open-chat!")
    user.profile.first_name = profile["first_name"]
    user.profile.second_name = profile["second_name"]
    user.profile.save()
    return user

def set_user_profile(user, profile):
    user.profile.first_name = profile["first_name"]
    user.profile.second_name = profile["second_name"]
    user.profile.save()
    return user


FNAMES = ["Tim", "Siobhan", "Sean", "Oliver", "Julian", "Jimmy", "Andrea", "Sandra"]

def get_deterministic_test_user(id):
    
    name_id = id % len(FNAMES)
    sname_id = ((len(FNAMES) - id) % len(FNAMES))
    return {
        "username": f"test{id}",
        "email": f"test+msgmate{id}@msgmate.io",
        "password": "Test123!",
        "profile": {
            "first_name": FNAMES[name_id] + str(id),
            "second_name": FNAMES[sname_id] + str(id),
        }
    }
    
def deterministic_random_message(id, user_id):
    return "Message number " + str(id), (id + user_id) % 2 == 0
    
def random_deterministic_messages(users, id, total_message_count):
    # every test user gets 2 + id % 5 chats
    amount = 2 + id % 5
    # the chat is inititaed with users id + offsert % 5
    user = users[id]
    total_msg = 0
    for i in range(0, amount):
        partner_id = (id + i + 1) % len(users)
        amount_of_messages = 30 + i % 20
        partner = users[partner_id]
        chat = Chat.get_chat(user, partner)
        if not chat:
            chat = Chat.get_or_create_chat(user, partner)
        else:
            continue
        for j in range(0, amount_of_messages):
            text, self_is_sender = deterministic_random_message(j, partner_id)
            Message.objects.create(
                chat=chat,
                sender=user if self_is_sender else partner,
                recipient=user if (not self_is_sender) else partner,
                text=text
            )
            total_msg += 1
    return total_msg + total_message_count

    
def create_or_reset_admin_user():

    bot_admin_permission_group = Group.objects.get(name=Groups.bot_admin) 
    admin = get_or_create_base_admin()
    bot_admin_permission_group.user_set.add(admin)
    
def create_bot_user(bot_info):
    bot_user_permission_group = Group.objects.get(name=Groups.bot_user) 
    bot, _ = get_or_create_user(
        email=bot_info["email"],
        username=bot_info["username"],
        password=bot_info["password"]
    )
    if 'automated' in bot_info and bot_info['automated']:
        bot.automated = True
        bot.save()
    bot_user_permission_group.user_set.add(bot)
    print(f"Got bot user: {bot}, profile {bot.profile}")
    
    def setup_bot_profile():
        set_bot_profile(bot, bot_info["profile"])

    transaction.on_commit(setup_bot_profile)
    
    def setup_debug_chat():
        # then we create a default debug chat with the admin user
        admin = get_or_create_base_admin()
        chat = Chat.get_or_create_chat(admin, bot)
        
        # Then create a 'ChatSettingObject' to attach a title to the chat
        ChatSettings.objects.update_or_create(
            chat=chat,
            user=bot,
            title=f"{bot_info['username']}-debug-chat"
        )
        
        # Send an inital message indicating this is the debug chat
        Message.objects.create(
            chat=chat,
            sender=bot,
            recipient=admin,
            text="This is the debug chat, please use it to test your bot"
        )
        
    transaction.on_commit(setup_debug_chat)
    
def create_or_reset_base_bot_users():
    
    BOTS = [{
        "username": f"hal",
        "email": f"hal@msgmate.io",
        "password": os.environ.get("HAL_PASSWORD", "Test123!"),
        "automated": True,
        "profile": {
            "first_name": "HAL",
            "second_name": "9003",
            "public": True,
            "contact_secret": None,
            "is_bot": True,
            "description_title": "About Bot:",
            "description": "General Purpose Hal9003 Bot checkout my source at: https://github.com/msgmate-io/msgmate-io-oc-hal9003-bot",
        },
    }]

    for bot_info in BOTS:
        create_bot_user(bot_info)

    
    
def create_or_reset_test_users(amount=20):

    ffuser_permission_group = Group.objects.get(name=Groups.ff_user) 
    users = []
    user_infos = []
    atleast_one_user_created = False
    for i in range(0, amount):
        print(f"Creating test user {i}")
        user_info = get_deterministic_test_user(i)
        user_infos.append(user_info)
        user, pro = get_or_create_ffuser(
            email=user_info["email"],
            password=user_info["password"]
        )
        if user:
            atleast_one_user_created = True
        ffuser_permission_group.user_set.add(user)
        users.append(user)

    def setup_profiles():
        for i in range(0, amount):
            print(f"Creating test user profile {i}")
            set_user_profile(users[i], user_infos[i]["profile"])
        
    if atleast_one_user_created:
        transaction.on_commit(setup_profiles)

    def setup_messages():
        total_messages = 0
        for i in range(0, amount):
            print(f"Creating messages for user {i}")
            total_messages = random_deterministic_messages(users, i, total_messages)
            
        print(f"Total messages created: {total_messages}")

    if atleast_one_user_created:
        transaction.on_commit(setup_messages)