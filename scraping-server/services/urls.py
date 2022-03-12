
from django.urls import include, re_path
from . import status

urlpatterns = (
    re_path(r'^$', status.get_status),
)