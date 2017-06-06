from rest_framework import serializers
from blog.models import Article


class ArticleListSerial(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = ('id', 'title', 'short', 'posted_time')


class ArticleSerial(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = '__all__'

