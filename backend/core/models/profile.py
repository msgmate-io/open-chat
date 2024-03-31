from django.db import models
from core.models.history import ChangeHistory
from model_utils import FieldTracker
from django.utils import timezone
from rest_framework import serializers
from django.conf import settings

class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_profile_user")
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    image = models.TextField(null=True, blank=True)
    
    # Public profiles can be viewed by anyone & receive messages from anyone
    # With public = False user may only send a message to them if they have been added to their contacts
    public = models.BooleanField(default=False)
    
    # A secret that can be used to authenticate the user
    # with `public=True` & `contact_secret=null` Any user can contact this user
    # with e.g.: `contact_sectet = "Activate msgmate"` only users that know this secret may contact this user
    contact_secret = models.CharField(max_length=50, null=True, blank=True)
    
    tracker = FieldTracker()
    last_updated = models.DateTimeField(auto_now_add=True)
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
            # TODO: was
            pass
            

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'second_name', 'last_updated', 'public']
        
    def validate(self, attrs):
        return super().validate(attrs)
