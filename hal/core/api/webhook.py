from rest_framework.decorators import api_view, permission_classes, authentication_classes
from core.automatic_response import coordinate_response
from rest_framework.response import Response


@permission_classes([])
@authentication_classes([])
@api_view(['POST'])
def webhook(request):
    
    user_id = request.data.get("user_id", None)
    data = request.data.get("data", None)
    
    coordinate_response(user_id=user_id, data=data)
    
    return Response({"status": "ok"})
