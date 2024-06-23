from django.contrib.auth import get_user_model
from django_celery_results.models import TaskResult
from conf.celery import app
import json
import importlib
from django.core.serializers.json import DjangoJSONEncoder
from dataclasses import dataclass
from core.models import ActiveTask

def custom_event(action, payload):
    return {
        "type": "custom",
        "data": {
            "action": action,
            "payload": payload
        }
    }

@dataclass
class OutNewMessage:
    sender_id: str
    message: dict
    chat: dict
    type: str = "newMessage"
    
    def build_event(self):
        return custom_event(
            "newMessage",
            {
                "senderId": self.sender_id,
                "message": self.message,
                "chat": self.chat
            }
        )


def check_task_status(task_id):
    from celery.result import AsyncResult
    task = AsyncResult(task_id)
    
    return {
        "state": task.state,
        "info": json.loads(json.dumps(task.info, cls=DjangoJSONEncoder, default=lambda o: str(o))),
    }
    
def coordinate_response(
    user_id,
    data
):
    new_message = OutNewMessage(**data)
    # TODO check if the seind guser doesn't hvae the bot ID! Otherwise it's a 'self' message

    # default chat type
    task_type = ActiveTask.TaskTypes.TEXT_CHAT
    chat_start_signal_detected = False
    
    # Check if this is possibly an audio chat
    data_message = new_message.message.get("data_message", None)
    if data_message is not None:
        data_type = data_message.get("data_type", "unknown")
        if data_type == "signal":
            signal = data_message.get("data", {}).get("signal", "none")
            if signal == "start-audio-chat":
                chat_start_signal_detected = True
                task_type = ActiveTask.TaskTypes.AUDIO_CHAT
            elif signal == "start-text-chat":
                chat_start_signal_detected = True
                task_type = ActiveTask.TaskTypes.TEXT_CHAT
                
    if not chat_start_signal_detected:
       return

    active_task = ActiveTask.objects.filter(chat_id=new_message.chat['uuid'])
    
    if active_task.exists():
        active_task = active_task.first()
        
        if active_task.task_type == task_type:
            return # No need to create a new task!
        elif active_task.task_type != task_type:
            app.control.revoke(active_task.task_id, terminate=True)
            active_task.delete()
    
    function_lookup = "core.tasks.chat_bot_task"
    function_lookup = function_lookup.split(".")
    module = importlib.import_module(".".join(function_lookup[:-1]))
    celery_task = getattr(module, function_lookup[-1])
    
    celery_task = celery_task.apply_async(
        kwargs={
            "chat_id": new_message.chat['uuid'],
            "recipient_id": new_message.sender_id,
            "task_type": task_type
        }
    )