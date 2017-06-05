from django.conf.urls import url, include
from django.contrib import admin
from blog import views

urlpatterns = [
    url(r'^$', views.blog_index_view, name="blog"),
    # url(r'article/(\d{1,3})$', views.blog_post_view, name="article"),
    # API urls
    url(r'api/articles/$', views.all_articles_api.as_view()),
    url(r'api/article/(\d{1,3})$', views.article_api.as_view()),
    # Superuser URLs
    url(r'superuser/$', views.super_user_view, name="blog_su"),
    url(r'superuser/logout$', views.super_user_logout, name="blog_su_logout"),
    url(r'post/$', views.post_article, name="blog_post"),
]
