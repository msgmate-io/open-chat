from dataclasses import dataclass
from enum import Enum

    
@dataclass
class CreateBotUser:
    codename: str = "create_bot_user"
    name: str = "Can create a Bot User Account"
    
@dataclass
class CreateBotBridges:
    codename: str = "create_bot_bridges"
    name: str = "Can create bot briges for message relaying"

class Permissions(Enum):
    create_bot_user = CreateBotUser
    create_bot_bridges = CreateBotBridges
    
class Groups(Enum):
    bot_admin = "Bot Admins"
    ff_user = "Fully featured User"
    bot_user = "Bot User"