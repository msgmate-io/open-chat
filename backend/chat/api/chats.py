from rest_framework import serializers, viewsets, status
from rest_framework import response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from chat.models import Chat, ChatSerializer, ChatInModelSerializer
from chat.api.viewsets import UserStaffRestricedModelViewsetMixin, DetailedPaginationMixin

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

    def get_queryset(self):
        if not self.request.user.is_staff:
            return Chat.get_chats(self.request.user)
        else:
            return self.queryset