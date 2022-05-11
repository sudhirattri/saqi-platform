
from django.urls import include, re_path
from . import status, localdb, scheduler

urlpatterns = (
    re_path(r'testdb', localdb.test_db),
    re_path(r'run', scheduler.run_pending_jobs),
    re_path(r'add', scheduler.add_job),
    re_path(r'upload', scheduler.upload),
    re_path(r'', status.get_status),
)