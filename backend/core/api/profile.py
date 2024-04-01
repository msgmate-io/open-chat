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
from chat.api.messages import SendMessageSerializer
from chat.models import Chat, Message, ChatSerializer
from chat.consumers.messages import NewMessage, MessageSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 8


class UpdateProfileViewset(UserStaffRestricedModelViewsetMixin, viewsets.ModelViewSet):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = False
    not_user_editable = ["last_updated"]
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
            OpenApiParameter(name="reveal_secret", type=str, required=False, location=OpenApiParameter.QUERY, description="The secret to reveal the user profile")
        ],
        responses={200: UserProfileSerializer(many=False)}
    )
    @action(detail=False, methods=['get'])
    def get_by_uuid(self, request, user_uuid=None):
        # A profile can only be fetched if either a chat with that user exists or the user is public
        from chat.models import Chat
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
        request=SendMessageSerializer,
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
        
        # 2 - send the first message
        message = Message.objects.create(
            chat=chat,
            sender=self.request.user,
            recipient=user,
            text=request.data["text"]
        )
        serialized_message = MessageSerializer(message).data

        chat_serialized = ChatSerializer(chat, context={
            "user": request.user
        }).data
        
        NewMessage(
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