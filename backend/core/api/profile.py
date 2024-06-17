from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models.profile import UserProfile, UserProfileSerializer
from rest_framework.pagination import PageNumberPagination
from core.api.viewsets import UserStaffRestricedModelViewsetMixin
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiParameter
from rest_framework.decorators import action
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from core.models.profile import UserProfileSerializer, UserProfile
from chat.api.viewsets import DetailedPaginationMixin
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.db.models import Q
from chat.models import Chat, Message, ChatSerializer, MessageSerializer, ChatSettings, DataMessage
from chat.socket.messages_out import OutNewMessage

class DataMessageExtraSerializer(serializers.Serializer):
    hide_message = serializers.BooleanField()
    data = serializers.JSONField()
    data_type = serializers.ChoiceField(choices=DataMessage.DataMessageTypes.choices)

class CreateChatSerializer(serializers.Serializer):
    text = serializers.CharField()
    chat_settings = serializers.JSONField(required=False)
    data_message = DataMessageExtraSerializer(required=False)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 8


class UpdateProfileViewset(UserStaffRestricedModelViewsetMixin, viewsets.ModelViewSet):
    allow_user_list = False
    not_user_editable = ["last_updated", "uuid", "user", "is_bot"]
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    queryset = UserProfile.objects.all()
    
class PublicProfilesViewset(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin

    @extend_schema(
        responses={200: UserProfileSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

    @extend_schema(
        parameters=[
            OpenApiParameter(name="reveal_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile"),
            OpenApiParameter(name="username", type=str, required=False, location=OpenApiParameter.QUERY, description="The username of the user to fetch")
        ],
        responses={200: UserProfileSerializer(many=False)}
    )
    @action(detail=False, methods=['get'])
    def reveal_profile(self, request):
        reveal_secret = request.query_params.get("reveal_secret", None)
        username = request.query_params.get("username", None)
        
        if not username:
            return Response({"status": "error", "data": "Username required"}, status=400)
        
        user = get_user_model().objects.get(username=username)
        if (not reveal_secret) and (not user.profile.public):
            return Response({"status": "error", "data": "Reveal secret required"}, status=400)
        elif (not reveal_secret) and (user.profile.public):
            return Response(UserProfileSerializer(user.profile, context={
                'request': request,
            }).data)
        
        if reveal_secret and (user.profile.reveal_secret == reveal_secret):
            return Response(UserProfileSerializer(user.profile, context={
                'request': request,
            }).data)
        return Response({"status": "error", "data": "Invalid reveal secret"}, status=400)

    @extend_schema(
        parameters=[
            OpenApiParameter(name="reveal_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile")
        ],
        responses={200: UserProfileSerializer(many=False)}
    )
    @action(detail=False, methods=['get'])
    def get_by_uuid(self, request, user_uuid=None):
        # A profile can only be fetched if either a chat with that user exists or the user is public
        user = get_user_model().objects.get(uuid=user_uuid)
        reveal_secret = request.query_params.get("reveal_secret", None)
        if reveal_secret and (user.profile.reveal_secret == reveal_secret):
            return Response(UserProfileSerializer(user.profile, context={
                'request': request,
            }).data)

        chat = Chat.objects.filter(
            Q(u1=self.request.user, u2=user) | Q(u1=user, u2=self.request.user)
        )
        if not chat.exists() and not user.profile.public:
            return Response({"status": "error", "data": "User not found"}, status=404)
        
        return Response(UserProfileSerializer(user.profile, context={
            'request': request,
        }).data)
        
    @extend_schema(
        parameters=[
            OpenApiParameter(name="reveal_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile")
        ],
        responses={200: UserProfileSerializer(many=False)}
    )
    @action(detail=False, methods=['get'])
    @action(detail=False, methods=['get'])
    def get_by_username(self, request, username=None):
        user = get_user_model().objects.get(username=username)

        reveal_secret = request.query_params.get("reveal_secret", None)
        if reveal_secret and (user.profile.reveal_secret == reveal_secret):
            return Response(UserProfileSerializer(user.profile, context={
                'request': request,
            }).data)

        chat = Chat.objects.filter(
            Q(u1=self.request.user, u2=user) | Q(u1=user, u2=self.request.user)
        )
        if not chat.exists() and not user.profile.public:
            return Response({"status": "error", "data": "User not found"}, status=404)

        return Response(UserProfileSerializer(user.profile, context={
            'request': request,
        }).data)
    
    @extend_schema(
        request=CreateChatSerializer,
        parameters=[
            OpenApiParameter(name="reveal_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile"),
            OpenApiParameter(name="contact_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile")
        ],
        responses={200: inline_serializer(
            name="ChatCreationResponse",
            fields={
                "chat": ChatSerializer(many=False),
                "message": MessageSerializer(many=False)
            }
        )}
    )
    @action(detail=False, methods=['post'])
    def create_chat(self, request, user_uuid=None):

        user = get_user_model().objects.get(uuid=user_uuid)
        
        chat_settings = request.data.get("chat_settings", None)
        
        reveal_secret = request.query_params.get("reveal_secret", None)
        require_previous_chat = True
        if reveal_secret and (user.profile.reveal_secret == reveal_secret):
            require_previous_chat = False

        if require_previous_chat:
            chat = Chat.objects.filter(
                Q(u1=self.request.user, u2=user) | Q(u1=user, u2=self.request.user)
            )
            if not chat.exists() and not user.profile.public:
                return Response({"status": "error", "data": "User not found"}, status=404)
            
        if user.profile.contact_secret:
            if not request.query_params.get("contact_secret", None):
                return Response({"status": "error", "data": "Contact secret required"}, status=400)
        
        # 1 - create the NEW chat
        chat = Chat.objects.create(u1=self.request.user, u2=user)
        
        # (optionally) set the chat settings
        if chat_settings:
            # This options is only allowed for 'public' bots!
            bot = chat.get_partner(self.request.user)
            
            if not bot.profile.public and bot.profile.is_bot:    
                return Response({"status": "error", "data": "Not Bot or not public, setting chat settings not permitted"}, status=401)

            ChatSettings.objects.create(
                user=bot,
                chat=chat,
                title="Automated Chat Settings",
                config=chat_settings
            )
        
        
        # 2 - send the first message
        message = Message.objects.create(
            chat=chat,
            sender=self.request.user,
            recipient=user,
            text=request.data["text"]
        )
        
        # 3 - check if a 'data_message' is present
        
        data_message = request.data.get("data_message", None)
        if data_message:
            dm = DataMessage.objects.create(
                message=message,
                data_type=data_message["data_type"],
                data=data_message["data"],
                hide_message=data_message["hide_message"]
            )
            
            message.data_message = dm
            message.save()

        serialized_message = MessageSerializer(message).data

        chat_serialized = ChatSerializer(chat, context={
            "request": request
        }).data
        
        OutNewMessage(
            sender_id=str(request.user.uuid),
            message=serialized_message,
            chat=chat_serialized
        ).send(str(user.uuid))

        return Response({
            "chat": chat_serialized,
            "message": serialized_message
        })
        

    def get_queryset(self):
        return UserProfile.objects.filter(public=True, is_bot=True).order_by("last_updated")