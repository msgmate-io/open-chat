from chat.models import Chat, Message
from core.models.user import User
from openai import OpenAI
from rest_framework.decorators import api_view
from django.http import StreamingHttpResponse, JsonResponse

