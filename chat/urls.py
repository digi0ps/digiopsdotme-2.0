from django.conf.urls import url
from chat import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # API urls
    url(r'^obtain-auth-token/$', obtain_auth_token),
    url(r'^newtokens/$', views.erase_and_create),
    url(r'^messages/(\d{1,2})/$', views.get_all_messages.as_view()),
    url(r'^room/(\w{1,10})/$', views.get_room.as_view()),
    url(r'^user/(\w{1,30})/$', views.get_user.as_view()),
]
