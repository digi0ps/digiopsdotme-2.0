from django.db import models
from django.utils import timezone


class Article(models.Model):
	title = models.CharField(max_length=140)
	content = models.CharField(max_length=5000)
	views = models.IntegerField(default=1, blank=True)
	posted_time = models.DateTimeField(default=timezone.now, blank=True)

	class meta:
		ordering = ['-posted_date']

	def __str__(self):
		return self.title

	def get_date(self):
		t = timezone.localtime(self.posted_time)
		return "{}-{}-{} {}:{}".format(t.day, t.month, t.year, t.hour, t.minute)
