import os
import json
from datetime import datetime
from django.conf import settings
from celery.signals import worker_ready
from celery import Celery, shared_task

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')

app = Celery('conf', broker=settings.REDIS_URL)

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

@worker_ready.connect
def startup_task(sender, **k):
    return "Started " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S")

@app.task(bind=True, name="im_allive_task")
def im_allive_task(self):
    print("Server: I'm allive and well :) ", datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

app.conf.beat_schedule = {
    'im-allive-ping': {
        'task': 'im_allive_task',
        'schedule': 60.0 * 1.0
    },
}
