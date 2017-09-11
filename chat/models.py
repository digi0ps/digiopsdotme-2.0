from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


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
	members = models.ManyToManyField(User, related_name="members")

	def __str__(self):
		return self.name


class Message(models.Model):
	content = models.CharField(max_length=3000)
	time = models.DateTimeField(default=timezone.now, blank=True)
	ctime = models.CharField(max_length=200, default="Thu Sep 07 2017 15:00:00 GMT+0530 (IST)")
	target = models.CharField(max_length=30)
	author = models.ForeignKey(User)
	to = models.ForeignKey(Room)

	class Meta:
		ordering = ['time']

	def __str__(self):
		return self.author.username + ": " + self.content
