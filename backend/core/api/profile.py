from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models.profile import UserProfile, UserProfileSerializer
from rest_framework.pagination import PageNumberPagination
from core.api.viewsets import UserStaffRestricedModelViewsetMixin
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from core.models.profile import UserProfileSerializer, UserProfile
from chat.api.viewsets import DetailedPaginationMixin


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

    def get_queryset(self):
        return UserProfile.objects.filter(public=True, is_bot=True).order_by("last_updated")