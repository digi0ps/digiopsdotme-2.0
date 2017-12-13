from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, Http404
from blog.models import Article, Analytics
from blog.forms import ArticleForm
from blog.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import markdown2
import re

COMMENT = "DEV"

# Main View


def get_viewers():
	a = Analytics.objects.first()
	if a:
		a.increment()
	else:
		a = Analytics.objects.create(viewers=1, comment=COMMENT)
	return a.viewers


# These functions returns the title based on the path
# Helps to render the meta data server side


def get_head_data(path):
	# Remove final backslash
	if path[-1] == "/":
		path = path[:-1]
	# Set defaults
	color = "#2B4496"
	title = "digi0ps"
	desc = "My online hideout"
	if path == '/':
		# return default values
		pass
	elif path == '/blog':
		title = "Blogy - digi0ps"
		desc = "A few of my musings and ramblings."
	elif path == '/about':
		title = "About me - digi0ps"
		desc = "About me... - digi0ps"
	elif re.match(r'/blog/\d+', path):
		# it's an article page
		# get id from url
		# if id not a integer than return default
		try:
			aid = int(path.split("/blog/")[1])
		except:
			return (color, desc, title)
		# now we get the article
		# if not found do the same
		try:
			a = Article.objects.get(id=aid)
		except:
			return (color, desc, title)
		# article is found
		color = "#FFFFFF"
		title = a.title
		desc = a.short
	return (color, desc, title)


def react(request, x=0):
	# Main handler for react
	# Renders html meta data based on the path
	v = get_viewers()
	# destructure data from the get_head_data func
	(color, desc, title) = get_head_data(request.path)
	return render(request, "main.html", {
		"viewers": v,
		"title": title,
		"desc": desc,
		"theme": color
	})


# API

class all_articles_api(APIView):

	def get(self, request, format=None):
		articles = Article.objects.order_by("-posted_time")
		# for x in articles:
			# x.content = markdown2.markdown(x.content, extras=["tables", "cuddled-lists"])
		serializer = ArticleListSerial(articles, many=True)
		return Response(serializer.data)


class article_api(APIView):

	def get(self, request, pk, format=None):
		try:
			print(pk)
			article = Article.objects.get(pk=pk)
		except:
			return Http404
		article.increment()
		# article.content = markdown2.markdown(article.content, extras=["tables", "cuddled-lists"])
		serializer = ArticleSerial(article)
		return Response(serializer.data)


# Superuser Views


def super_user_view(request):
	if request.user.is_authenticated:
		articles = Article.objects.all()
		return render(request, "blog/superuser.html", {
			"articles": articles,
		})
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


def super_user_create(request):
	if request.user.is_authenticated:
		return render(request, "blog/superuser_create.html")
	else:
		return HttpResponseRedirect("/blog/superuser")


def super_user_edit(request, pk):
	if request.user.is_authenticated:
		article = get_object_or_404(Article, pk=pk)
		return render(request, "blog/superuser_create.html", {
			"article": article,
		})


def super_user_logout(request):
	logout(request)
	return HttpResponseRedirect("/blog/superuser")


def post_edited_article(request, pk):
	if request.POST and request.method == "POST" and request.user.is_authenticated:
		f = ArticleForm(request.POST)
		a = get_object_or_404(Article, pk=pk)
		print("inside")
		if f.is_valid():
			f.save(commit=False)
			cd = f.cleaned_data
			a.title = cd["title"]
			a.short = cd["short"]
			a.content = cd["content"]
			a.save()
			return HttpResponseRedirect("/blog/superuser")
		else:
			print("not valid")
	else:
		print("not logged")


def post_article(request):
	if request.POST and request.method == "POST" and request.user.is_authenticated:
		f = ArticleForm(request.POST)
		new_article = f.save()
		return HttpResponseRedirect("/blog/superuser")
	else:
		return HttpResponseRedirect("/blog/superuser")

# Temporary hack for converting all markdown content to html in database


def convert(request):
	articles = Article.objects.all()
	for article in articles:
		article.content = markdown2.markdown(article.content, extras=["tables", "cuddled-lists"])
		article.save()
	return render(request, "blog/superuser.html", {
		"articles": articles
	})
