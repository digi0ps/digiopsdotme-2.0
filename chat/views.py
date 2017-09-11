from django.shortcuts import render
from chat.serializers import *
from chat.models import *
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token

# API naming scheme: get/post_(all)_modelname


@method_decorator(csrf_exempt, name="dispatch")
class get_all_messages(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, roomid, format=None):
		pass

	def post(self, request, roomid, format=None):
		room = Room.objects.get(id=roomid)
		messages = Message.objects.filter(to=room).order_by('time')
		last_id = int(request.data["last_id"])
		if last_id:
			messages = [m for m in messages if m.id > last_id]
		ser = MessageList(messages, many=True)
		return Response(ser.data)


class post_new_message(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, roomid, format=None):
		mes = MessageList(data=request.data)
		if mes.is_valid():
			m = Message(content=request.data["content"], target=request.data["target"], ctime=request.data["ctime"])
			u = User.objects.get(username=request.data["author"])
			r = Room.objects.get(name=request.data["to"])
			m.author = u
			m.to = r
			m.save()
			messages = Message.objects.filter(to=r).order_by('time')
			last_id = int(request.data["last_id"])
			if last_id:
				messages = [m for m in messages if m.id > last_id]
			ser = MessageList(messages, many=True)
			return Response(ser.data, status=status.HTTP_201_CREATED)
		return Response(mes.errors, status=status.HTTP_400_BAD_REQUEST)


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


def erase_and_create(request):
	Token.objects.all().delete()
	for user in User.objects.all():
		Token.objects.get_or_create(user=user)
	return Response(status=status.HTTP_201_CREATED)
