from django.conf.urls import url, include
from django.contrib import admin
from blog import urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^blog/', include('blog.urls')),
]
