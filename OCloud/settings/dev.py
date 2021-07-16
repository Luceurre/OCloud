# flake8: noqa
from .base import *

SECRET_KEY = "925df9719cfb9b3cb8260b1f468e70bdd08a61b7c220837cdf"  # nosec
DEBUG = True
INTERNAL_IPS = ["127.0.0.1", "172.16.72.1"]

INSTALLED_APPS = INSTALLED_APPS + ["debug_toolbar", "django_extensions"]
ALLOWED_HOSTS = ["*"]

MIDDLEWARE = MIDDLEWARE + ["debug_toolbar.middleware.DebugToolbarMiddleware"]

# Logging
LOGGING["handlers"]["default"] = {
    "class": "logging.StreamHandler",
}

# Uploaded files storage
MEDIA_ROOT = "/uploads/"
MEDIA_URL_PATH = "uploads/"
MEDIA_URL = "http://localhost:8000/" + MEDIA_URL_PATH

# Caching
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/tmp/django_cache",  # nosec
    }
}

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: request.META["SERVER_NAME"] != "testserver"
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Celery config
CELERY_BROKER_URL = "redis://broker:6379"

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# Migration linter (`makemigrations` becomes `makemigrations --lint` by default)
MIGRATION_LINTER_OVERRIDE_MAKEMIGRATIONS = True
