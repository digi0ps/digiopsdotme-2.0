from rest_framework import serializers
from chat.models import Message, Room
from django.contrib.auth.models import User


class UserList(serializers.ModelSerializer):
		class Meta:
			model = User
			fields = ('username', 'password', 'last_login')


class MessageList(serializers.ModelSerializer):
		to = serializers.StringRelatedField()
		author = serializers.StringRelatedField()

		class Meta:
			model = Message
			fields = '__all__'

