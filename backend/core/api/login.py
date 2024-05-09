from rest_framework_dataclasses.serializers import DataclassSerializer
from django.contrib.auth import get_user_model
from core.models.user import UserSelfSerializer
from django.contrib.auth import logout
from drf_spectacular.utils import extend_schema
from dataclasses import dataclass
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login


@dataclass
class LoginInfo:
    username: str
    password: str


class LoginInfoSerializer(DataclassSerializer):
    class Meta:
        dataclass = LoginInfo



@extend_schema(
    request=LoginInfoSerializer,
    responses={200: UserSelfSerializer}
)
@throttle_classes([AnonRateThrottle])
@api_view(['POST'])
def login_user(request):
    serializer = LoginInfoSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.save()
    
    user = authenticate(username=data.username, password=data.password)

    if user is None:
        return Response({
            'non_field_errors': ['Invalid username or password. Please try again.']
        }, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)

    return Response(UserSelfSerializer(user).data ,status=status.HTTP_200_OK)

class AugmentedBotUserSerializer(UserSelfSerializer):
    csrftoken: str = "csrftoken"
    sessionid: str = "sessionid"

    class Meta:
        model = get_user_model()
        fields = UserSelfSerializer.Meta.fields
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['csrftoken'] = self.context['csrftoken']
        representation['sessionid'] = self.context['sessionid']
        return representation

@extend_schema(
    request=LoginInfoSerializer,
    responses={200: AugmentedBotUserSerializer}
)
@throttle_classes([AnonRateThrottle])
@api_view(['POST'])
def bot_login(request):
    serializer = LoginInfoSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.save()
    
    user = authenticate(username=data.username, password=data.password)
    
    if user is None:
        return Response({
            'non_field_errors': ['Invalid username or password. Please try again.']
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if not (user.profile.is_bot or user.is_staff):
        # bot AND admins may use the bot loging api
        # TODO: intoduce special user permission for this
        return Response({
            'non_field_errors': ['Only bots can login here.']
        }, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)

    return Response(AugmentedBotUserSerializer(user, context={
        "sessionid": request.session.session_key,
        "csrftoken": get_token(request)
    }).data ,status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def logout_user(request):    
    logout(request)
    return Response(status=status.HTTP_200_OK)
