
from django.urls import include, re_path
from . import test_api

urlpatterns = (
    re_path(r'^$', test_api.test_cpcb),
)