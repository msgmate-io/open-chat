from rest_framework import serializers, viewsets, status
from drf_spectacular.utils import extend_schema
from django.db.models import Case, CharField, Value, When
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from core.models.profile import UserProfileSerializer, UserProfile
from chat.api.viewsets import DetailedPaginationMixin
from chat.models import Chat
from django.db.models import Q
from django.db.models import Max

class ContactsViewset(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin

    @extend_schema(
        responses={200: UserProfileSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        user_ids = Chat.objects.filter(
            Q(u1=self.request.user) | Q(u2=self.request.user)
        ).exclude(
            Q(u1=self.request.user) & Q(u2=self.request.user)
        ).annotate(
            other_user_id=Case(
                When(u1=self.request.user, then='u2_id'),
                When(u2=self.request.user, then='u1_id'),  
                output_field=CharField(),
            )
        ).values_list('other_user_id', flat=True).distinct()
        return UserProfile.objects.filter(user__in=user_ids)