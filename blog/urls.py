from django.conf.urls import url, include
from django.contrib import admin
from blog import views

urlpatterns = [
    # API urls
    url(r'api/articles/$', views.all_articles_api.as_view()),
    url(r'api/article/(\d{1,3})$', views.article_api.as_view()),
]
