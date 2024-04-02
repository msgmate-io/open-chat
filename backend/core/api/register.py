
from rest_framework_dataclasses.serializers import DataclassSerializer
from typing import Literal, Optional, List, Dict
from datetime import datetime
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from dataclasses import dataclass
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework import status
from rest_framework.serializers import EmailField, ValidationError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login
from core.models.profile import UserProfileSerializer


@dataclass
class Person:
    email: str
    password: str
    password_confirm: str


class RegisterSerializer(DataclassSerializer):
    email = EmailField()

    class Meta:
        dataclass = Person


@dataclass
class RegisterResponseSuccess:
    message: str
    user_hash: str


class RegisterResponseSuccessSerializer(DataclassSerializer):
    class Meta:
        dataclass = RegisterResponseSuccess


@extend_schema(
    request=RegisterSerializer(many=False),
    responses={200: RegisterResponseSuccessSerializer},
    auth=None,
)
@throttle_classes([AnonRateThrottle])
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.save()

    if data.password != data.password_confirm:
        raise ValidationError({field: "Passwords do not match" for field in [
                              "password", "password_confirm"]})
    usr = get_user_model().objects.create(username=data.email, password=data.password)

    return Response(
        RegisterResponseSuccess(
            message="User created successfully",
            user_hash=str(usr.hash)),
        status=status.HTTP_200_OK)
    
class RegisterBotSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    password_confirm = serializers.CharField()
    first_name = serializers.CharField(default="Bot")
    second_name = serializers.CharField(default="Bot")
    public = serializers.BooleanField(default=False)
    description = serializers.CharField(default="Hello there I'm a bot")
    description_title = serializers.CharField(default="About the bot:")
    reveal_secret = serializers.CharField(default="password")
    contact_password = serializers.CharField(default="password", required=False, allow_blank=True, allow_null=True)

@extend_schema(
    request=RegisterBotSerializer(many=False),
    responses={200: UserProfileSerializer(many=False)},
    auth=None,
)
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle])
@api_view(['POST'])
def register_bot(request):

    serializer = RegisterBotSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.data

    # TODO: also allow users that have bot creation permsission should be allowed
    if not request.user.is_staff:
        return Response({"error": "Only staff users can create bots"}, status=status.HTTP_403_FORBIDDEN)
    
    usr = get_user_model().objects.filter(username=data['username'])
    if usr.exists():
        return Response({"error": "User with that username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    usr = get_user_model().objects.create(username=data['username'], password=data['password'])
    usr.profile.is_bot = True
    usr.profile.public = data['public']
    usr.profile.description = data['description']
    usr.profile.first_name = data['first_name']
    usr.profile.second_name = data['second_name']
    usr.profile.reveal_secret = data['reveal_secret']
    usr.profile.description_title = data['description_title']
    if 'contact_password' in data:
        usr.profile.contact_secret = data['contact_password']
    usr.profile.save()
    
    return Response(UserProfileSerializer(usr.profile).data, status=status.HTTP_200_OK)