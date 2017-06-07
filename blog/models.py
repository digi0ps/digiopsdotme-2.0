from django.db import models
from django.utils import timezone


class Article(models.Model):
	title = models.CharField(max_length=140)
	content = models.CharField(max_length=5000)
	views = models.IntegerField(default=1, blank=True)
	short = models.CharField(max_length=200, default='')
	posted_time = models.DateTimeField(default=timezone.now, blank=True)

	class meta:
		ordering = ['-posted_date']

	def __str__(self):
		return self.title

	def increment(self):
		self.views += 1
		self.save()

	def get_date(self):
		t = timezone.localtime(self.posted_time)
		return "{}-{}-{} {}:{}".format(t.day, t.month, t.year, t.hour, t.minute)


class Analytics(models.Model):
	viewers = models.IntegerField(default=0)
	comment = models.CharField(max_length=30, blank=True)

	def __str__(self):
		return self.comment

	def increment(self):
		self.viewers += 1
		self.save()
