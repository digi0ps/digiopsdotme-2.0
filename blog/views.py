from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, Http404
from blog.models import Article
from blog.forms import ArticleForm
from blog.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import markdown2


def blog_index_view(request):
	all_articles = Article.objects.all()
	for x in all_articles:
		x.content = markdown2.markdown(x.content, extras=["tables", "cuddled-lists"])
	return render(request, 'blog/index.html', {"articles": all_articles[::-1]})


def blog_post_view(request, pk):
	the_article = get_object_or_404(Article, pk=pk)
	the_article.views += 1
	the_article.save()
	the_article.content = markdown2.markdown(the_article.content, extras=["tables", "cuddled-lists"])
	return render(request, 'blog/article.html', {"article": the_article, "county": article.objects.count()})


# API Views


class all_articles_api(APIView):

	def get(self, request, format=None):
		articles = Article.objects.all()
		for x in articles:
			x.content = markdown2.markdown(x.content, extras=["tables", "cuddled-lists"])
		serializer = ArticleListSerial(articles, many=True)
		return Response(serializer.data)


class article_api(APIView):

	def get(self, request, pk, format=None):
		print("here")
		try:
			print(pk)
			article = Article.objects.get(pk=pk)
		except:
			return Http404
		article.content = markdown2.markdown(article.content, extras=["tables", "cuddled-lists"])
		serializer = ArticleSerial(article)
		return Response(serializer.data)


# Superuser Views


def super_user_view(request):
	if request.user.is_authenticated:
		return render(request, "blog/superuser.html")
	else:
		if request.POST and request.method == "POST":
			uname = request.POST["username"]
			pwd = request.POST["password"]
			user = authenticate(username=uname, password=pwd)
			if user is not None:
				login(request, user)
				return render(request, "blog/superuser.html")
			else:
				return render(request, "blog/superuser_login.html")
		else:
			return render(request, "blog/superuser_login.html")


def super_user_logout(request):
	logout(request)
	return HttpResponseRedirect("/blog/superuser")


def post_article(request):
	if request.POST and request.method == "POST":
		f = ArticleForm(request.POST)
		new_article = f.save()
		print(new_article.id)
		return HttpResponseRedirect("/blog/article/" + str(new_article.id))
	else:
		return HttpResponseRedirect("/blog/superuser")
