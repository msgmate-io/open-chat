from django.db import models
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import serializers
from core.api.viewsets import UserStaffRestricedModelViewsetMixin, DetailedPaginationMixin
from django.utils import timezone
from core.models import ChangeHistory, ConsumerConnections
from model_utils import FieldTracker

class UserProfile(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_profile_user")
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    image = models.TextField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    
    tracker = FieldTracker()
    changes = models.ManyToManyField("ChangeHistory", related_name="user_profile_changes", null=True, blank=True)
    
    def save(self, *args, **kwargs):
        changed = self.tracker.changed()
        changed_data = {key: getattr(self, key) for key in changed}
        if changed:
            last_updated = timezone.now()
            changed_data['last_updated'] = str(last_updated)
            changed["last_updated"] = str(self.last_updated)
            self.last_updated = last_updated

        
        if changed and (self._state.adding is False):
            # The 'user' or primary key change should not be tracked this basicly happens in model creation
            # this is because ManyToMany field may only be populated after ForeignKeys ...
            change = ChangeHistory.objects.create(
                model="UserProfile",
                owner=self.user,
                change=changed
            )
            self.changes.add(change)

        super(UserProfile, self).save(*args, **kwargs)

        if changed:
            ConsumerConnections.notify_connections(
                self.user, 
                event="reduction",
                payload={
                    "action": "USER_PROFILE",
                    "payload": changed_data
                }
            )
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'second_name', 'last_updated']

class UpdateProfileViewset(UserStaffRestricedModelViewsetMixin, viewsets.ModelViewSet):
    """
    Simple Viewset for modifying user profiles
    """
    allow_user_list = False
    not_user_editable = ["last_updated"]
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = DetailedPaginationMixin
    queryset = UserProfile.objects.all()