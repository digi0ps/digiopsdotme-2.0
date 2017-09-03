from rest_framework import serializers
from chat.models import ChatUser, Message, Room


class ChatUList(serializers.ModelSerializer):
		class Meta:
			model = Room
			fields = '__all__'


class MessageList(serializers.ModelSerializer):
		to = serializers.StringRelatedField()
		author = serializers.StringRelatedField()

		class Meta:
			model = Message
			fields = '__all__'

