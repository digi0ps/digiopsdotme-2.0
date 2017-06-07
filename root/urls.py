from django.conf.urls import url, include
from django.contrib import admin
from blog import urls, views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^blog/', include('blog.urls')),
    # Superuser URLs
    url(r'superuser/$', views.super_user_view, name="blog_su"),
    url(r'superuser/logout$', views.super_user_logout, name="blog_su_logout"),
    url(r'post/$', views.post_article, name="blog_post"),
]
