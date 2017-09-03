from django.shortcuts import render
from chat.serializers import *
from chat.models import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

# API naming scheme: get/post_(all)_modelname


class get_all_messages(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, roomid, format=None):
		room = Room.objects.get(id=roomid)
		messages = Message.objects.filter(to=room)
		ser = MessageList(messages, many=True)
		return Response(ser.data)


class get_room(APIView):

	def get(self, request, room_code, format=None):
		room = Room.objects.get(code=room_code)
		ser = RoomList(room)
		return Response(ser.data)


class get_user(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, username, format=None):
		user = User.objects.get(username=username)
		ser = UserList(user)
		return Response(ser.data)
