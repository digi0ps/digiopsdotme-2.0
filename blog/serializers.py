from rest_framework import serializers
from blog.models import Article


class ArticleListSerial(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = '__all__'


class ArticleSerial(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = '__all__'


# Right now I am rendering both the api/articles and api/article/id to have the same fields
# But in the future this may change depending upon adding a description field to the model
