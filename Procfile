worker: celery worker --app=OCloud.celery.app
release: python manage.py migrate
web: gunicorn OCloud.wsgi
