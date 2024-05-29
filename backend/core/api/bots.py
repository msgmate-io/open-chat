from rest_framework import serializers, viewsets, status
from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiParameter
from rest_framework.permissions import IsAuthenticated
from chat.api.viewsets import DetailedPaginationMixin

from core.models.bots import BotsControlSerializer, BotController

class BotsControlViewset(viewsets.ModelViewSet):
    serializer_class = BotsControlSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin

    @extend_schema(
        responses={200: BotsControlSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        return BotController.get_bots(self.request.user)
