from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from chat.models import Message, MessageSerializer, Chat, ChatSerializer
from rest_framework.pagination import PageNumberPagination
from chat.api.viewsets import UserStaffRestricedModelViewsetMixin, DetailedPaginationMixin
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, inline_serializer
from django.db.models import Q
from chat.consumers.messages import NewMessage

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 20
    
class SendMessageSerializer(serializers.Serializer):
    text = serializers.CharField()


class MessagesModelViewSet(UserStaffRestricedModelViewsetMixin, viewsets.ModelViewSet):
    """
    Simple Viewset messages CREATE, LIST, UPDATE, DELETE
    """
    allow_user_list = True
    not_user_editable = MessageSerializer.Meta.fields # For users all fields are ready only on this one!
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin
    queryset = Message.objects.all().order_by("created")
    resp_chat_403 = Response({'error': 'Chat doesn\'t exist or you have no permission to interact with it!'}, status=403)
    
    def filter_queryset(self, queryset):
        print("FILTERING")
        if hasattr(self, 'chat_uuid'):
            return Chat.objects.get(uuid=self.chat_uuid).get_messages().order_by("-created")
        return super().filter_queryset(queryset)
    
    def list(self, request, *args, **kwargs):
        if 'chat_uuid' in kwargs:
            self.chat_uuid = kwargs['chat_uuid']
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        return Message.objects.filter(chat__in=Chat.get_chats(self.request.user)).order_by("-created")
        
    @extend_schema(request=inline_serializer(fields={}, name='MarkChatMessagesRead'))
    @action(detail=False, methods=['post'])
    def mark_chat_messages_read(self, request, chat_uuid=None):
        if not chat_uuid:
            return Response({'error': 'chat_uuid is required'}, status=400)

        self.chat_uuid = chat_uuid
        Message.objects.filter(
            ~Q(sender=request.user), 
            chat__in=Chat.objects.filter(Q(u1=request.user) | Q(u2=request.user), uuid=chat_uuid), 
            read=False).update(read=True)
        return Response({'status': 'ok'}, status=200)
        
    @extend_schema(request=SendMessageSerializer)
    @action(detail=False, methods=['post'])
    def send(self, request, chat_uuid=None):
        if not chat_uuid:
            return Response({'error': 'chat_uuid is required'}, status=400)

        chat = Chat.objects.filter(uuid=chat_uuid)
        if not chat.exists():
            return self.resp_chat_403
        chat = chat.first()
        if not chat.is_participant(request.user):       
            return self.resp_chat_403

        serializer = SendMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        partner = chat.get_partner(request.user) 
        message = Message.objects.create(
            chat=chat,
            sender=request.user,
            recipient=partner,
            text=serializer.data['text']
        )
        
        serialized_message = self.serializer_class(message).data
        
        chat_serialized = ChatSerializer(chat, context={
            "user": request.user
        }).data
        
        NewMessage(
            sender_id=str(request.user.uuid),
            message=serialized_message,
            chat=chat_serialized
        ).send(str(partner.uuid))
        
        return Response(serialized_message, status=200)

    
    