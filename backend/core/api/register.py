
from rest_framework_dataclasses.serializers import DataclassSerializer
from typing import Literal, Optional, List, Dict
from datetime import datetime
from drf_spectacular.utils import extend_schema
from dataclasses import dataclass
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework import status
from rest_framework.serializers import EmailField, ValidationError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login
from core.models.user import User


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
    usr = User.objects.create(username=data.email, password=data.password)

    return Response(
        RegisterResponseSuccess(
            message="User created successfully",
            user_hash=str(usr.hash)),
        status=status.HTTP_200_OK)
