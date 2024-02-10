import json
from uuid import UUID

class CoolerJson(json.JSONEncoder):
    """
    This is our custom json serializer that can also encode sets!
    """

    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, UUID):
            return str(obj)
        try:
            # But especially for __proxy__ elements this is the only way I found
            # I would love to type check for proxy instead but I can't find the __proxy__ type!
            return json.JSONEncoder.default(self, obj)
        except:
            return str(obj)