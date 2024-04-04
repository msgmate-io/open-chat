from rest_framework import serializers, viewsets, status
from rest_framework import response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from chat.models import Chat, ChatSerializer, ChatInModelSerializer
from django.db.models import Case, CharField, Value, When
from chat.api.viewsets import UserStaffRestricedModelViewsetMixin, AugmentedPagination, DetailedPaginationMixin
from drf_spectacular.utils import inline_serializer
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from chat.api.viewsets import PaginatedResponseSerializer, PaginatedResponseData, PaginatedResponseDataBase
from chat.models import MessageSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.db.models import Max
from core.models.profile import UserProfileSerializer, UserProfile

def chat_res_seralizer(many=True):
    fields = {
        "uuid": serializers.UUIDField(),
        "created": serializers.DateTimeField(),
        'newest_message': MessageSerializer(many=False),
        'unread_count': serializers.IntegerField(),
        "partner": UserProfileSerializer(many=False),
    }

    return inline_serializer(
        name='ChatResult',
        fields=fields,
        many=many,
    )

class ChatsModelViewSet(viewsets.ModelViewSet):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = True
    user_editable = [] # For users all fields are ready only on this one!
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    queryset = Chat.objects.all().order_by("-created")
    
    pagination_class = DetailedPaginationMixin
    
    @extend_schema(
        responses={200: chat_res_seralizer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        return Chat.objects.annotate(
            newest_message_time=Max('message__created'),
        ).filter(Q(u1 = self.request.user) | Q(u2 = self.request.user)).order_by('-newest_message_time')

    @extend_schema(responses={200: chat_res_seralizer(many=True)})
    @action(detail=False, methods=['post'])
    def get_chats_with_user(self, request, user_uuid=None):
        if not user_uuid:
            return Response({'error': 'user_uuid is required'}, status=400)
        
        chats = self.get_queryset().filter(Q(u1__uuid=user_uuid, u2=request.user) | Q(u1=request.user, u2__uuid=user_uuid))
        return Response(chat_res_seralizer(many=True)(chats, context={
            'request': request,
        }).data)
        

    @extend_schema(responses={200: chat_res_seralizer(many=False)})
    @action(detail=False, methods=['post'])
    def get_by_uuid(self, request, chat_uuid=None):
        if not chat_uuid:
            return Response({'error': 'chat_uuid is required'}, status=400)
        
        chat = self.get_queryset().filter(uuid=chat_uuid)
        if not chat.exists():
            return Response({'error': 'Chat doesn\'t exist or you have no permission to interact with it!'}, status=403)
        
        chat = chat.first()
        return Response(self.serializer_class(chat, context={
            'request': request,
        }).data)