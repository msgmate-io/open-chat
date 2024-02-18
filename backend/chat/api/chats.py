from rest_framework import serializers, viewsets, status
from rest_framework import response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from chat.models import Chat, ChatSerializer, ChatInModelSerializer
from chat.api.viewsets import UserStaffRestricedModelViewsetMixin, AugmentedPagination, DetailedPaginationMixin
from drf_spectacular.utils import inline_serializer
from drf_spectacular.utils import extend_schema
from chat.api.viewsets import PaginatedResponseSerializer, PaginatedResponseData, PaginatedResponseDataBase
from core.models.profile import UserProfileSerializer
from chat.models import MessageSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

def chat_res_seralizer(many=True):
    return inline_serializer(
        name='ChatResult',
        fields={
            "uuid": serializers.UUIDField(),
            "created": serializers.DateTimeField(),
            'newest_message': MessageSerializer(many=False),
            'unread_count': serializers.IntegerField(),
            "partner": UserProfileSerializer(many=False),
        },
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
        return Chat.objects.filter(Q(u1 = self.request.user) | Q(u2 = self.request.user))
        
    

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