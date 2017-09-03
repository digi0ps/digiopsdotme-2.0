from django.conf.urls import url
from chat import views

urlpatterns = [
    # API urls
    url(r'messages/(\d{1,2})/$', views.get_all_messages.as_view()),
    url(r'room/(\w{1,10})/$', views.get_room.as_view()),
]
