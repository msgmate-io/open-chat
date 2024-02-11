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


class ChatsModelViewSet(viewsets.ModelViewSet, UserStaffRestricedModelViewsetMixin):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = True
    not_user_editable = ChatSerializer.Meta.fields # For users all fields are ready only on this one!
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    queryset = Chat.objects.all().order_by("-created")
    
    pagination_class = DetailedPaginationMixin
    
    @extend_schema(
        responses={200: inline_serializer(
                    name='ChatResult',
                    fields={
                        "uuid": serializers.UUIDField(),
                        "created": serializers.DateTimeField(),
                        'newest_message': MessageSerializer(many=False),
                        "partner": UserProfileSerializer(many=False),
                    },
                    many=True,
                )
            }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        if not self.request.user.is_staff:
            return Chat.get_chats(self.request.user)
        else:
            return self.queryset