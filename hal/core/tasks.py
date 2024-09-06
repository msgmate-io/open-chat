from celery import shared_task
import os
from celery.signals import task_failure, task_success, task_revoked
from django.db import IntegrityError
from celery import Task
from core.models import ActiveTask

from celery.signals import worker_shutdown

@worker_shutdown.connect
def revoke_running_tasks(signal, sender, **kwargs):
    app = sender.app
    inspector = app.control.inspect()

    active_tasks = inspector.active()

    if active_tasks:
        for worker, tasks in active_tasks.items():
            for task in tasks:
                task_id = task['id']
                app.control.revoke(task_id, terminate=True)

class TaggedTask(Task):
    def apply_async(self, args=None, kwargs=None, task_id=None, producer=None,
                    link=None, link_error=None, shadow=None, **options):
        chat_id = kwargs.get('chat_id')
        task_type = kwargs.get('task_type', ActiveTask.TaskTypes.TEXT_CHAT)
        if chat_id:
            if self.is_task_active(chat_id):
                return None

        result = super().apply_async(args, kwargs, task_id, producer, link,
                                     link_error, shadow, **options)

        if chat_id:
            try:
                ActiveTask.objects.create(chat_id=chat_id, task_id=result.id, task_type=task_type)
            except IntegrityError:
                result.revoke()
                return None

        return result

    def on_success(self, retval, task_id, args, kwargs):
        self.remove_active_task(kwargs.get('chat_id'), task_id)

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        self.remove_active_task(kwargs.get('chat_id'), task_id)

    def is_task_active(self, chat_id):
        return ActiveTask.objects.filter(chat_id=chat_id).exists()

    def remove_active_task(self, chat_id, task_id):
        ActiveTask.objects.filter(chat_id=chat_id, task_id=task_id).delete()

@task_success.connect
def handle_task_success(sender, result, **kwargs):
    task_id = kwargs.get('task_id')
    args = kwargs.get('args')
    task_kwargs = kwargs.get('kwargs')

    if task_kwargs:
        chat_id = task_kwargs.get('chat_id')
        if chat_id:
            ActiveTask.objects.filter(chat_id=chat_id, task_id=task_id).delete()

@task_failure.connect
def handle_task_failure(sender, task_id, exception, args, kwargs, einfo, **other_kwargs):
    if kwargs:
        chat_id = kwargs.get('chat_id')
        if chat_id:
            ActiveTask.objects.filter(chat_id=chat_id, task_id=task_id).delete()

@task_revoked.connect
def handle_task_revoked(sender, request, terminated, signum, expired, **kwargs):
    chat_id = request.kwargs.get('chat_id')
    if chat_id:
        ActiveTask.objects.filter(chat_id=chat_id, task_id=request.id).delete()

@shared_task(base=TaggedTask)
def chat_bot_task(*args, **kwargs):
    chat_id  = kwargs.get('chat_id')
    recipient_id = kwargs.get('recipient_id')
    task_type = kwargs.get('task_type', ActiveTask.TaskTypes.AUDIO_CHAT)
    
    if True:
        from msgmate.bots import start_hal9013_multimodal
        start_hal9013_multimodal(
            chat_id=chat_id,
            recipient_id=recipient_id
        )
    else:
        # Depricated to have two seperate bots for audio / texts, the hal9013 is multimodal now!
        if task_type == ActiveTask.TaskTypes.TEXT_CHAT:
            if os.environ.get('USE_MSGMATE_BOTS', 'false') == 'true':
                from msgmate.bots import start_hal9010_bot
                start_hal9010_bot(
                    chat_id=chat_id,
                    recipient_id=recipient_id
                )
            else:
                from core.bots import start_bot
                start_bot(
                    chat_id=str(chat_id),
                    recipient_id=str(recipient_id)
                )
            from core.bots import start_bot
            start_bot(
                chat_id=str(chat_id),
                recipient_id=str(recipient_id)
            )
        elif task_type == ActiveTask.TaskTypes.AUDIO_CHAT:
            # Feature atm only availabe on beta.msgmate.io!
            from msgmate.bots import start_audio_bot
            start_audio_bot(
                chat_id=str(chat_id),
                recipient_id=str(recipient_id)
            )