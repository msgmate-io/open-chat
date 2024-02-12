from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from core.models.profile import UserProfile
from rest_framework.pagination import PageNumberPagination
from core.api.viewsets import UserStaffRestricedModelViewsetMixin, DetailedPaginationMixin
from core.models.user import UserFieldsSeralizer, UserSelfSerializer

class UpdateUserViewset(UserStaffRestricedModelViewsetMixin, viewsets.ModelViewSet):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = False
    not_user_editable = UserFieldsSeralizer.Meta.fields
    serializer_class = UserSelfSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin
    queryset = UserProfile.objects.all()
    
    def get_object(self):
        return super().get_object().user
    