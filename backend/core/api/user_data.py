from rest_framework_dataclasses.serializers import DataclassSerializer
from rest_framework.request import Request
from typing import Literal, Optional, List, Dict
from datetime import datetime
from drf_spectacular.utils import extend_schema, inline_serializer
from dataclasses import dataclass
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async, async_to_sync
from core.models.profile import UserProfileSerializer
from chat.api.chats import ChatsModelViewSet
from chat.api.messages import MessagesModelViewSet
from chat.models import Chat, ChatSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_user_data(user, request):
    """
    All the relevant user data for one user 
    """
    chats_paginated = ChatsModelViewSet.emulate(request).list()
    
    return {
        "chats": chats_paginated,
        "user": {
            "profile": UserProfileSerializer(user.profile).data,
            "uuid": str(user.uuid),
            "email": user.email,
            "is_staff": user.is_staff,
        }
    }

@api_view(['GET'])
@extend_schema(
    auth=["SessionAuthentication"],
    request=inline_serializer(name="GetUserData", fields={})
)
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def request_user_data(request, **kwargs):
    
    print("KWARGS", kwargs)

    #ud = get_user_data(request.user, request)
    #response = Response(ud, status=status.HTTP_200_OK)
    if 'chat_uuid' in kwargs:
        messages = MessagesModelViewSet.emulate(request).list(chat_uuid=kwargs['chat_uuid'])
        chat = ChatSerializer(Chat.get(kwargs['chat_uuid']), context={'request': request}).data
        return Response({**get_user_data(request.user, request), "messages": messages, "chat": chat})
    
    return Response(get_user_data(request.user, request))
