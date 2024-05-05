from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from chat.models import Chat, ChatSerializer, ChatSettingsSerializer, ChatSettings
from chat.api.viewsets import DetailedPaginationMixin
from drf_spectacular.utils import inline_serializer
from drf_spectacular.utils import extend_schema
from chat.models import MessageSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.db.models import Max
from core.models.profile import UserProfileSerializer

def chat_res_seralizer(many=True):
    fields = {
        "uuid": serializers.UUIDField(),
        "created": serializers.DateTimeField(),
        'newest_message': MessageSerializer(many=False),
        'unread_count': serializers.IntegerField(),
        "partner": UserProfileSerializer(many=False),
        "settings": ChatSettingsSerializer(many=False, required=False),
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
        
        
    @extend_schema(
        request=inline_serializer(
            name='GetChatByTitleRequest',
            fields={
                "title": serializers.CharField(required=True),
            },
            many=False,
        ),
        responses={200: chat_res_seralizer(many=False)}
    )
    @action(detail=False, methods=['post'])
    def get_by_title(self, request):
        chat = self.get_queryset().filter(
            chat_settings__title=request.data.get('title'),
            chat_settings__user=request.user,
        ).first()

        return Response(self.serializer_class(chat, context={
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

    @extend_schema(
        request=inline_serializer(
            name='ChatDeleteRequest',
            fields={
            },
            many=False,
        ),
        responses={200: inline_serializer(
            name='ChatDeleteResult',
            fields={
                "success": serializers.BooleanField(),
            },
            many=False,
        )
    })
    @action(detail=False, methods=['post'])
    def delete_by_uuid(self, request, chat_uuid=None):
        if not chat_uuid:
            return Response({'error': 'chat_uuid is required'}, status=400)
        
        chat = self.get_queryset().filter(uuid=chat_uuid)

        # Users can always delete chats with bots
        # Chats with other users may not be delted at all ( currently TODO )
        if not chat.exists():
            return Response({'error': 'Chat doesn\'t exist or you have no permission to interact with it!'}, status=403)
        chat = chat.first()
        
        partner = chat.get_partner(request.user)
        
        if not partner.profile.is_bot:
            return Response({'error': 'You can\'t delete chats with other users!'}, status=403)
        
        chat.delete()
        return Response({'success': True})
    
    class SetChatTitleRequestSerializer(serializers.Serializer):
        title = serializers.CharField(required=False)
        config = serializers.JSONField(required=False)

    @extend_schema(
        request=SetChatTitleRequestSerializer(many=False),
        responses={200: ChatSettingsSerializer(many=False, required=False)}
    )
    @action(detail=False, methods=['post', 'get'])
    def update_chat_settings(self, request, chat_uuid=None):
        if not chat_uuid:
            return Response({'error': 'chat_uuid is required'}, status=400)

        chat = self.get_queryset().filter(uuid=chat_uuid).first()
        
        if request.method.lower() == 'get':
            settings = ChatSettings.objects.filter(chat=chat, user=request.user)
            return Response(ChatSettingsSerializer(
                settings.first() 
            ).data if settings.exists() else None)
        else:
            serializer = self.SetChatTitleRequestSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.data
            
            settings = ChatSettings.objects.filter(chat=chat, user=request.user)
            if settings.exists():
                settings.update(**data)
                settings = settings.first()
            else:
                settings = ChatSettings.objects.create(chat=chat, user=request.user, **data)
        return Response(ChatSettingsSerializer(settings).data)