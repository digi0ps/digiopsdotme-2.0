from django.db import models
from django.utils import timezone


class ChatUser(models.Model):
	username = models.CharField(max_length=30)
	password = models.CharField(max_length=30)
	points = models.IntegerField(default=0)

	def __str__(self):
		return self.username


class Room(models.Model):
	name = models.CharField(max_length=30)
	description = models.CharField(max_length=140)
	code = models.CharField(max_length=10)
	members = models.ManyToManyField(ChatUser, related_name="members")

	def __str__(self):
		return self.name


class Message(models.Model):
	content = models.CharField(max_length=3000)
	time = models.DateTimeField(default=timezone.now, blank=True)
	target = models.CharField(max_length=30)
	author = models.ForeignKey(ChatUser)
	to = models.ForeignKey(Room)

	def __str__(self):
		return self.author.username + ": " + self.content
