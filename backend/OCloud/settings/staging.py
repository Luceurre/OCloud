# flake8: noqa
import os

import django_heroku
import requests

from .base import *

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = bool(os.environ.get("DEBUG", False))

ALLOWED_HOSTS = [
    # Change me!
    "ocloud-backend.herokuapp.com",
    "o-cloud.com",
]

if "ALLOWED_HOST" in os.environ:
    ALLOWED_HOSTS.append(os.environ.get("ALLOWED_HOST"))

try:
    EC2_IP = requests.get("http://169.254.169.254/latest/meta-data/local-ipv4").text
    ALLOWED_HOSTS.append(EC2_IP)
except requests.exceptions.RequestException:
    pass

INSTALLED_APPS = INSTALLED_APPS + ["storages"]

# Secure connection
SECURE_REDIRECT_EXEMPT = [r"/?health"]


# Uploaded files storage
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_STORAGE_BUCKET_NAME = os.environ.get("MEDIA_BUCKET")
AWS_DEFAULT_ACL = "private"
AWS_S3_REGION_NAME = ""
AWS_S3_SIGNATURE_VERSION = "s3v4"
DEFAULT_FROM_EMAIL = "contact@o-cloud.com"

# Logging
LOGGING["formatters"] = {
    "aws": {
        "format": "[%(levelname)s] [%(name)s] %(message)s",
        "datefmt": "%Y-%m-%d %H:%M:%S",
    }
}


# Caching
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.environ.get("REDIS_URL"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}

# Static files
STATICFILES_STORAGE = "core.storage.ManifestStorage"

# Sentry
if "SENTRY_DSN" in os.environ:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        integrations=[DjangoIntegration()],
        environment=os.environ.get("ENVIRONMENT"),
        release=os.environ.get("VERSION"),
    )

# Celery config
BROKER_URL = os.environ["REDIS_URL"]
CELERY_RESULT_BACKEND = os.environ["REDIS_URL"]

django_heroku.settings(locals())

CORS_ALLOW_ALL_ORIGINS = True
