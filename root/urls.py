from django.conf.urls import url, include
from django.contrib import admin
from blog import urls, views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^blog/', include('blog.urls')),
]
