from copyreg import constructor
import os
import sys

from django.urls import include, re_path
from django.conf import settings
from django.http import HttpResponse
import logging

# Load routes
import scripts
import services

# Django Config
os.environ.setdefault("DJANGO_SETTINGS_MODULE", __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
settings.configure(
    DEBUG=True,
    SECRET_KEY='owowowowowowowowowowowowowow',
    ROOT_URLCONF=__name__,
    MIDDLEWARE_CLASSES=(
        'django.middleware.common.CommonMiddleware',
    ),
    BASE_DIR=BASE_DIR,
    ALLOWED_HOSTS = ['*'],
    STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    ),
    INSTALLED_APPS = [
        'django_crontab',
    ],
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    },
    CRONJOBS = [
    ('* * * * *', 'services.scheduler.my_cron_job')
    ],
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
            },
            'simple': {
                'format': '%(levelname)s %(message)s'
            },
        },
        'handlers': {
            'django': {
                'level': 'DEBUG',
                'class': 'logging.FileHandler',
                'filename': 'scraping-server/logs/django.txt',
            },
            'server': {
                'level': 'DEBUG',
                'class': 'logging.FileHandler',
                'filename': 'scraping-server/logs/server.txt',
            },
            'all': {
                'level': 'DEBUG',
                'class': 'logging.FileHandler',
                'filename': 'scraping-server/logs/all_logs.txt',
            },
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'simple'
            },
        },
        'loggers': {
            'django': {  # Logger for Django framework code
                'handlers': ['django'],
                'level': 'DEBUG',
                'propagate': True,
            },
            'django.request': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False,
            },
            'server': {  # Specific logger for your app
                'handlers': ['console','server'],
                'level': 'INFO',
                'propagate': True,
            },
            '': {  # Catch-all root logger
                'handlers': ['all'],
                'level': 'ERROR',
            },
        },
    }
)

def root(request):
    return HttpResponse('Hello World')

urlpatterns = (
    re_path(r'^$', include('services.urls')),
    re_path(r'^scripts',include('scripts.urls')),
)

# # Initialize DBs
logger = logging.getLogger('server')
logger.info("base dir: " + BASE_DIR)

if __name__ == "__main__":
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
else:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()


