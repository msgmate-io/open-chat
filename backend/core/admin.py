from django.contrib import admin
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered

from core import models

# Register your models here.


# @admin.register(models.Identities)
# class NotificationAdmin(admin.ModelAdmin):
#    list_display = [
#        field.name for field in models.Identities._meta.get_fields()]

configs = apps.get_app_configs()

for app in configs:
    if app.name != "core":
        continue

    for model_name, model in app.models.items():
        try:
            model_admin = type(model_name + "Admin", (admin.ModelAdmin,), {})

            model_admin.list_display = model.admin_list_display if hasattr(
                model, 'admin_list_display') else tuple([field.name for field in model._meta.fields])
            model_admin.list_filter = model.admin_list_filter if hasattr(
                model, 'admin_list_filter') else model_admin.list_display
            model_admin.list_display_links = model.admin_list_display_links if hasattr(
                model, 'admin_list_display_links') else ()
            model_admin.list_editable = model.admin_list_editable if hasattr(
                model, 'admin_list_editable') else ()
            model_admin.search_fields = model.admin_search_fields if hasattr(
                model, 'admin_search_fields') else ()

            admin.site.register(model, model_admin)
        except:
            print("Error registering model: " + model_name)
