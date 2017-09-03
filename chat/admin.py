from django.contrib import admin
from chat.models import ChatUser, Room, Message
# Register your models here.

admin.site.register(ChatUser)
admin.site.register(Room)
admin.site.register(Message)
