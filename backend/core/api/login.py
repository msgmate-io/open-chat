from rest_framework_dataclasses.serializers import DataclassSerializer
import asyncio
from typing import Literal, Optional, List, Dict
from datetime import datetime
from drf_spectacular.utils import extend_schema
from dataclasses import dataclass
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework import status
from core.api.user_data import get_user_data
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login
from core import tools

import rest_framework


@dataclass
class LoginInfo:
    username: str
    password: str


class LoginInfoSerializer(DataclassSerializer):
    class Meta:
        dataclass = LoginInfo


def maybe_populate_db():
    
    has_base_admin = False
    try:
        has_base_admin = tools.base_admin_exists()
    except Exception as e:
        print("Error w", str(e), flush=True)
    
    if not has_base_admin:
        from django.core.management import call_command
        call_command('migrate', interactive=False)

        tools.get_or_create_base_admin()
        tools.get_or_create_test_users_and_chats()
        
def async_maybe_populate_db():
    import asyncio
    asyncio.run(maybe_populate_db())

@extend_schema(
    request=LoginInfoSerializer,
)
@throttle_classes([AnonRateThrottle])
@api_view(['POST'])
def login_user(request):
    serializer = LoginInfoSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.save()
    
    # TODO: should def be moved elsewhere!
    maybe_populate_db()
    
    user = authenticate(username=data.username, password=data.password)

    if user is None:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    login(request, user)
    return Response(get_user_data(user, request),status=status.HTTP_200_OK)
