from rest_framework import serializers, viewsets, status
from rest_framework import response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from chat.models import Chat, ChatSerializer, ChatInModelSerializer
from chat.api.viewsets import UserStaffRestricedModelViewsetMixin, DetailedPaginationMixin
from drf_spectacular.utils import inline_serializer

from rest_framework import serializers
from drf_spectacular.utils import extend_schema


class ChatsModelViewSet(viewsets.ModelViewSet, UserStaffRestricedModelViewsetMixin):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = True
    not_user_editable = ChatSerializer.Meta.fields # For users all fields are ready only on this one!
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin
    queryset = Chat.objects.all().order_by("-created")
    
    @extend_schema(responses={
        200: inline_serializer(
            name='PaginatedResponse',
            fields={
                'count': serializers.IntegerField(),
                'next': serializers.URLField(),
                'previous': serializers.URLField(),
                'results': ChatSerializer(many=True),
                'page_size': serializers.IntegerField(),
                'next_page': serializers.IntegerField(allow_null=True),
                'previous_page': serializers.IntegerField(allow_null=True),
                'last_page': serializers.IntegerField(),
                'first_page': serializers.IntegerField(),
            }
        )
    })
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        if not self.request.user.is_staff:
            return Chat.get_chats(self.request.user)
        else:
            return self.queryset