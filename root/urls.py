from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import RedirectView
from blog import urls, views

# Regex to match every url except the ones we want Django to handle

REGEX = r'^(?!.*(superuser|admin|chat/api|favicons|static)).*$'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^blog/', include('blog.urls')),
    url(r'^chat/api/', include('chat.urls')),
    url(r'^resume', RedirectView.as_view(url="https://drive.google.com/file/d/18yCHiGK4H7PuNA3K-FUpl4k-VgSXjEyk/view?usp=sharing")),
    # Superuser URLs
    url(r'superuser/?$', views.super_user_view, name="blog_su"),
    url(r'superuser/create$', views.super_user_create, name="blog_su_create"),
    url(r'superuser/edit/(\d+)$', views.super_user_edit, name="blog_su_edit"),
    url(r'superuser/edit/post/(\d+)$', views.post_edited_article, name="blog_edit_post"),
    url(r'superuser/logout$', views.super_user_logout, name="blog_su_logout"),
    url(r'convert$', views.convert, name="blogconvert"),
    url(r'post/$', views.post_article, name="blog_post"),
    url(REGEX, views.react)
]
