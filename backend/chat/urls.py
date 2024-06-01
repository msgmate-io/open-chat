from django.urls import path, include, re_path
from . import api

messages_api_user_list = api.messages.MessagesModelViewSet.as_view({
    'get': 'list',
})

message_api_user = api.messages.MessagesModelViewSet.as_view({
    'get': 'retrieve',
})

messages_api_user_send = api.messages.MessagesModelViewSet.as_view({
    'post': 'send',
})

messages_api_user_read = api.messages.MessagesModelViewSet.as_view({
    'post': 'mark_chat_messages_read',
})

chat_api_user_list = api.chats.ChatsModelViewSet.as_view({
    'get': 'list',
})

chat_api_contacts_list = api.contacts.ContactsViewset.as_view({
    'get': 'list',
})

chat_api_user_chat_delete = api.chats.ChatsModelViewSet.as_view({
    'post': 'delete_by_uuid',
})

chat_api_user_get_by_title = api.chats.ChatsModelViewSet.as_view({
    'post': 'get_by_title',
})

get_chats_with_user = api.chats.ChatsModelViewSet.as_view({
    'get': 'get_chats_with_user',
})

chat_api_user_get = api.chats.ChatsModelViewSet.as_view({
    'get': 'get_by_uuid',
})

chat_mark_as_read = api.messages.MessagesModelViewSet.as_view({
    'post': 'mark_chat_messages_read',
})


chat_settings_api_user = api.chats.ChatsModelViewSet.as_view({
    'get': 'update_chat_settings',
    'post': 'update_chat_settings',
})

messages_api_user_send_data_message = api.messages.MessagesModelViewSet.as_view({
    'post': 'send_data_message',
})


urlpatterns = [
    path("api/chats/", chat_api_user_list),
    path("api/chats/contacts/", chat_api_contacts_list),
    path("api/chats/by_title/", chat_api_user_get_by_title),
    path("api/chats/with/<str:user_uuid>/", get_chats_with_user),
    path("api/chats/<str:chat_uuid>/", chat_api_user_get),
    path("api/chats/<str:chat_uuid>/delete/", chat_api_user_chat_delete),
    path("api/chats/<str:chat_uuid>/settings/", chat_settings_api_user),

    path("api/messages/<str:chat_uuid>/all_read/", chat_mark_as_read),
    path("api/messages/<str:chat_uuid>/send/", messages_api_user_send),
    path("api/messages/<str:chat_uuid>/send_data/", messages_api_user_send_data_message),
    path("api/messages/<str:chat_uuid>/read/", messages_api_user_read),
    path("api/messages/<str:chat_uuid>/", messages_api_user_list),
]
